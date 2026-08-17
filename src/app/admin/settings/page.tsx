export const metadata = { title: "Settings" };

import { requireUser } from "@/lib/auth/get-user";
import { getSettingByKey } from "@/lib/data";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  await requireUser();

  const [faviconUrl, siteTitle, siteDescription] = await Promise.all([
    getSettingByKey("favicon_url"),
    getSettingByKey("site_title"),
    getSettingByKey("site_description"),
  ]);

  return (
    <SettingsForm
      initialFaviconUrl={faviconUrl}
      initialSiteTitle={siteTitle}
      initialSiteDescription={siteDescription}
    />
  );
}
