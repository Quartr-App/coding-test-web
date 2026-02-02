'use client';

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

const AntdRegistry = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => (
    <style
      id="antd-cssinjs"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}

export default AntdRegistry;
