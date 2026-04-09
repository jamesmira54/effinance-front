"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";

export default function LoaderAutoHide() {
  const pathname = usePathname();
  const { hideLoader } = useLoader();

  useEffect(() => {
    setTimeout(() => {
        hideLoader();
    }, 1000);
  }, [pathname]);

  return null;
}