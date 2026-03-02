import NextLink, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export function Link(props: LinkProps & ComponentPropsWithoutRef<"a">) {
  return <NextLink {...props} />;
}
