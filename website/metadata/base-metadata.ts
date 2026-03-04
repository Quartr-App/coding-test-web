import type { Metadata } from "next";
import { env } from "@/website/utils/env";

const title = {
  default: "Quartr",
  template: "%s | Quartr",
};

export const baseMetadata: Metadata = {
  description: "",
  metadataBase: new URL(`${env.nextPublicBaseUrl}`),
  title,
};
