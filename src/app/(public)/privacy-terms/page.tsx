import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms | Efinas",
};

export default function PrivacyTermsPage() {
  return <PublicPage {...pageContent.privacy} />;
}
