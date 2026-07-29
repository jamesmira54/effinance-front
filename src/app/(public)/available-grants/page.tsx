import PublicPage, { pageContent } from "@/screens/public/PublicPage";
import { Metadata } from "next";
import { PublicSponsorshipAPIService } from "@/api";
import { PublicSponsorshipResponse } from "@/types/sponsorship.types";

export const metadata: Metadata = {
  title: "Available Grants | Efinas",
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-PH", { year: "numeric", month: "short", day: "numeric" }).format(date);
};

export default async function AvailableGrantsPage() {
  const publicSponsorshipAPI = new PublicSponsorshipAPIService();

  let sponsorships;

  try {
    sponsorships = await publicSponsorshipAPI.getSponsorships();

    if (!Array.isArray(sponsorships?.data) || sponsorships.data.length === 0) {
      throw new Error("Sponsorship response is empty");
    }
  } catch (error) {
    console.error("Failed to fetch sponsorships:", error);
    sponsorships = { data: [] };
  }

  const activeSponsorships = Array.isArray(sponsorships?.data)
    ? sponsorships.data.slice(0, 15)
    : [];

  console.log("Active Sponsorships:", activeSponsorships);

  const panels = activeSponsorships.length > 0
    ? activeSponsorships.map((sponsorship) => {
        const schools = sponsorship.sponsorshipSchool?.map((school) => school.schoolName).filter(Boolean) || [];
        const schoolText = schools.length > 0
          ? `Participating school${schools.length > 1 ? "s" : ""}: ${schools.join(", ")}.`
          : "Please contact the scholarship office for participating-school information.";

        return {
          title: sponsorship.name,
          description: `${sponsorship.sponsorName} • Academic Year ${sponsorship.academicYearStart}–${sponsorship.academicYearEnd}\n${schoolText}\n${sponsorship.slot} slot${sponsorship.slot === 1 ? "" : "s"} available.`,
          meta: `Active • ${formatDate(sponsorship.durationFrom)}–${formatDate(sponsorship.durationTo)}`,
        };
      })
    : [{
        title: "No active sponsorships available",
        description: "There are no active sponsorships at this time. Please check again later.",
        meta: "No active listings",
      }];

  return <PublicPage {...pageContent.grants} panels={panels} />;
}
