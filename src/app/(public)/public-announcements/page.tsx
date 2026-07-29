import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { PublicAnnouncementsAPIService } from "@/api";
import { FlattenedAnnouncementData } from "@/types/annoucements.types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Efinas",
};

export default async function PublicAnnouncementsPage() {
  const publicAnnouncementsAPI = new PublicAnnouncementsAPIService();
  let announcements: FlattenedAnnouncementData[] = [];

  try {
    const response = await publicAnnouncementsAPI.getAnnouncements();
    announcements = Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error("Unable to load public announcements", error);
  }

  const recentAnnouncements = announcements.slice(0, 15);
  const panels = recentAnnouncements.length > 0
    ? recentAnnouncements.map((announcement) => {
        const locations = announcement.locations?.map((location) => location.name).filter(Boolean) || [];
        const attachments = announcement.files?.map((file) => file.fileName).filter(Boolean) || [];
        const details = [announcement.caption, announcement.content].filter(Boolean).join("\n\n");

        return {
          title: announcement.title,
          description: `${details || "No additional announcement details."}`,
          meta: locations.length > 0 ? locations.join(", ") : "All locations",
        };
      })
    : [{
        title: "No announcements available",
        description: "There are no recently posted public announcements at this time. Please check again later.",
        meta: "No published posts",
      }];

  return <PublicPage {...pageContent.announcements} panels={panels} />;
}
