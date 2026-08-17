import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getUser } from "@/lib/auth/get-user";
import { getSettingByKey } from "@/lib/data";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/admin");

  // The real site title, so the page says whose console this is instead of a stock
  // glyph. Site titles are usually "Name - long tagline"; only the name fits a subtitle.
  const siteTitle = await getSettingByKey("site_title");
  const owner = siteTitle?.split(/\s[-–|]\s/)[0].trim();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            {owner ? `Content console for ${owner}` : "Content console"}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <LoginForm />
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="-mx-2 inline-flex h-10 cursor-pointer items-center gap-2 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
