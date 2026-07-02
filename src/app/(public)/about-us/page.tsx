import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Efinas",
};

export default function AboutUsPage() {
  return <PublicPage {...pageContent.about} />;
}
