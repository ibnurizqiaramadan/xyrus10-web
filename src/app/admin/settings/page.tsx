import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { getSettingByKey } from "@/lib/actions/content";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  const faviconUrl = await getSettingByKey("favicon_url");
  const siteTitle = await getSettingByKey("site_title");
  const siteDescription = await getSettingByKey("site_description");

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-12 pt-10 pb-4">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-[#F8FAFC] tracking-tight">Site Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Favicon, metadata, and global configuration</p>
        </div>
      </div>
      <SettingsForm
        initialFaviconUrl={faviconUrl}
        initialSiteTitle={siteTitle}
        initialSiteDescription={siteDescription}
      />
    </div>
  );
}
