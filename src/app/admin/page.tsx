export const metadata = { title: "Dashboard" };

import { requireUser } from "@/lib/auth/get-user";
import { db } from "@/lib/db";
import { hero, about, experiences, projects, contact, siteSettings } from "@/lib/db/schema";
import { readdir } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import {
  Briefcase, Code, FileImage, Sparkles,
  CheckCircle2, Circle, ChevronRight,
} from "lucide-react";

async function getMediaCount() {
  try {
    const files = await readdir(join(process.cwd(), "public", "uploads"));
    return files.filter((f) => /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(f)).length;
  } catch {
    return 0;
  }
}

// ponytail: skills is a JSON string column; a bad row means "no skills", not a 500.
function countSkills(raw: string | undefined) {
  if (!raw) return 0;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export default async function AdminDashboard() {
  await requireUser();

  const [heroData, aboutData, expData, projData, contactData, settings, mediaCount] =
    await Promise.all([
      db.select().from(hero).limit(1),
      db.select().from(about).limit(1),
      db.select().from(experiences),
      db.select().from(projects),
      db.select().from(contact).limit(1),
      db.select().from(siteSettings),
      getMediaCount(),
    ]);

  const faviconUrl = settings.find((s) => s.key === "favicon_url")?.value?.trim();
  const skillCount = countSkills(aboutData[0]?.skills);

  const stats = [
    { label: "Projects", value: projData.length, icon: Code, href: "/admin/projects", empty: "Add your first project" },
    { label: "Experience entries", value: expData.length, icon: Briefcase, href: "/admin/experience", empty: "Add your first role" },
    { label: "Skills listed", value: skillCount, icon: Sparkles, href: "/admin/about", empty: "Add skills in About" },
    { label: "Media files", value: mediaCount, icon: FileImage, href: "/admin/media", empty: "Upload an image" },
  ];

  const checklist = [
    { label: "Hero section", hint: "Name, title and intro", done: heroData.length > 0, href: "/admin/hero" },
    { label: "About", hint: "Biography and skills", done: aboutData.length > 0, href: "/admin/about" },
    { label: "Experience", hint: "At least one role", done: expData.length > 0, href: "/admin/experience" },
    { label: "Projects", hint: "At least one project", done: projData.length > 0, href: "/admin/projects" },
    { label: "Contact details", hint: "Email, phone and location", done: contactData.length > 0, href: "/admin/contact" },
    { label: "Favicon", hint: "Browser tab icon", done: Boolean(faviconUrl), href: "/admin/settings" },
  ];

  const doneCount = checklist.filter((i) => i.done).length;
  const allDone = doneCount === checklist.length;

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Identity lives in the sidebar footer, which is visible on this same screen —
          a "Signed in as …" line here was the same fact twice. */}
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          What is on your site right now, and what is still missing.
        </p>
      </header>

      <section aria-labelledby="content-heading" className="space-y-3">
        <h2 id="content-heading" className="sr-only">Content totals</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.href}
              href={stat.href}
              className={`group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors duration-200 cursor-pointer hover:border-primary/50 hover:bg-muted/40 ${focusRing}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <stat.icon
                  className="size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1">
                <p
                  className={`text-3xl font-semibold tabular-nums leading-none ${
                    stat.value === 0 ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </p>
                {/* Only the empty case says anything. "Manage" on a populated tile was
                    filler restating what a card that is entirely a link already says.
                    min-h keeps the four tiles aligned when some have the line and some don't. */}
                <p className="min-h-4 text-xs text-muted-foreground">
                  {stat.value === 0 ? stat.empty : null}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="setup-heading" className="rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-5">
          <div className="space-y-1">
            <h2 id="setup-heading" className="text-sm font-semibold text-foreground">
              Site readiness
            </h2>
            <p className="text-xs text-muted-foreground">
              {allDone
                ? "Every section is filled in."
                : "Finish these to make the public site complete."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {doneCount} of {checklist.length} done
            </span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted" aria-hidden="true">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(doneCount / checklist.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <ul className="divide-y divide-border">
          {checklist.map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className={`group flex min-h-10 items-center gap-4 p-4 transition-colors duration-200 cursor-pointer hover:bg-muted/40 ${focusRing}`}
              >
                {item.done ? (
                  <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.hint}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {item.done ? "Done" : "Set up"}
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
