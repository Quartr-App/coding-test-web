import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LinkProps = NextLinkProps & ComponentPropsWithoutRef<"a">;

export function Link(props: LinkProps) {
  return <NextLink {...props} />;
}
