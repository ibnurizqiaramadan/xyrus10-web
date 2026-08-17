"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DynamicListProps {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
  asBadges?: boolean;
}

export function DynamicList({ label, values, onChange, placeholder, asBadges }: DynamicListProps) {
  const [inputValue, setInputValue] = useState("");
  // ponytail: internal useId beats an id prop — no caller has to pass anything, still unique document-wide
  const inputId = useId();

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onChange([...values, inputValue.trim()]);
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, newValue: string) => {
    const updated = [...values];
    updated[index] = newValue;
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); handleAdd(); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputId} className="text-sm font-medium">{label}</Label>
        <span className="text-xs text-muted-foreground">{values.length} items</span>
      </div>

      {asBadges ? (
        <div className="flex flex-wrap gap-2 min-h-8">
          {values.map((item, index) => (
            <Badge key={index} variant="secondary" className="gap-1 pr-1">
              {item}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                aria-label={`Remove ${item}`}
                className="ml-0.5 rounded-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <X size={11} />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {values.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => handleUpdate(index, e.target.value)}
                aria-label={`${label} item ${index + 1}`}
                className="text-sm h-9"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                aria-label={`Remove ${label} item ${index + 1}`}
                className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          id={inputId}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Add item…"}
          className="text-sm h-9"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="h-9 px-3 flex-shrink-0 gap-1"
        >
          <Plus size={14} />
          Add
        </Button>
      </div>
    </div>
  );
}
