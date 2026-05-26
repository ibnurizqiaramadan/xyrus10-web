"use client";

import { useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateHero } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Hero, HeroInsert } from "@/lib/types";

export function HeroForm({ initialData }: { initialData: Hero | null }) {
  const [data, setData] = useState<HeroInsert>({
    name: initialData?.name ?? "",
    titleId: initialData?.titleId ?? "",
    titleEn: initialData?.titleEn ?? "",
    descriptionId: initialData?.descriptionId ?? "",
    descriptionEn: initialData?.descriptionEn ?? "",
    imageUrl: initialData?.imageUrl ?? ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    await updateHero(data);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-8 max-w-4xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input 
            value={data.name} 
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input 
            value={data.imageUrl ?? ""} 
            onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Title (ID)</Label>
          <Input 
            value={data.titleId} 
            onChange={(e) => setData({ ...data, titleId: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <Label>Title (EN)</Label>
          <Input 
            value={data.titleEn} 
            onChange={(e) => setData({ ...data, titleEn: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="space-y-4">
        <QuillEditor 
          label="Description (ID)"
          value={data.descriptionId}
          onChange={(val) => setData({ ...data, descriptionId: val })}
        />
        <QuillEditor 
          label="Description (EN)"
          value={data.descriptionEn}
          onChange={(val) => setData({ ...data, descriptionEn: val })}
        />
      </div>

      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="w-full bg-[#2b7fff] hover:bg-[#2b7fff]/90"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
