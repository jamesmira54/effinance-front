import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Support | Efinas",
};

export default function ContactSupportPage() {
  return <PublicPage {...pageContent.contact} />;
}
