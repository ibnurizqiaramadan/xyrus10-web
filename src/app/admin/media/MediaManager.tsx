"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, Trash2, Copy, Check, ImageIcon, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

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
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/files");
    const data = await res.json();
    setFiles(data.files ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);

    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append("file", file);
      await fetch("/api/upload", { method: "POST", body: formData });
    }

    await fetchFiles();
    setUploading(false);
  };

  const handleDelete = async (filename: string) => {
    await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    setDeleteTarget(null);
    await fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="px-12 pb-20">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 mb-8 text-center transition-all duration-200 cursor-pointer ${
          dragOver
            ? "border-[#2b7fff] bg-[#2b7fff]/10"
            : "border-white/10 hover:border-white/20 bg-white/[0.01]"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <RefreshCw size={36} className="text-[#2b7fff] animate-spin" />
          ) : (
            <Upload size={36} className="text-slate-500" />
          )}
          <div>
            <p className="text-slate-300 font-medium">
              {uploading ? "Uploading..." : "Drop images here or click to upload"}
            </p>
            <p className="text-slate-600 text-sm mt-1">PNG, JPG, GIF, WebP, SVG, ICO — max 5MB each</p>
          </div>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400 text-sm">
          {loading ? "Loading..." : `${files.length} file${files.length !== 1 ? "s" : ""}`}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchFiles}
          className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
        >
          <RefreshCw size={14} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Grid */}
      {!loading && files.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-slate-600">
          <ImageIcon size={48} />
          <p>No images uploaded yet</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {files.map((file) => (
          <div
            key={file.name}
            className={`group relative rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-[#2b7fff]/40 transition-all duration-200 ${
              onSelect ? "cursor-pointer" : ""
            }`}
            onClick={() => onSelect?.(file.url)}
          >
            {/* Image preview */}
            <div className="aspect-square relative bg-[#111]">
              <Image
                src={file.url}
                alt={file.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="text-xs text-slate-400 truncate" title={file.name}>
                {file.name.replace(/^\d+-/, "")}
              </p>
              <p className="text-[10px] text-slate-600">{formatBytes(file.size)}</p>
            </div>

            {/* Actions overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#2b7fff]/30 text-white transition-colors"
                title="Copy URL"
              >
                {copiedUrl === file.url ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setDeleteTarget(file.name); }}
                className="p-2 rounded-lg bg-white/10 hover:bg-red-500/30 text-white transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Delete Image</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Permanently delete <span className="text-white font-mono text-xs">{deleteTarget.replace(/^\d+-/, "")}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/10 text-slate-400 hover:text-white"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(deleteTarget)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
