"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSetting } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Upload, RefreshCw, ImageIcon, Check } from "lucide-react";
import Image from "next/image";
import { MediaPickerModal } from "./MediaPickerModal";

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
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFaviconUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setFaviconUrl(data.url);
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await Promise.all([
      updateSetting("favicon_url", faviconUrl),
      updateSetting("site_title", siteTitle),
      updateSetting("site_description", siteDescription),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <>
      <div className="px-12 pb-20">
        <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-12 max-w-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-30" />

          {/* Favicon Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Favicon</h3>

            <div className="flex items-start gap-6">
              {/* Preview */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden">
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
                  <ImageIcon size={32} className="text-slate-600" />
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <Label className="text-[#94A3B8] ml-1">Favicon URL</Label>
                  <Input
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    placeholder="/uploads/favicon.ico"
                    className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <RefreshCw size={14} className="mr-2 animate-spin" />
                    ) : (
                      <Upload size={14} className="mr-2" />
                    )}
                    Upload Favicon
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    Pick from Media
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.ico"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFaviconUpload(file);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Site Metadata Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Site Metadata</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Site Title</Label>
                <Input
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="My Portfolio"
                  className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Site Description</Label>
                <Input
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  placeholder="Full-stack engineer and developer"
                  className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="pt-6 border-t border-white/5">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto md:px-12 h-12 bg-[#2b7fff] hover:bg-[#2b7fff]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-[0.98]"
            >
              {saved ? (
                <><Check size={16} className="mr-2" />Saved</>
              ) : saving ? (
                "Saving..."
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </div>
      </div>

      <MediaPickerModal
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => {
          setFaviconUrl(url);
          setMediaPickerOpen(false);
        }}
      />
    </>
  );
}
