"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AdminPage } from "@/components/admin/AdminPage";
import { updateContact } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Save, Check, Loader2 } from "lucide-react";

interface Contact {
  id?: number;
  email: string;
  phone: string;
  locationId: string;
  locationEn: string;
}

export function ContactForm({ initialData }: { initialData: Contact | null }) {
  const [data, setData] = useState<Contact>(
    initialData || { email: "", phone: "", locationId: "", locationEn: "" }
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await updateContact(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    router.refresh();
  };

  return (
    <AdminPage
      title="Contact"
      description="Email, phone and location shown in the contact section of the public site."
      footer={
        <>
          <p className="text-xs text-muted-foreground">{saved ? "Changes saved." : "Unsaved changes will be lost."}</p>
          <Button onClick={handleSave} disabled={saving} className="gap-2 min-w-32">
            {saved ? <><Check size={14} />Saved</> : saving ? <><Loader2 size={14} className="animate-spin" />Saving…</> : <><Save size={14} />Save Changes</>}
          </Button>
        </>
      }
    >
      {/* Communication */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Communication</h2>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="flex items-center gap-2">
              <Mail size={13} className="text-muted-foreground" />
              Email Address
            </Label>
            <Input
              type="email"
              id="contact-email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="flex items-center gap-2">
              <Phone size={13} className="text-muted-foreground" />
              Phone Number
            </Label>
            <Input
              id="contact-phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+62 812 3456 7890"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-sm font-semibold uppercase leading-none tracking-widest text-muted-foreground">Location</h2>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-location-id" className="flex items-center gap-2">
              <MapPin size={13} className="text-muted-foreground" />
              Location (Bahasa Indonesia)
            </Label>
            <Input
              id="contact-location-id"
              value={data.locationId}
              onChange={(e) => setData({ ...data, locationId: e.target.value })}
              placeholder="Bandung, Jawa Barat"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-location-en" className="flex items-center gap-2">
              <MapPin size={13} className="text-muted-foreground" />
              Location (English)
            </Label>
            <Input
              id="contact-location-en"
              value={data.locationEn}
              onChange={(e) => setData({ ...data, locationEn: e.target.value })}
              placeholder="Bandung, West Java"
            />
          </div>
        </CardContent>
      </Card>
    </AdminPage>
  );
}
