"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPage } from "@/components/admin/AdminPage";
import { updateSetting } from "@/lib/actions/content";
import { useRouter, unstable_rethrow } from "next/navigation";
import { Upload, RefreshCw, ImageIcon, Check, Save, Globe, Image as ImageLucide } from "lucide-react";
import Image from "next/image";
import { MediaPickerModal } from "./MediaPickerModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Same section-heading treatment as ContactForm and MediaManager.
const SECTION_HEADING = "text-sm font-semibold uppercase tracking-widest text-muted-foreground";

interface Props {
  initialFaviconUrl: string | null;
  initialSiteTitle: string | null;
  initialSiteDescription: string | null;
}

export function SettingsForm({ initialFaviconUrl, initialSiteTitle, initialSiteDescription }: Props) {
  const [faviconUrl, setFaviconUrl] = useState(initialFaviconUrl ?? "");
  const [siteTitle, setSiteTitle] = useState(initialSiteTitle ?? "");
  const [siteDescription, setSiteDescription] = useState(initialSiteDescription ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ponytail: inline error, not a toast — the admin has no toast host, and one error
  // element beats a notification library. Upgrade path: add sonner + a <Toaster /> in the
  // admin layout only if several screens end up needing it.
  const handleFaviconUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) setUploadError(data.error ?? "Upload failed");
      else setFaviconUrl(data.url);
    } catch {
      setUploadError("Upload failed — check your connection");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await Promise.all([
        updateSetting("favicon_url", faviconUrl),
        updateSetting("site_title", siteTitle),
        updateSetting("site_description", siteDescription),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } catch (err) {
      // requireUser() signs an expired session out via redirect(), which Next delivers by
      // REJECTING the action promise with a NEXT_REDIRECT error (see server-action-reducer).
      // unstable_rethrow lets that through so the admin lands on /login instead of
      // seeing "Save failed"; only real failures fall past it.
      unstable_rethrow(err);
      setSaveError("Save failed — some changes may not have been saved. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPage
        title="Settings"
        description="Favicon and the site title and description used in browser tabs, search results and link previews."
        footer={
          <>
            {/* One permanently-mounted live region, text swapped in place. A screen reader
                only announces a region that already existed when its content changed, so
                conditionally rendering two sibling <p>s would stay silent: React reconciles
                them as the same node and the region is never "new" nor pre-existing. */}
            <p
              aria-live="polite"
              className={`text-xs ${saveError ? "text-destructive" : "text-muted-foreground"}`}
            >
              {saveError ?? (saved ? "All changes saved." : "Unsaved changes will be lost on navigation.")}
            </p>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-2 min-w-32"
            >
              {saved ? (
                <><Check size={14} />Saved</>
              ) : saving ? (
                <><RefreshCw size={14} className="animate-spin" />Saving…</>
              ) : (
                <><Save size={14} />Save Settings</>
              )}
            </Button>
          </>
        }
      >
        <Tabs defaultValue="favicon" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="favicon" className="gap-2">
              <ImageLucide size={14} />
              Favicon
            </TabsTrigger>
            <TabsTrigger value="metadata" className="gap-2">
              <Globe size={14} />
              Metadata
            </TabsTrigger>
          </TabsList>

          {/* ── Favicon Tab ── */}
          <TabsContent value="favicon" className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
              {/* Preview + info */}
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 flex-shrink-0 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
                  {faviconUrl ? (
                    <Image
                      src={faviconUrl}
                      alt="Favicon preview"
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <ImageIcon size={28} className="text-muted-foreground/50" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className={SECTION_HEADING}>Site Favicon</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Displayed in browser tabs and bookmarks. Recommended: 32×32 or 64×64 px ICO or PNG. SVG is not accepted.
                  </p>
                  {faviconUrl && (
                    <Badge variant="secondary" className="text-[10px] mt-2 font-mono">
                      {faviconUrl}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              {/* URL input */}
              <div className="space-y-2">
                <Label htmlFor="favicon-url" className="text-sm">Favicon URL</Label>
                <Input
                  id="favicon-url"
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  placeholder="/uploads/favicon.ico"
                  className="font-mono text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="gap-2"
                >
                  {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "Uploading…" : "Upload New"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMediaPickerOpen(true)}
                  className="gap-2"
                >
                  <ImageIcon size={14} />
                  Pick from Media
                </Button>
              </div>

              {uploadError && (
                <p role="alert" className="text-xs text-destructive">{uploadError}</p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/x-icon,.ico"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFaviconUpload(f); }}
              />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Metadata Tab ── */}
          <TabsContent value="metadata" className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <h2 className={SECTION_HEADING}>Site Metadata</h2>
                <p className="text-xs text-muted-foreground">Used in browser title bar, search results, and link previews.</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title" className="text-sm">Site Title</Label>
                  <Input
                    id="site-title"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="My Portfolio — Fullstack Engineer"
                  />
                  <p className="text-[11px] text-muted-foreground">Shown in browser tab. Leave blank to use the default.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description" className="text-sm">Site Description</Label>
                  <Input
                    id="site-description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    placeholder="Building web apps and infrastructure at scale."
                  />
                  <p className="text-[11px] text-muted-foreground">Used in SEO meta description and Open Graph previews.</p>
                </div>
              </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminPage>

      <MediaPickerModal
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => { setFaviconUrl(url); setMediaPickerOpen(false); }}
      />
    </>
  );
}
