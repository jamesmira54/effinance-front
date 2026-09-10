import Image from "next/image";
import Link from "next/link";

const banners = {
  home: {
    src: "/images/landing/home.png",
    alt: "Scholarship opportunities. Investing in knowledge, building a brighter future. Students and a graduation cap.",
  },
  grants: {
    src: "/images/landing/grants.png",
    alt: "Grab the opportunity to be a Scholar! Apply now. Graduates celebrating.",
  },
  forms: {
    src: "/images/landing/forms.png",
    alt: "Scholarship Program. A Golden Opportunity for a Bright Future. Apply now. A student holding books.",
  },
  announcements: {
    src: "/images/landing/announcements.png",
    alt: "Unlocking Futures: Apply the Scholarship Program Available! This program is dedicated to supporting talented students in achieving their educational goals.",
  },
};

export type PublicBannerProps = {
  image: keyof typeof banners;
  href?: string;
};

export default function PublicBanner({ image, href }: PublicBannerProps) {
  const banner = banners[image];
  // Keep the complete artwork visible so its embedded text is never cropped.
  const artwork = (
    <div className="relative aspect-[2658/984] w-full bg-primary">
      <Image
        src={banner.src}
        alt={banner.alt}
        fill
        priority
        sizes="100vw"
        className="object-contain"
      />
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary"
    >
      {artwork}
    </Link>
  ) : (
    artwork
  );
}
