"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DynamicListProps {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}

export function DynamicList({ label, values, onChange, placeholder }: DynamicListProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onChange([...values, inputValue.trim()]);
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleUpdate = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-bold uppercase tracking-widest text-[#2b7fff] opacity-80 ml-1">
          {label}
        </Label>
        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
          {values.length} Items total
        </span>
      </div>

      <div className="space-y-2">
        {values.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group animate-in fade-in slide-in-from-left-2 duration-200">
            <div className="flex-shrink-0 text-slate-600">
              <GripVertical size={14} />
            </div>
            <Input
              value={item}
              onChange={(e) => handleUpdate(index, e.target.value)}
              className="bg-white/[0.02] border-white/5 h-10 px-4 rounded-lg text-sm focus:ring-[#2b7fff]/10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              className="flex-shrink-0 h-10 w-10 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Add new item..."}
          className="bg-white/[0.04] border-white/10 h-11 px-4 rounded-xl focus:ring-[#2b7fff]/20"
        />
        <Button
          type="button"
          onClick={handleAdd}
          className="h-11 px-6 bg-[#2b7fff]/10 hover:bg-[#2b7fff]/20 text-[#2b7fff] font-bold rounded-xl border border-[#2b7fff]/20 transition-all active:scale-95"
        >
          <Plus size={18} />
        </Button>
      </div>
    </div>
  );
}
