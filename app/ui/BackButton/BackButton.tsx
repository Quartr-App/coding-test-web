"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCompanyDetailRoute } from "@/app/lib/helpers";

export function BackButton() {
  const pathname = usePathname();

  if (!isCompanyDetailRoute(pathname)) {
    return null;
  }

  return (
    <Link href="/companies" className="back-button">
      ← Back to Companies
    </Link>
  );
}
