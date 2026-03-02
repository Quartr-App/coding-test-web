import type { ReactNode } from "react";

export function TouchTarget({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-bs-1/2 inset-s-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
      />
      {children}
    </>
  );
}
