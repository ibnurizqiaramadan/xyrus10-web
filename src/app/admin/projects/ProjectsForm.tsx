"use client";

import { useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveProject, deleteProject } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { ProjectInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";

export function ProjectsForm({ initialData }: { initialData: ProjectInsert[] }) {
  const [projects, setProjects] = useState<ProjectInsert[]>(initialData || []);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    setProjects([
      ...projects,
      {
        title: "New Project",
        descriptionId: "",
        descriptionEn: "",
        techStack: "[]",
        githubUrl: "",
        demoUrl: "",
        imageUrl: "",
        displayOrder: projects.length,
      },
    ]);
  };

  const handleSave = async (project: ProjectInsert) => {
    setIsSaving(true);
    const result = await saveProject(project); 
    if (result.success) {
      router.refresh();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    if (id) {
      await deleteProject(id);
    }
    router.refresh();
  };

  const updateProject = <K extends keyof ProjectInsert>(index: number, field: K, value: ProjectInsert[K]) => {
    if (projects[index][field] === value) return;
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const handleTechStackChange = (index: number, newValues: string[]) => {
    updateProject(index, "techStack", JSON.stringify(newValues));
  };

  return (
    <div className="px-12 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#2b7fff] opacity-80">
          Portfolio Archive
        </h3>
        <Button onClick={handleAdd} className="bg-[#2b7fff] hover:bg-[#2b7fff]/90 px-6 h-11 rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-95 gap-2">
          <Plus size={18} strokeWidth={2.5} /> <span className="font-bold">New Project</span>
        </Button>
      </div>

      <div className="grid gap-10">
        {projects.map((project, index) => (
          <div key={index} className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden transition-all duration-300 hover:border-white/10 group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 gap-8 flex-1 mr-8">
                <div className="space-y-3">
                  <Label className="text-[#94A3B8] ml-1 font-bold text-[10px] uppercase tracking-wider">Project Identifier</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    className="bg-white/[0.03] border-white/10 h-12 px-5 rounded-xl focus:ring-[#2b7fff]/20 text-lg font-bold text-[#F8FAFC]"
                    placeholder="Enter project name..."
                  />
                </div>
                
                <div className="pt-4 px-1">
                  <DynamicList 
                    label="Technology Stack"
                    values={JSON.parse(project.techStack || "[]")}
                    onChange={(vals) => handleTechStackChange(index, vals)}
                    placeholder="e.g. Next.js, Tailwind, Drizzle..."
                  />
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => project.id && handleDelete(project.id)}
                className="w-12 h-12 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all"
              >
                <Trash2 size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-3">
                <Label className="text-[#94A3B8] ml-1 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2"><Github width={14} height={14} /> Repository</Label>
                <Input
                  value={project.githubUrl || ""}
                  onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                  className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl text-sm"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[#94A3B8] ml-1 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2"><ExternalLink size={14} /> Live Deployment</Label>
                <Input
                  value={project.demoUrl || ""}
                  onChange={(e) => updateProject(index, "demoUrl", e.target.value)}
                  className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl text-sm"
                  placeholder="https://demo.com"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[#94A3B8] ml-1 font-bold text-[10px] uppercase tracking-wider">Thumbnail Preview</Label>
                <Input
                  value={project.imageUrl || ""}
                  onChange={(e) => updateProject(index, "imageUrl", e.target.value)}
                  className="bg-white/[0.03] border-white/10 h-11 px-4 rounded-xl text-sm"
                  placeholder="/projects/image.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 border-t border-white/5">
              <QuillEditor
                label="Case Study (ID)"
                value={project.descriptionId}
                onChange={(val) => updateProject(index, "descriptionId", val)}
              />
              <QuillEditor
                label="Case Study (EN)"
                value={project.descriptionEn}
                onChange={(val) => updateProject(index, "descriptionEn", val)}
              />
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-end">
              <Button
                onClick={() => handleSave(project)}
                disabled={isSaving}
                className="w-full md:w-auto px-10 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/10 transition-all active:scale-95"
              >
                {isSaving ? "Syncing..." : "Update Repository Entry"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
