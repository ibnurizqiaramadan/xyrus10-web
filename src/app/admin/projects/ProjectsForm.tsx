"use client";

import { useId, useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveProject, deleteProject } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, ExternalLink, Code2, Save, Loader2 } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { ProjectInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";
import { AdminPage } from "@/components/admin/AdminPage";
import { slugify } from "@/lib/utils";

type ProjectWithId = ProjectInsert & { id?: number };

const blankProject = (order: number): ProjectWithId => ({
  title: "",
  slug: "",
  descriptionId: "",
  descriptionEn: "",
  techStack: "[]",
  githubUrl: "",
  demoUrl: "",
  imageUrl: "",
  displayOrder: order,
});

export function ProjectsForm({ initialData }: { initialData: ProjectWithId[] }) {
  const projects = initialData || [];
  const [draft, setDraft] = useState<ProjectWithId | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProjectWithId | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  // ponytail: one useId prefix keeps every field id unique document-wide, no manual bookkeeping
  const uid = useId();

  const isNew = draft != null && draft.id == null;

  const update = <K extends keyof ProjectWithId>(field: K, value: ProjectWithId[K]) => {
    setDraft((d) => (d ? { ...d, [field]: value } : d));
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    await saveProject(draft);
    setSaving(false);
    setDraft(null);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setDeleting(true);
    await deleteProject(deleteTarget.id);
    setDeleteTarget(null);
    setDeleting(false);
    router.refresh();
  };

  const techList = (json?: string): string[] => {
    try { return JSON.parse(json || "[]"); } catch { return []; }
  };

  return (
    <>
      <AdminPage
        title="Projects"
        description="Portfolio entries shown in the projects grid and on their own /project/[slug] page."
        width="wide"
        actions={
          <>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
            <Button onClick={() => setDraft(blankProject(projects.length))} size="sm" className="gap-2">
              <Plus size={14} />
              Add Project
            </Button>
          </>
        }
      >
        {projects.length === 0 ? (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center gap-3 text-muted-foreground">
              <Code2 size={40} className="opacity-30" />
              <p className="text-sm font-medium">No projects yet</p>
              <Button variant="outline" size="sm" onClick={() => setDraft(blankProject(0))} className="gap-2">
                <Plus size={14} />
                Add your first project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-4">Project</TableHead>
                  <TableHead className="hidden sm:table-cell">Tech Stack</TableHead>
                  <TableHead className="hidden sm:table-cell">Links</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const tech = techList(project.techStack);
                  return (
                    <TableRow key={project.id}>
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Code2 size={14} className="text-primary" />
                          </div>
                          {/* ponytail: below sm the title wraps — `truncate` is nowrap, which pins the
                              auto-table column to the full title width and pushes Actions off a 375px screen */}
                          <p className="font-medium break-words sm:truncate">
                            {project.title || <span className="text-muted-foreground font-normal italic">Untitled</span>}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {tech.slice(0, 3).map((t, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{t}</Badge>
                          ))}
                          {tech.length > 3 && <Badge variant="outline" className="text-xs">+{tech.length - 3}</Badge>}
                          {tech.length === 0 && <span className="text-muted-foreground italic">—</span>}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {project.githubUrl ? <Github width={14} height={14} /> : null}
                          {project.demoUrl ? <ExternalLink size={14} /> : null}
                          {!project.githubUrl && !project.demoUrl && <span className="italic">—</span>}
                        </div>
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDraft({ ...project })}
                            aria-label={`Edit ${project.title || "untitled project"}`}
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(project)}
                            aria-label={`Delete ${project.title || "untitled project"}`}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </AdminPage>

      {/* Edit / Add Modal */}
      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Project" : "Edit Project"}</DialogTitle>
            <DialogDescription>Portfolio item shown on the public site.</DialogDescription>
          </DialogHeader>

          {draft && (
            <div className="space-y-6 py-2">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor={`${uid}-title`}>Project Title</Label>
                <Input
                  id={`${uid}-title`}
                  value={draft.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setDraft((d) => {
                      if (!d) return d;
                      // auto-sync slug only while it still mirrors the title (untouched)
                      const autoSync = !d.slug || d.slug === slugify(d.title);
                      return { ...d, title, slug: autoSync ? slugify(title) : d.slug };
                    });
                  }}
                  placeholder="e.g. Portfolio CMS"
                  className="text-base font-medium"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor={`${uid}-slug`} className="flex items-center gap-1.5 text-xs">
                  URL Slug
                  <span className="text-muted-foreground font-normal normal-case">/project/{draft.slug || "…"}</span>
                </Label>
                <Input
                  id={`${uid}-slug`}
                  value={draft.slug || ""}
                  onChange={(e) => update("slug", slugify(e.target.value))}
                  placeholder="auto-generated-from-title"
                  className="text-sm font-mono"
                />
              </div>

              {/* Tech Stack */}
              <DynamicList
                label="Tech Stack"
                values={techList(draft.techStack)}
                onChange={(vals) => update("techStack", JSON.stringify(vals))}
                placeholder="e.g. Next.js, Tailwind…"
                asBadges
              />

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-github`} className="flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground"><Github width={12} height={12} /></span>
                    GitHub URL
                  </Label>
                  <Input
                    id={`${uid}-github`}
                    value={draft.githubUrl || ""}
                    onChange={(e) => update("githubUrl", e.target.value)}
                    placeholder="https://github.com/…"
                    className="text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-demo`} className="flex items-center gap-1.5 text-xs">
                    <ExternalLink size={12} className="text-muted-foreground" />
                    Demo URL
                  </Label>
                  <Input
                    id={`${uid}-demo`}
                    value={draft.demoUrl || ""}
                    onChange={(e) => update("demoUrl", e.target.value)}
                    placeholder="https://demo.example.com"
                    className="text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-thumbnail`} className="text-xs">Thumbnail URL</Label>
                  <Input
                    id={`${uid}-thumbnail`}
                    value={draft.imageUrl || ""}
                    onChange={(e) => update("imageUrl", e.target.value)}
                    placeholder="/uploads/project.jpg"
                    className="text-sm font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Description</h3>
                <Tabs defaultValue="id">
                  <TabsList className="mb-3">
                    <TabsTrigger value="id">ID 🇮🇩</TabsTrigger>
                    <TabsTrigger value="en">EN 🇬🇧</TabsTrigger>
                  </TabsList>
                  <TabsContent value="id">
                    <QuillEditor
                      label="Description (Bahasa Indonesia)"
                      value={draft.descriptionId}
                      onChange={(val) => update("descriptionId", val)}
                    />
                  </TabsContent>
                  <TabsContent value="en">
                    <QuillEditor
                      label="Description (English)"
                      value={draft.descriptionEn}
                      onChange={(val) => update("descriptionEn", val)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDraft(null)} disabled={saving}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="gap-2 min-w-28">
              {saving ? <><Loader2 size={14} className="animate-spin" />Saving…</> : <><Save size={14} />Save</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Remove <span className="font-semibold text-foreground">{deleteTarget?.title || "this project"}</span> from your portfolio? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Trash2 size={14} className="mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
