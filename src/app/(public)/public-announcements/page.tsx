import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Efinas",
};

export default function PublicAnnouncementsPage() {
  return <PublicPage {...pageContent.announcements} />;
}
