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
import { updateAbout } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { About, AboutInsert } from "@/lib/types";
import { DynamicList } from "@/components/admin/DynamicList";
import { Save, Check, Loader2 } from "lucide-react";

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
    skills: initialData?.skills ?? "[]",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await updateAbout(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    router.refresh();
  };

  const skillsList = JSON.parse(data.skills || "[]") as string[];

  // Quill stores "<p><br></p>" for an untouched editor, so strip markup before testing.
  const blank = (v?: string | null) => !v?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  const isEmpty = (lang: "id" | "en") =>
    lang === "id"
      ? blank(data.titleId) && blank(data.bio1Id) && blank(data.bio2Id) && blank(data.bio3Id)
      : blank(data.titleEn) && blank(data.bio1En) && blank(data.bio2En) && blank(data.bio3En);

  // Was four cards, each with its own ID/EN tabs defaulting to ID — you could not tell which
  // language you were reading without checking every card. Now one tab set covers the whole
  // block: everything inside a tab is that language.
  const localised = (lang: "id" | "en") => {
    const langLabel = lang === "id" ? "Bahasa Indonesia" : "English";
    const titleKey = lang === "id" ? "titleId" : "titleEn";
    const bios =
      lang === "id"
        ? ([
            { key: "bio1Id", id: "about-bio1-id", label: `Paragraph 1 — shown as the large heading (${langLabel})` },
            { key: "bio2Id", id: "about-bio2-id", label: `Paragraph 2 (${langLabel})` },
            { key: "bio3Id", id: "about-bio3-id", label: `Paragraph 3 (${langLabel})` },
          ] as const)
        : ([
            { key: "bio1En", id: "about-bio1-en", label: `Paragraph 1 — shown as the large heading (${langLabel})` },
            { key: "bio2En", id: "about-bio2-en", label: `Paragraph 2 (${langLabel})` },
            { key: "bio3En", id: "about-bio3-en", label: `Paragraph 3 (${langLabel})` },
          ] as const);

    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`about-title-${lang}`}>Section heading ({langLabel})</Label>
          <Input
            id={`about-title-${lang}`}
            value={data[titleKey]}
            onChange={(e) => setData({ ...data, [titleKey]: e.target.value })}
            placeholder={lang === "id" ? "e.g. Tentang Saya" : "e.g. About Me"}
          />
        </div>
        {bios.map(({ key, id, label }) => (
          <QuillEditor
            key={key}
            id={id}
            label={label}
            value={data[key]}
            onChange={(val) => setData({ ...data, [key]: val })}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminPage
      title="About"
      description="Section heading, bio paragraphs and skill tags for the About section of the public site."
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
      {/* Localised copy */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Heading &amp; Bio</h2>
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

      {/* Skills — the same in both languages, which is why it has no language tabs */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Skills &amp; Expertise</h2>
          <p className="text-xs text-muted-foreground">Tags listed in the Expertise panel. Shown in both languages.</p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5">
          <DynamicList
            label="Technology tags"
            values={skillsList}
            onChange={(v) => setData({ ...data, skills: JSON.stringify(v) })}
            placeholder="e.g. Next.js, Go, Docker…"
            asBadges
          />
        </CardContent>
      </Card>
    </AdminPage>
  );
}
