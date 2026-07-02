import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & FAQs | Efinas",
};

export default function HelpFaqsPage() {
  return <PublicPage {...pageContent.help} />;
}
