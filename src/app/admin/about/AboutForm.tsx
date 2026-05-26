"use client";

import { useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAbout } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { About, AboutInsert } from "@/lib/types";

export function AboutForm({ initialData }: { initialData: About | null }) {
  const [data, setData] = useState<AboutInsert>({
    titleId: initialData?.titleId ?? "",
    titleEn: initialData?.titleEn ?? "",
    bio1Id: initialData?.bio1Id ?? "",
    bio1En: initialData?.bio1En ?? "",
    bio2Id: initialData?.bio2Id ?? "",
    bio2En: initialData?.bio2En ?? "",
    bio3Id: initialData?.bio3Id ?? "",
    bio3En: initialData?.bio3En ?? "",
    skills: initialData?.skills ?? "[]"
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    await updateAbout(data);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-8 max-w-4xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
      
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
        <h3 className="text-xl font-bold text-white">Bio Sections</h3>
        <QuillEditor 
          label="Bio 1 (ID)"
          value={data.bio1Id}
          onChange={(val) => setData({ ...data, bio1Id: val })}
        />
        <QuillEditor 
          label="Bio 1 (EN)"
          value={data.bio1En}
          onChange={(val) => setData({ ...data, bio1En: val })}
        />
        <QuillEditor 
          label="Bio 2 (ID)"
          value={data.bio2Id}
          onChange={(val) => setData({ ...data, bio2Id: val })}
        />
        <QuillEditor 
          label="Bio 2 (EN)"
          value={data.bio2En}
          onChange={(val) => setData({ ...data, bio2En: val })}
        />
        <QuillEditor 
          label="Bio 3 (ID)"
          value={data.bio3Id}
          onChange={(val) => setData({ ...data, bio3Id: val })}
        />
        <QuillEditor 
          label="Bio 3 (EN)"
          value={data.bio3En}
          onChange={(val) => setData({ ...data, bio3En: val })}
        />
      </div>

      <div className="space-y-2">
        <Label>Skills (JSON Array)</Label>
        <textarea
          value={data.skills}
          onChange={(e) => setData({ ...data, skills: e.target.value })}
          className="w-full h-32 bg-white/5 border-white/10 rounded-xl p-4 text-[#F8FAFC] font-mono text-sm"
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
