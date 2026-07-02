import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Efinas | Admission & Scholarship Office",
};

export default function HomePage() {
  return <PublicPage {...pageContent.home} />;
}
