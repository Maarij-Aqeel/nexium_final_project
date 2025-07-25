// hooks/useInterceptRouteChange.ts
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// The Code to prevent Route changes like push,back, reload etc
export const useInterceptRouteChange = (shouldConfirm: boolean) => {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName !== "A") return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      // Cinfirmation during route change
      if (shouldConfirm) {
        e.preventDefault();
        const confirmed = window.confirm(
          "You haven’t finished the interview. Leave anyway?"
        );
        if (confirmed) {
          isNavigatingRef.current = true;
          router.push(href);
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldConfirm) return;
      e.preventDefault();
      e.returnValue = "";
    };

    // Push current state to history stack when component mounts with shouldConfirm=true
    if (shouldConfirm) {
      history.pushState(null, "", window.location.href);
    }

    const handlePopState = (e: PopStateEvent) => {
      if (shouldConfirm && !isNavigatingRef.current) {
        // Push the current page back to prevent navigation
        history.pushState(null, "", window.location.href);

        const confirmed = window.confirm(
          "You haven’t finished the interview. Leave anyway?"
        );

        if (confirmed) {
          isNavigatingRef.current = true;
          // Actually navigate back
          history.back();
        }
      }
    };

    document.body.addEventListener("click", handleLinkClick);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.body.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      isNavigatingRef.current = false;
    };
  }, [shouldConfirm, router]);
};
