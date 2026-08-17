"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MediaManager } from "../media/MediaManager";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ open, onClose, onSelect }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-full max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Pick from Media Library</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="overflow-y-auto flex-1 pt-4">
          <MediaManager onSelect={onSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
