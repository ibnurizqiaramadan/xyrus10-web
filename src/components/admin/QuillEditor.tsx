"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

export function QuillEditor({ value, onChange, label, id }: QuillEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const handleChange = (content: string) => {
    if (content !== value) {
      onChange(content);
    }
  };

  // Quill renders its own contenteditable (.ql-editor) that we never author, so the only way
  // to name it is to reach in after mount. Naming just the wrapper left the actual editing
  // surface exposed as role "generic" with an empty accessible name.
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!id || !label) return;
    containerRef.current?.querySelector(".ql-editor")?.setAttribute("aria-labelledby", `${id}-label`);
  }, [id, label]);

  return (
    <div className="space-y-2">
      {label && (
        // No htmlFor: it would point at a <div>, which is not a labelable control, so the
        // attribute is inert and clicking the label focuses nothing. aria-labelledby below
        // is what actually names the editor.
        <span id={id ? `${id}-label` : undefined} className="block text-sm font-medium text-foreground">
          {label}
        </span>
      )}
      <div
        ref={containerRef}
        id={id}
        role={id && label ? "group" : undefined}
        aria-labelledby={id && label ? `${id}-label` : undefined}
        className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          className="text-foreground"
        />
      </div>
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(255, 255, 255, 0.05);
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 200px;
        }
        .ql-stroke {
          stroke: var(--color-muted-foreground) !important;
        }
        .ql-fill {
          fill: var(--color-muted-foreground) !important;
        }
        .ql-picker {
          color: var(--color-muted-foreground) !important;
        }
        .ql-editor {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
