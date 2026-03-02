import { cva, type VariantProps } from "class-variance-authority";
import { hasFlag } from "country-flag-icons";
import { useMemo } from "react";
import { Image, type ImageProps } from "@/components/image";
import { cn } from "@/website/styles/cn";
import { getImageSize } from "@/website/utils/get-image-size";

const countryFlagVariants = cva("ring ring-gray-700", {
  defaultVariants: {
    size: "3x2",
  },
  variants: {
    size: {
      "1x1": "aspect-square",
      "3x2": "aspect-3/2",
    },
  },
});

type CountryFlagProps = VariantProps<typeof countryFlagVariants> &
  Omit<ImageProps, "src" | "alt"> & {
    countryCode: string;
    alt?: string;
  };

export function CountryFlag({ width = 16, countryCode, size = "3x2", className }: CountryFlagProps) {
  const imageSize = useMemo(() => {
    return getImageSize({ aspectRatio: size, width });
  }, [width, size]);

  if (!hasFlag(countryCode)) {
    return undefined;
  }

  return (
    <Image
      alt={`${countryCode} flag`}
      className={cn(countryFlagVariants({ size }), className)}
      src={`https://purecatamphetamine.github.io/country-flag-icons/${size}/${countryCode}.svg`}
      {...imageSize}
    />
  );
}
