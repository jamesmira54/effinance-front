import { SponsorshipAPIService, AnnouncementsAPIService, AddressAPIService } from "@/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AnnouncementsList from "@/screens/announcements/AnnouncementsList";
import { AnnouncementsListProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Announcements",
};

const AnnouncementsAPI = new AnnouncementsAPIService();
const SponsorshipsAPI = new SponsorshipAPIService();
const AddressAPI = new AddressAPIService();

const getAnnouncementsData = async () => {
  const response = await AnnouncementsAPI.getAnnouncements({ offset: 0, limit: 50, mine: true });
  return response;
}

const getAllProvinces = async () => {
  return await AddressAPI.getAllProvinces();
}

const Announcements = async () => {
  const announcementsData = await getAnnouncementsData();
  let allSponsorships = [];
  try {
    allSponsorships = await SponsorshipsAPI.getAllSponsorships();
  } catch (error) {
    console.error('Failed to fetch sponsorships:', error);
    allSponsorships = [];
  }
  const provinces = await getAllProvinces();

  let finalAnnouncementsData: AnnouncementsListProps[] = [];

  if(announcementsData) {
    announcementsData.forEach(async (announcement: any) => {
      const sponsorship = allSponsorships.find((sponsorship: any) => sponsorship.id === announcement.sponsorshipId);
      if(sponsorship) {
        announcement.sponsorshipName = sponsorship.name;
      }
      finalAnnouncementsData.push(announcement);
    });
  }

  const serverData = {
    announcements: announcementsData || [],
    provinces: provinces || [],
    allSponsorships: allSponsorships || [],
  }

  return (
    <>
      <Breadcrumb pageName="Announcements" />
      <AnnouncementsList serverData={serverData}/>
    </>
  );
};

export default Announcements;
