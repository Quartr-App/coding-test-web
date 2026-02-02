import { ReactNode } from "react";
import { Inter } from "@next/font/google";
import AntdRegistry from "./AntdRegistry";
import { ReactQueryProvider } from "./ReactQueryProvider";
import "antd/dist/antd.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <AntdRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
