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
    <div className="px-12 pb-20">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 max-w-5xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-30" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Identity</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Full Name</Label>
                <Input 
                  value={data.name} 
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Avatar Image URL</Label>
                <Input 
                  value={data.imageUrl ?? ""} 
                  onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Professional Title</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Title (ID)</Label>
                <Input 
                  value={data.titleId} 
                  onChange={(e) => setData({ ...data, titleId: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1">Title (EN)</Label>
                <Input 
                  value={data.titleEn} 
                  onChange={(e) => setData({ ...data, titleEn: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Biography</h3>
          <div className="grid grid-cols-1 gap-10">
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
        </div>

        <div className="pt-6 border-t border-white/5">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full md:w-auto md:px-12 h-12 bg-[#2b7fff] hover:bg-[#2b7fff]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-[0.98]"
          >
            {isSaving ? "Synchronizing..." : "Commit Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
