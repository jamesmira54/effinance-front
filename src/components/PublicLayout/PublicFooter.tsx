import Image from "next/image";
import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact & Support", href: "/contact-support" },
  { label: "Privacy & Terms", href: "/privacy-terms" },
];

const PublicFooter = () => {
  return (
    <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-6 2xl:px-10">
        <div>
          <div>
            <Image
              className="hidden dark:block"
              src="/images/logo/logo.svg"
              alt="Efinas"
              width={150}
              height={32}
            />
            <Image
              className="dark:hidden"
              src="/images/logo/logo-dark.svg"
              alt="Efinas"
              width={150}
              height={32}
            />
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-body dark:text-bodydark">
            Admission and Scholarship Office support for grants, applications,
            renewals, documents, and scholar portal access.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black dark:text-white">
            Footer Menu
          </h2>
          <nav className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-body transition hover:text-primary dark:text-bodydark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black dark:text-white">
            Contact Desk
          </h2>
          <div className="mt-4 space-y-3 text-sm text-body dark:text-bodydark">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-primary" />
              Campus Administration Building
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="text-primary" />
              (02) 8123-4567 local 215
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-primary" />
              scholarships@efinas.edu
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-stroke px-4 py-4 text-center text-xs text-body dark:border-strokedark dark:text-bodydark">
        Efinas Admission & Scholarship Office. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
