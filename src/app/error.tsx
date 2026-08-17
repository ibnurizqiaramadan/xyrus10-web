"use client";

import { Button } from "@/components/ui/button";

// ponytail: English-only copy; wire useLanguage in if the error page ever needs to be bilingual.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred while rendering this page. Try again, or come back in a moment.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
