"use client";

import { ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
