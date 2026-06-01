"use client";

import { X } from "lucide-react";
import { MediaManager } from "../media/MediaManager";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Pick from Media Library</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 pt-6">
          <MediaManager onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}
