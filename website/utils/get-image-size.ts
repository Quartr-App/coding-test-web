export function getImageSize({
  width,
  height,
  aspectRatio = "1x1",
}: {
  width: number | `${number}`;
  height?: number | `${number}`;
  aspectRatio?: "1x1" | "3x2" | "16x9" | null;
}): {
  height: number | `${number}`;
  width: number | `${number}`;
} {
  if (typeof height !== "undefined") {
    return { height, width };
  }

  switch (aspectRatio) {
    case "3x2":
      return { height: Math.round(Number(width) / 3) * 2, width };
    case "16x9":
      return { height: Math.round(Number(width) / 16) * 9, width };
    default:
      return { height: width, width };
  }
}
