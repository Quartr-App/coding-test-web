import { cva, type VariantProps } from "class-variance-authority";
import NextImage from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/website/styles/cn";

const imageVariants = cva(["text-transparent"], {
  defaultVariants: {},
  variants: {
    fill: {
      true: "absolute h-full w-full inset-x-0 inset-y-0",
    },
    objectFit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
    objectPosition: {
      bottom: "object-bottom",
      center: "object-center",
      left: "object-left",
      "left-bottom": "object-bottom-left",
      "left-top": "object-top-left",
      right: "object-right",
      "right-bottom": "object-bottom-right",
      "right-top": "object-top-right",
      top: "object-top",
    },
    rounded: {
      true: "rounded-full",
    },
  },
});

export type ImageProps = VariantProps<typeof imageVariants> &
  Omit<ComponentPropsWithoutRef<typeof NextImage>, "objectFit" | "objectPosition" | "style">;

export function Image({
  className,
  fill,
  objectFit = fill ? "fill" : undefined,
  objectPosition = fill ? "center" : undefined,
  rounded,
  ...props
}: ImageProps) {
  return (
    <NextImage
      className={cn(imageVariants({ fill, objectFit, objectPosition, rounded }), className)}
      style={{ color: "" }}
      {...props}
    />
  );
}
