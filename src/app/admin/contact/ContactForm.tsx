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
    <div className="px-12 pb-20">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 max-w-4xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-30" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Communication</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1 flex items-center gap-2"><Mail size={14} /> Email Address</Label>
                <Input 
                  value={data.email} 
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1 flex items-center gap-2"><Phone size={14} /> Contact Number</Label>
                <Input 
                  value={data.phone} 
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2b7fff]">Base Location</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1 flex items-center gap-2"><MapPin size={14} /> Location (ID)</Label>
                <Input 
                  value={data.locationId} 
                  onChange={(e) => setData({ ...data, locationId: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#94A3B8] ml-1 flex items-center gap-2"><MapPin size={14} /> Location (EN)</Label>
                <Input 
                  value={data.locationEn} 
                  onChange={(e) => setData({ ...data, locationEn: e.target.value })}
                  className="bg-white/[0.03] border-white/10 h-12 px-4 rounded-xl focus:ring-[#2b7fff]/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full md:w-auto md:px-12 h-12 bg-[#2b7fff] hover:bg-[#2b7fff]/90 text-white font-bold rounded-xl shadow-lg shadow-[#2b7fff]/20 transition-all active:scale-[0.98]"
          >
            {isSaving ? "Updating..." : "Commit Contact Info"}
          </Button>
        </div>
      </div>
    </div>
  );
}
