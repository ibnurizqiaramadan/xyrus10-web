import type { ReactNode } from "react";

// One layout contract for every admin content page. Before this, each form carried its
// own wrapper and they had all drifted: px-8 with no responsive step (64px of padding on a
// 375px screen), no top padding at all so content sat flush against the header, bottom
// clearance of pb-24 on some pages and pb-8 on others, max-w-3xl / max-w-2xl / none, and
// not one of the seven pages had an h1. Centralising it means the next page cannot drift.
//
// Server-safe (no "use client"), but the forms that render it are client components, which
// is why `footer` is a slot rather than something this file builds — the save bar needs the
// form's saving/saved state.

type Width = "form" | "wide";

// form: a comfortable measure for labelled inputs. wide: tables, media grids, sortable lists.
const widths: Record<Width, string> = {
  form: "max-w-3xl",
  wide: "max-w-6xl",
};

export function AdminPage({
  title,
  description,
  width = "form",
  actions,
  footer,
  children,
}: {
  title: string;
  description?: string;
  width?: Width;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    // min-h-full + flex-1 pins the footer to the bottom of the viewport on short pages.
    // Without it a sticky bar sits directly under the content and floats mid-screen with
    // dead background beneath it — measured 123px of empty space below it on /admin/contact.
    <div className="flex min-h-full flex-col">
      {/* p-4 md:p-6 matches the dashboard exactly. No lg: step — an extra breakpoint here
          shifted every content page 8px right of the dashboard when navigating between them.
          No bottom clearance for the footer either: position:sticky occupies flow space, so
          it can never permanently cover the last row. */}
      <div className="flex-1 p-4 md:p-6">
        <div className={`${widths[width]} space-y-6`}>
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
              {description ? (
                <p className="text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
          </header>

          {children}
        </div>
      </div>

      {footer ? (
        <div className="sticky bottom-0 z-10 border-t border-border bg-background/90 backdrop-blur-sm">
          <div className={`${widths[width]} flex flex-wrap items-center justify-between gap-3 p-4 md:px-6`}>
            {footer}
          </div>
        </div>
      ) : null}
    </div>
  );
}
