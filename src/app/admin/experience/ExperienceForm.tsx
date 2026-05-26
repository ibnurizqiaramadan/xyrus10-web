"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveExperience, deleteExperience } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Calendar, MapPin, Briefcase } from "lucide-react";
import { ExperienceInsert } from "@/lib/types";

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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#F8FAFC]">Work Experience</h3>
        <Button onClick={handleAdd} className="bg-[#2b7fff] hover:bg-[#2b7fff]/90 gap-2">
          <Plus size={18} /> Add Experience
        </Button>
      </div>

      <div className="grid gap-6">
        {experiences.map((exp, index) => (
          <div key={index} className="glass-card p-6 rounded-[2rem] border-white/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExp(index, "company", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin size={14} /> Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExp(index, "location", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => exp.id && handleDelete(exp.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Briefcase size={14} /> Role (ID)</Label>
                <Input
                  value={exp.roleId}
                  onChange={(e) => updateExp(index, "roleId", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Briefcase size={14} /> Role (EN)</Label>
                <Input
                  value={exp.roleEn}
                  onChange={(e) => updateExp(index, "roleEn", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Calendar size={14} /> Period (ID)</Label>
                <Input
                  value={exp.periodId}
                  onChange={(e) => updateExp(index, "periodId", e.target.value)}
                  placeholder="e.g. 2022 - Sekarang"
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Calendar size={14} /> Period (EN)</Label>
                <Input
                  value={exp.periodEn}
                  onChange={(e) => updateExp(index, "periodEn", e.target.value)}
                  placeholder="e.g. 2022 - Present"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Achievements (ID) - JSON Array of strings</Label>
                <Input
                  value={exp.achievementsId}
                  onChange={(e) => updateExp(index, "achievementsId", e.target.value)}
                  placeholder='["Memimpin tim...", "Mengoptimalkan..."]'
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Achievements (EN) - JSON Array of strings</Label>
                <Input
                  value={exp.achievementsEn}
                  onChange={(e) => updateExp(index, "achievementsEn", e.target.value)}
                  placeholder='["Led the team...", "Optimized..."]'
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <Button
              onClick={() => handleSave(exp)}
              disabled={isSaving}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSaving ? "Saving..." : "Save Experience"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
