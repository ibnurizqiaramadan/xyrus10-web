"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function QuillEditor({ value, onChange, label }: QuillEditorProps) {
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

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-[#F8FAFC]">{label}</label>}
      <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          className="text-[#F8FAFC]"
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
          stroke: #94A3B8 !important;
        }
        .ql-fill {
          fill: #94A3B8 !important;
        }
        .ql-picker {
          color: #94A3B8 !important;
        }
        .ql-editor {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
