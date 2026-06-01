"use client";

interface AdminHeaderProps {
  title: string;
  description: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-xl px-12 py-10 mb-8 border-b border-white/[0.03]">
      <div className="max-w-5xl text-left">
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight mb-2">{title}</h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
