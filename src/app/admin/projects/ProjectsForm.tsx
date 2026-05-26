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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#F8FAFC]">Manage Projects</h3>
        <Button onClick={handleAdd} className="bg-[#2b7fff] hover:bg-[#2b7fff]/90 gap-2">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div key={index} className="glass-card p-6 rounded-[2rem] border-white/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tech Stack (JSON Array)</Label>
                  <Input
                    value={project.techStack}
                    onChange={(e) => updateProject(index, "techStack", e.target.value)}
                    placeholder='["React", "Next.js"]'
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => project.id && handleDelete(project.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Github width={14} height={14} /> GitHub URL</Label>
                <Input
                  value={project.githubUrl || ""}
                  onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><ExternalLink size={14} /> Demo URL</Label>
                <Input
                  value={project.demoUrl || ""}
                  onChange={(e) => updateProject(index, "demoUrl", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={project.imageUrl || ""}
                  onChange={(e) => updateProject(index, "imageUrl", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <QuillEditor
                label="Description (ID)"
                value={project.descriptionId}
                onChange={(val) => updateProject(index, "descriptionId", val)}
              />
              <QuillEditor
                label="Description (EN)"
                value={project.descriptionEn}
                onChange={(val) => updateProject(index, "descriptionEn", val)}
              />
            </div>

            <Button
              onClick={() => handleSave(project)}
              disabled={isSaving}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
