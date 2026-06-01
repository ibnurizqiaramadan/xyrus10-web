"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveExperience, deleteExperience } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Calendar, MapPin, Briefcase } from "lucide-react";
import { ExperienceInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";

export function ExperienceForm({ initialData }: { initialData: ExperienceInsert[] }) {
  const [experiences, setExperiences] = useState<ExperienceInsert[]>(initialData || []);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    setExperiences([
      ...experiences,
      {
        company: "New Company",
        roleId: "",
        roleEn: "",
        location: "",
        periodId: "",
        periodEn: "",
        achievementsId: "[]",
        achievementsEn: "[]",
        displayOrder: experiences.length,
      },
    ]);
  };

  const handleSave = async (exp: ExperienceInsert) => {
    setIsSaving(true);
    const result = await saveExperience(exp);
    if (result.success) {
      router.refresh();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    if (id) {
      await deleteExperience(id);
    }
    router.refresh();
  };

  const updateExp = <K extends keyof ExperienceInsert>(index: number, field: K, value: ExperienceInsert[K]) => {
    if (experiences[index][field] === value) return;
    const newExps = [...experiences];
    newExps[index] = { ...newExps[index], [field]: value };
    setExperiences(newExps);
  };

  const handleAchievementsChange = (index: number, field: "achievementsId" | "achievementsEn", newValues: string[]) => {
    updateExp(index, field, JSON.stringify(newValues));
  };

  return (
    <div className="px-12 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-80">
          Professional Ledger
        </h3>
        <Button onClick={handleAdd} className="bg-[#2b7fff] hover:bg-[#2b7fff]/90 px-6 h-11 rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-95 gap-2">
          <Plus size={18} strokeWidth={2.5} /> <span className="font-bold">Add Career Node</span>
        </Button>
      </div>

      <div className="grid gap-12 relative">
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#2b7fff]/30 via-white/5 to-transparent" />

        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-10 group relative">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#111] border-2 border-[#2b7fff]/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(43,127,255,0.2)]">
              <Briefcase size={18} className="text-[#2b7fff]" />
            </div>

            <div className="glass-card flex-1 p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden transition-all duration-300 hover:border-white/10">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
              
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mr-8">
                  <div className="space-y-2">
                    <Label className="text-[#94A3B8] ml-1 font-bold text-xs uppercase tracking-tighter">Entity / Organization</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExp(index, "company", e.target.value)}
                      className="bg-white/[0.03] border-white/10 h-12 px-5 rounded-xl focus:ring-[#2b7fff]/20 text-lg font-bold text-[#F8FAFC]"
                      placeholder="e.g. Google, ITB..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#94A3B8] ml-1 font-bold text-xs uppercase tracking-tighter flex items-center gap-2"><MapPin size={12} /> Geographical Context</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExp(index, "location", e.target.value)}
                      className="bg-white/[0.03] border-white/10 h-12 px-5 rounded-xl"
                      placeholder="e.g. Remote, Bandung..."
                    />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => exp.id && handleDelete(exp.id)}
                  className="w-12 h-12 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all"
                >
                  <Trash2 size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-60">Designation</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#64748B] text-[10px] font-bold uppercase ml-1">Role Title (ID)</Label>
                      <Input
                        value={exp.roleId}
                        onChange={(e) => updateExp(index, "roleId", e.target.value)}
                        className="bg-white/[0.02] border-white/5 h-11 px-4 rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#64748B] text-[10px] font-bold uppercase ml-1">Role Title (EN)</Label>
                      <Input
                        value={exp.roleEn}
                        onChange={(e) => updateExp(index, "roleEn", e.target.value)}
                        className="bg-white/[0.02] border-white/5 h-11 px-4 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-60 flex items-center gap-2"><Calendar size={10} /> Temporal Period</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#64748B] text-[10px] font-bold uppercase ml-1">Duration (ID)</Label>
                      <Input
                        value={exp.periodId}
                        onChange={(e) => updateExp(index, "periodId", e.target.value)}
                        placeholder="e.g. 2022 - Sekarang"
                        className="bg-white/[0.02] border-white/5 h-11 px-4 rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#64748B] text-[10px] font-bold uppercase ml-1">Duration (EN)</Label>
                      <Input
                        value={exp.periodEn}
                        onChange={(e) => updateExp(index, "periodEn", e.target.value)}
                        placeholder="e.g. 2022 - Present"
                        className="bg-white/[0.02] border-white/5 h-11 px-4 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10 pt-8 border-t border-white/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-60">Key Contributions</h4>
                <div className="grid grid-cols-1 gap-12 px-4">
                  <DynamicList 
                    label="Achievements (ID)"
                    values={JSON.parse(exp.achievementsId || "[]")}
                    onChange={(vals) => handleAchievementsChange(index, "achievementsId", vals)}
                    placeholder="Describe a key achievement..."
                  />
                  <DynamicList 
                    label="Achievements (EN)"
                    values={JSON.parse(exp.achievementsEn || "[]")}
                    onChange={(vals) => handleAchievementsChange(index, "achievementsEn", vals)}
                    placeholder="Describe a key achievement..."
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-end">
                <Button
                  onClick={() => handleSave(exp)}
                  disabled={isSaving}
                  className="w-full md:w-auto px-10 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/10 transition-all active:scale-95"
                >
                  {isSaving ? "Finalizing..." : "Update Experience Data"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
