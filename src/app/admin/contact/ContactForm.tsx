"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContact } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

interface Contact {
  id?: number;
  email: string;
  phone: string;
  locationId: string;
  locationEn: string;
}

export function ContactForm({ initialData }: { initialData: Contact | null }) {
  const [data, setData] = useState<Contact>(initialData || {
    email: "",
    phone: "",
    locationId: "",
    locationEn: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    await updateContact(data);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6 max-w-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Mail size={14} /> Email Address</Label>
            <Input 
              value={data.email} 
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Phone size={14} /> Phone Number</Label>
            <Input 
              value={data.phone} 
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><MapPin size={14} /> Location (ID)</Label>
            <Input 
              value={data.locationId} 
              onChange={(e) => setData({ ...data, locationId: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><MapPin size={14} /> Location (EN)</Label>
            <Input 
              value={data.locationEn} 
              onChange={(e) => setData({ ...data, locationEn: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full bg-[#2b7fff] hover:bg-[#2b7fff]/90"
        >
          {isSaving ? "Saving..." : "Save Contact Info"}
        </Button>
      </div>
    </div>
  );
}
