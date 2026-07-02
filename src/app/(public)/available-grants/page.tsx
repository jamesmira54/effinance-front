import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Grants | Efinas",
};

export default function AvailableGrantsPage() {
  return <PublicPage {...pageContent.grants} />;
}
