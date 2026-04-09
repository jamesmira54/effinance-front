"use client";

import { useRouter } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function LoaderLink({ href, children, className }: Props) {
  const router = useRouter();
  const { showLoader } = useLoader();

  const handleClick = () => {
    showLoader();
    router.push(href);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}