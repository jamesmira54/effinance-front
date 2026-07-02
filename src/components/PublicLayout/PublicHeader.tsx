"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Available Grants", href: "/available-grants" },
  { label: "Document Forms", href: "/document-forms" },
  { label: "Announcements", href: "/public-announcements" },
  { label: "Help & FAQs", href: "/help-faqs" },
];

const PublicHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-99 border-b border-stroke bg-white/95 shadow-2 backdrop-blur dark:border-strokedark dark:bg-boxdark/95">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 md:px-6 2xl:px-10">
        <Link href="/" className="flex flex-shrink-0 items-center">
          <Image
            className="hidden dark:block"
            src="/images/logo/logo.svg"
            alt="Efinas"
            width={150}
            height={32}
            priority
          />
          <Image
            className="dark:hidden"
            src="/images/logo/logo-dark.svg"
            alt="Efinas"
            width={150}
            height={32}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-2 text-sm font-medium transition hover:bg-gray hover:text-primary dark:hover:bg-meta-4 ${
                  isActive
                    ? "bg-gray text-primary dark:bg-meta-4 dark:text-white"
                    : "text-body dark:text-bodydark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-opacity-90"
          >
            Portal Login
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-stroke bg-white text-black shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark lg:hidden">
          <nav className="mx-auto flex max-w-screen-2xl flex-col gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-sm px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-gray text-primary dark:bg-meta-4 dark:text-white"
                      : "text-body dark:text-bodydark"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-sm bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Portal Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
