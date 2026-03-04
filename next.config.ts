import type { NextConfig } from "next";

import { validateEnv } from "./website/utils/env";

validateEnv();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://files.quartr.com/**")],
  },
};

export default nextConfig;
