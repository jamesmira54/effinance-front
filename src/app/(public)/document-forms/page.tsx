import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Forms | Efinas",
};

export default function DocumentFormsPage() {
  return <PublicPage {...pageContent.forms} />;
}
