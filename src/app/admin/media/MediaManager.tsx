"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, Trash2, Check, ImageIcon, RefreshCw, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { AdminPage } from "@/components/admin/AdminPage";

// One class string for the skeleton grid and the real grid so the two cannot drift and the
// placeholders land exactly where the tiles will. 2 columns at 375px, widening with the viewport.
const GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5";

// Matches the section-heading treatment used by the other admin content pages.
const SECTION_HEADING = "text-sm font-semibold uppercase tracking-widest text-muted-foreground";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

// ponytail: one fixed string so the shared error panel (which keys by message) can
// de-dupe it across retries without a second error state.
const LOAD_ERROR = "Could not load media — refresh to retry.";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaManager({ onSelect }: { onSelect?: (url: string) => void }) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "request failed");
      setFiles(data.files ?? []);
      setErrors((prev) => prev.filter((e) => !e.startsWith(LOAD_ERROR)));
    } catch (e) {
      // Carry the server's reason ("Unauthorized", "File not found") instead of a fixed
      // string — the generic message tells an admin whose session expired to retry, which
      // is the one thing that cannot work. De-dupe on the prefix so the clear above matches.
      const msg = `${LOAD_ERROR}: ${e instanceof Error ? e.message : "request failed"}`;
      setErrors((prev) => (prev.includes(msg) ? prev : [...prev, msg]));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  // ponytail: inline error list, not a toast — the admin has no toast host, and one error
  // panel beats a notification library. Upgrade path: add sonner + a <Toaster /> in the
  // admin layout only if several screens end up needing it.
  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    // Clear stale failures: a rejected upload's message otherwise sticks forever, since
    // fetchFiles only clears LOAD_ERROR. Every user-initiated action resets the panel.
    setErrors([]);
    setUploading(true);
    const errors: string[] = [];
    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          errors.push(`${file.name}: ${data.error ?? "upload failed"}`);
        }
      } catch {
        errors.push(`${file.name}: upload failed — check your connection`);
      }
    }
    setErrors(errors);
    await fetchFiles();
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { name } = deleteTarget;
    setDeleting(true);
    setErrors([]);
    try {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors([`${name}: ${data.error ?? "delete failed"}`]);
      }
    } catch {
      setErrors([`${name}: delete failed — check your connection`]);
    } finally {
      setDeleteTarget(null);
      setDeleting(false);
    }
    await fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Rendered in two places, so the sections live in one variable: the /admin/media page wraps
  // them in AdminPage (which owns the h1, padding and max width), while MediaPickerModal renders
  // them inside a Dialog that already has its own title and padding.
  const sections = (
    <>
      <section className="space-y-3">
        <h2 className={SECTION_HEADING}>Upload</h2>
        {/* Upload Zone */}
        <div
          className={`relative rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-accent/5"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          // The file input it proxies is display:none and the "Choose files" button only
          // renders in the empty state, so once anything is uploaded this was the page's
          // primary action with no keyboard path to it at all.
          role="button"
          tabIndex={0}
          aria-label="Upload images — drop files here or activate to browse"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/x-icon,.ico"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3 pointer-events-none">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${dragOver ? "bg-primary/20" : "bg-muted"}`}>
              {uploading ? (
                <RefreshCw size={24} className="text-primary animate-spin" />
              ) : (
                <Upload size={24} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {uploading ? "Uploading files…" : "Drop images here, or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG · JPG · GIF · WebP · ICO — max 5 MB each (no SVG)</p>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 space-y-1">
            {errors.map((e) => (
              <p key={e} className="text-xs text-destructive">{e}</p>
            ))}
          </div>
        )}
      </section>

      <Separator />

      <section className="space-y-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className={SECTION_HEADING}>Library</h2>
            <span className="text-sm font-medium text-foreground">
              {loading ? "Loading…" : `${files.length} file${files.length !== 1 ? "s" : ""}`}
            </span>
            {!loading && files.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {files.reduce((acc, f) => acc + f.size, 0) > 1024 * 1024
                  ? `${(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(1)} MB total`
                  : `${(files.reduce((acc, f) => acc + f.size, 0) / 1024).toFixed(0)} KB total`}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFiles}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className={GRID}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-3 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && files.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon size={28} className="text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">No images uploaded yet</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Anything you upload here is stored in <code className="font-mono text-xs">/uploads</code> and
                can then be picked as the hero portrait, a project thumbnail, or the site favicon.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload size={14} />
              Choose files
            </Button>
          </div>
        )}

        {/* Image Grid. In picker mode each tile takes role="button", which strips its listitem
            role and leaves the ul announcing as a list with zero items — role="presentation"
            drops the misleading wrapper semantics while keeping the grid classes. */}
        {!loading && files.length > 0 && (
          <ul className={GRID} role={onSelect ? "presentation" : undefined}>
            {files.map((file) => {
              // The stored name is prefixed with an upload timestamp; show the original.
              const label = file.name.replace(/^\d+-/, "");
              return (
              <li
                key={file.name}
                className={`group relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
                  onSelect
                    ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    : ""
                }`}
                // Picker mode makes the whole tile the control. It cannot be a real <button>:
                // the tile already contains one (Copy URL), and nesting buttons is invalid HTML
                // that browsers recover from by breaking the inner control.
                role={onSelect ? "button" : undefined}
                tabIndex={onSelect ? 0 : undefined}
                aria-label={onSelect ? `Select ${label}` : undefined}
                onClick={() => onSelect?.(file.url)}
                onKeyDown={
                  onSelect
                    ? (e) => {
                        // Ignore keys bubbling up from the inner Copy button, which activates
                        // itself on the same two keys and would otherwise also pick the file.
                        if (e.target !== e.currentTarget) return;
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault(); // Space would scroll the dialog
                        onSelect(file.url);
                      }
                    : undefined
                }
              >
                {/* aspect-square reserves the tile's height before the image decodes, so the
                    grid does not reflow as thumbnails load. */}
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={file.url}
                    alt={label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Action overlay. focus-within keeps it visible for keyboard users, who
                      never trigger the hover state. */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                          aria-label={`Copy URL for ${label}`}
                          className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        >
                          {copiedUrl === file.url
                            ? <Check size={15} className="text-green-400" />
                            : <Link2 size={15} />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Copy URL</TooltipContent>
                    </Tooltip>

                    {!onSelect && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(file); }}
                            aria-label={`Delete ${label}`}
                            className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 space-y-1">
                  <p className="text-xs font-medium text-foreground truncate" title={file.name}>
                    {label}
                  </p>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-muted-foreground border-border">
                    {formatBytes(file.size)}
                  </Badge>
                </div>
              </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );

  return (
    <TooltipProvider>
      {onSelect ? (
        // Picker mode: the surrounding Dialog supplies the title, width and vertical padding,
        // so only the horizontal inset is needed here to line up with the dialog header.
        <div className="px-6 pb-6 space-y-6">{sections}</div>
      ) : (
        <AdminPage
          title="Media"
          description="Images stored in /uploads, available to pick as the hero portrait, project thumbnails and the site favicon."
          width="wide"
        >
          {sections}
        </AdminPage>
      )}

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Permanently delete{" "}
              <span className="font-mono text-xs text-foreground">
                {deleteTarget?.name.replace(/^\d+-/, "")}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <RefreshCw size={14} className="mr-2 animate-spin" /> : <Trash2 size={14} className="mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
