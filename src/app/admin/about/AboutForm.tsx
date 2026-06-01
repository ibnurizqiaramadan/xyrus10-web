"use client";

import { useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAbout } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { About, AboutInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";

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

  const handleSkillsChange = (newSkills: string[]) => {
    setData({ ...data, skills: JSON.stringify(newSkills) });
  };

  const skillsList = JSON.parse(data.skills || "[]") as string[];

  return (
    <div className="px-12 pb-20">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-12 max-w-5xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-30" />
        
        {/* Page Title Section */}
        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Introductory Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[#94A3B8] ml-1">Section Title (ID)</Label>
              <Input 
                value={data.titleId} 
                onChange={(e) => setData({ ...data, titleId: e.target.value })}
                className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#94A3B8] ml-1">Section Title (EN)</Label>
              <Input 
                value={data.titleEn} 
                onChange={(e) => setData({ ...data, titleEn: e.target.value })}
                className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
              />
            </div>
          </div>
        </section>

        {/* Biography Grid */}
        <section className="space-y-8 pt-6 border-t border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Extended Biography</h3>
          
          <div className="space-y-12">
            {/* Bio Row 1 */}
            <div className="grid grid-cols-1 gap-10">
              <QuillEditor 
                label="Bio Paragraph 1 (ID)"
                value={data.bio1Id}
                onChange={(val) => setData({ ...data, bio1Id: val })}
              />
              <QuillEditor 
                label="Bio Paragraph 1 (EN)"
                value={data.bio1En}
                onChange={(val) => setData({ ...data, bio1En: val })}
              />
            </div>

            {/* Bio Row 2 */}
            <div className="grid grid-cols-1 gap-10">
              <QuillEditor 
                label="Bio Paragraph 2 (ID)"
                value={data.bio2Id}
                onChange={(val) => setData({ ...data, bio2Id: val })}
              />
              <QuillEditor 
                label="Bio Paragraph 2 (EN)"
                value={data.bio2En}
                onChange={(val) => setData({ ...data, bio2En: val })}
              />
            </div>

            {/* Bio Row 3 */}
            <div className="grid grid-cols-1 gap-10">
              <QuillEditor 
                label="Bio Paragraph 3 (ID)"
                value={data.bio3Id}
                onChange={(val) => setData({ ...data, bio3Id: val })}
              />
              <QuillEditor 
                label="Bio Paragraph 3 (EN)"
                value={data.bio3En}
                onChange={(val) => setData({ ...data, bio3En: val })}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-10 pt-10 border-t border-white/5">
          <DynamicList 
            label="Core Expertise Tags"
            values={skillsList}
            onChange={handleSkillsChange}
            placeholder="e.g. Next.js, React, Docker..."
          />
        </section>

        <div className="pt-8 border-t border-white/5">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full md:w-auto md:px-12 h-12 bg-[#2b7fff] hover:bg-[#2b7fff]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-[0.98]"
          >
            {isSaving ? "Processing..." : "Save Bio Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
