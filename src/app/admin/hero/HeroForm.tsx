"use client";

import { useState } from "react";
import { QuillEditor } from "@/components/admin/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AdminPage } from "@/components/admin/AdminPage";
import { updateHero } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Hero, HeroInsert } from "@/lib/types";
import { Save, Check, Loader2 } from "lucide-react";

export function HeroForm({ initialData }: { initialData: Hero | null }) {
  const [data, setData] = useState<HeroInsert>({
    name: initialData?.name ?? "",
    titleId: initialData?.titleId ?? "",
    titleEn: initialData?.titleEn ?? "",
    descriptionId: initialData?.descriptionId ?? "",
    descriptionEn: initialData?.descriptionEn ?? "",
    imageUrl: initialData?.imageUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await updateHero(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    router.refresh();
  };

  // Quill stores "<p><br></p>" for an untouched editor, so strip markup before testing.
  const blank = (v?: string | null) => !v?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  const isEmpty = (lang: "id" | "en") =>
    lang === "id"
      ? blank(data.titleId) && blank(data.descriptionId)
      : blank(data.titleEn) && blank(data.descriptionEn);

  // One tab set for the whole localised block instead of one per card: everything inside a
  // tab is that language, so the two versions can't be confused for two different fields.
  const localised = (lang: "id" | "en") => {
    const titleKey = lang === "id" ? "titleId" : "titleEn";
    const descriptionKey = lang === "id" ? "descriptionId" : "descriptionEn";
    const langLabel = lang === "id" ? "Bahasa Indonesia" : "English";

    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`hero-title-${lang}`}>Professional title ({langLabel})</Label>
          <Input
            id={`hero-title-${lang}`}
            value={data[titleKey]}
            onChange={(e) => setData({ ...data, [titleKey]: e.target.value })}
            placeholder="e.g. Fullstack Engineer"
          />
        </div>
        <QuillEditor
          id={`hero-description-${lang}`}
          label={`Intro paragraph (${langLabel})`}
          value={data[descriptionKey]}
          onChange={(val) => setData({ ...data, [descriptionKey]: val })}
        />
      </div>
    );
  };

  return (
    <AdminPage
      title="Hero"
      description="Name, avatar, job title and intro paragraph at the top of the public homepage."
      footer={
        <>
          {/* Always mounted so the footer never reflows; empty unless a save just landed. */}
          <p role="status" className="text-xs text-muted-foreground">{saved ? "Changes saved." : ""}</p>
          <Button onClick={handleSave} disabled={saving} className="gap-2 min-w-32">
            {saved ? <><Check size={14} />Saved</> : saving ? <><Loader2 size={14} className="animate-spin" />Saving…</> : <><Save size={14} />Save Changes</>}
          </Button>
        </>
      }
    >
      {/* Identity — the same in both languages, which is why it has no language tabs */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Identity</h2>
          <p className="text-xs text-muted-foreground">Headline name and avatar. Shown in both languages.</p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-name">Full Name</Label>
            <Input
              id="hero-name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-image-url">Avatar Image URL</Label>
            <Input
              id="hero-image-url"
              value={data.imageUrl ?? ""}
              onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
              placeholder="/uploads/avatar.jpg"
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Localised copy */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Title &amp; Intro</h2>
          <p className="text-xs text-muted-foreground">One tab per language — visitors see the one they picked.</p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5">
          <Tabs defaultValue="id">
            {/* Radix unmounts the inactive panel, so a language with nothing in it is invisible
                until you click it — the "Empty" word (not a colour) says so on the trigger. */}
            <TabsList className="mb-4">
              {(["id", "en"] as const).map((lang) => (
                <TabsTrigger key={lang} value={lang} className="gap-1.5">
                  {lang === "id" ? "ID 🇮🇩" : "EN 🇬🇧"}
                  {isEmpty(lang) && (
                    <span
                      title={`No ${lang === "id" ? "Indonesian" : "English"} content yet`}
                      className="rounded border border-border px-1 text-[10px] font-normal uppercase tracking-wide text-muted-foreground"
                    >
                      Empty
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="id">{localised("id")}</TabsContent>
            <TabsContent value="en">{localised("en")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AdminPage>
  );
}
