import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

export const inter: NextFontWithVariable = Inter({
  display: "swap",
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-sans",
});
