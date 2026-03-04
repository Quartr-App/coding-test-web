"use client";

import { Suspense, useSyncExternalStore } from "react";

export function IsomorphicDate({ date }: { date: string }) {
  const isServer = useSyncExternalStore(
    () => () => {},
    () => false,
    () => true,
  );

  return (
    <Suspense key={isServer ? "server" : "client"}>
      <time dateTime={new Date(date).toISOString()}>
        {new Date(date).toLocaleString(undefined, { timeZone: isServer ? "UTC" : undefined })} {isServer && "(UTC)"}
      </time>
    </Suspense>
  );
}
