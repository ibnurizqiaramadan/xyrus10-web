"use client";

import { useId, useState } from "react";
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
import { saveExperience, deleteExperience } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, MapPin, Calendar, Briefcase, Save, Loader2 } from "lucide-react";
import { ExperienceInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";
import { AdminPage } from "@/components/admin/AdminPage";

type ExpWithId = ExperienceInsert & { id?: number };

const blankExp = (order: number): ExpWithId => ({
  company: "",
  roleId: "",
  roleEn: "",
  location: "",
  periodId: "",
  periodEn: "",
  achievementsId: "[]",
  achievementsEn: "[]",
  displayOrder: order,
});

export function ExperienceForm({ initialData }: { initialData: ExpWithId[] }) {
  const experiences = initialData || [];
  const [draft, setDraft] = useState<ExpWithId | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ExpWithId | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  // ponytail: one useId prefix keeps every field id unique document-wide, no manual bookkeeping
  const uid = useId();

  const isNew = draft != null && draft.id == null;

  const update = <K extends keyof ExpWithId>(field: K, value: ExpWithId[K]) => {
    setDraft((d) => (d ? { ...d, [field]: value } : d));
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    await saveExperience(draft);
    setSaving(false);
    setDraft(null);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setDeleting(true);
    await deleteExperience(deleteTarget.id);
    setDeleteTarget(null);
    setDeleting(false);
    router.refresh();
  };

  const achCount = (json?: string) => {
    try { return (JSON.parse(json || "[]") as string[]).length; } catch { return 0; }
  };

  return (
    <>
      <AdminPage
        title="Experience"
        description="Employers, roles and achievements listed in the experience section of the public site."
        width="wide"
        actions={
          <>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {experiences.length} {experiences.length === 1 ? "entry" : "entries"}
            </span>
            <Button onClick={() => setDraft(blankExp(experiences.length))} size="sm" className="gap-2">
              <Plus size={14} />
              Add Experience
            </Button>
          </>
        }
      >
        {experiences.length === 0 ? (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center gap-3 text-muted-foreground">
              <Briefcase size={40} className="opacity-30" />
              <p className="text-sm font-medium">No experience entries yet</p>
              <Button variant="outline" size="sm" onClick={() => setDraft(blankExp(0))} className="gap-2">
                <Plus size={14} />
                Add your first entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-4">Company</TableHead>
                  {/* Hidden below sm like Period/Achievements: with Role visible the row
                      measured 365px against 341px available, clipping the last 8px of every
                      Delete button so it could only be reached by scrolling the card sideways. */}
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Period</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">Achievements</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={14} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          {/* ponytail: below sm the name wraps — `truncate` is nowrap, which pins the
                              auto-table column to the full title width and pushes Actions off a 375px screen */}
                          <p className="font-medium break-words sm:truncate">
                            {exp.company || <span className="text-muted-foreground font-normal italic">Untitled</span>}
                          </p>
                          {exp.location && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin size={10} />{exp.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {exp.roleEn || exp.roleId || <span className="italic">—</span>}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {exp.periodEn || exp.periodId
                        ? <Badge variant="outline" className="text-xs gap-1"><Calendar size={10} />{exp.periodEn || exp.periodId}</Badge>
                        : <span className="text-muted-foreground italic">—</span>}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center tabular-nums text-muted-foreground">
                      {achCount(exp.achievementsEn) || achCount(exp.achievementsId)}
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDraft({ ...exp })}
                          aria-label={`Edit ${exp.company || "untitled entry"}`}
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(exp)}
                          aria-label={`Delete ${exp.company || "untitled entry"}`}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </AdminPage>

      {/* Edit / Add Modal */}
      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Experience" : "Edit Experience"}</DialogTitle>
            <DialogDescription>Work history entry shown on the public site.</DialogDescription>
          </DialogHeader>

          {draft && (
            <div className="space-y-6 py-2">
              {/* Company + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-company`}>Company / Organization</Label>
                  <Input
                    id={`${uid}-company`}
                    value={draft.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="e.g. GoThru.co"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${uid}-location`} className="flex items-center gap-1.5"><MapPin size={12} />Location</Label>
                  <Input
                    id={`${uid}-location`}
                    value={draft.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="e.g. Remote, Bandung"
                  />
                </div>
              </div>

              {/* Role + Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Role</h3>
                  <Tabs defaultValue="id">
                    <TabsList className="mb-3">
                      <TabsTrigger value="id">ID 🇮🇩</TabsTrigger>
                      <TabsTrigger value="en">EN 🇬🇧</TabsTrigger>
                    </TabsList>
                    <TabsContent value="id">
                      <div className="space-y-2">
                        <Label htmlFor={`${uid}-role-id`} className="text-xs">Role Title (ID)</Label>
                        <Input id={`${uid}-role-id`} value={draft.roleId} onChange={(e) => update("roleId", e.target.value)} placeholder="e.g. Fullstack Engineer" />
                      </div>
                    </TabsContent>
                    <TabsContent value="en">
                      <div className="space-y-2">
                        <Label htmlFor={`${uid}-role-en`} className="text-xs">Role Title (EN)</Label>
                        <Input id={`${uid}-role-en`} value={draft.roleEn} onChange={(e) => update("roleEn", e.target.value)} placeholder="e.g. Fullstack Engineer" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><Calendar size={10} />Period</h3>
                  <Tabs defaultValue="id">
                    <TabsList className="mb-3">
                      <TabsTrigger value="id">ID 🇮🇩</TabsTrigger>
                      <TabsTrigger value="en">EN 🇬🇧</TabsTrigger>
                    </TabsList>
                    <TabsContent value="id">
                      <div className="space-y-2">
                        <Label htmlFor={`${uid}-period-id`} className="text-xs">Period (ID)</Label>
                        <Input id={`${uid}-period-id`} value={draft.periodId} onChange={(e) => update("periodId", e.target.value)} placeholder="e.g. 2022 – Sekarang" />
                      </div>
                    </TabsContent>
                    <TabsContent value="en">
                      <div className="space-y-2">
                        <Label htmlFor={`${uid}-period-en`} className="text-xs">Period (EN)</Label>
                        <Input id={`${uid}-period-en`} value={draft.periodEn} onChange={(e) => update("periodEn", e.target.value)} placeholder="e.g. 2022 – Present" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Achievements</h3>
                <Tabs defaultValue="id">
                  <TabsList className="mb-3">
                    <TabsTrigger value="id">ID 🇮🇩</TabsTrigger>
                    <TabsTrigger value="en">EN 🇬🇧</TabsTrigger>
                  </TabsList>
                  <TabsContent value="id">
                    <DynamicList
                      label="Achievements (Bahasa Indonesia)"
                      values={JSON.parse(draft.achievementsId || "[]")}
                      onChange={(vals) => update("achievementsId", JSON.stringify(vals))}
                      placeholder="Describe a key achievement…"
                    />
                  </TabsContent>
                  <TabsContent value="en">
                    <DynamicList
                      label="Achievements (English)"
                      values={JSON.parse(draft.achievementsEn || "[]")}
                      onChange={(vals) => update("achievementsEn", JSON.stringify(vals))}
                      placeholder="Describe a key achievement…"
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
            <DialogTitle>Delete Experience</DialogTitle>
            <DialogDescription>
              Remove <span className="font-semibold text-foreground">{deleteTarget?.company || "this entry"}</span> from your work history? This cannot be undone.
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
