"use client";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="absolute flex items-center justify-center inset-s-1/2 inset-bs-1/2 -translate-x-1/2 -translate-y-1/2 gap-2">
      <Heading>Something went wrong</Heading>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
