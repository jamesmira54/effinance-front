import {
  SponsorshipAPIService,
  AnnouncementsAPIService,
  AddressAPIService,
  AuthAPIService,
} from "@/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AnnouncementsList from "@/screens/announcements/AnnouncementsList";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { AnnouncementsListProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Effinance - Announcements",
};

const authAPI = new AuthAPIService();
const AnnouncementsAPI = new AnnouncementsAPIService();
const SponsorshipsAPI = new SponsorshipAPIService();
const AddressAPI = new AddressAPIService();

const fetchUserSession = async () => {
  return await authAPI.me();
};

const getAnnouncementsData = async () => {
  const response = await AnnouncementsAPI.getAnnouncements({
    offset: 0,
    limit: 50,
    mine: true,
  });
  return response;
};

const getAllProvinces = async () => {
  return await AddressAPI.getAllProvinces();
};

const Announcements = async () => {
  const announcementsData = await getAnnouncementsData();
  let allSponsorships: APISponsorshipListResponse[] = [];
  try {
    const sponsorships = await SponsorshipsAPI.getAllSponsorships();
    allSponsorships = Array.isArray(sponsorships) ? sponsorships : [];
  } catch (error) {
    console.error("Failed to fetch sponsorships:", error);
    allSponsorships = [];
  }
  const provinces = await getAllProvinces();

  let finalAnnouncementsData: AnnouncementsListProps[] = [];

  if (announcementsData) {
    announcementsData.forEach((announcement: any) => {
      const sponsorship = allSponsorships.find(
        (sponsorship: any) => sponsorship.id === announcement.sponsorshipId,
      );
      if (sponsorship) {
        announcement.sponsorshipName = sponsorship.name;
      }
      finalAnnouncementsData.push(announcement);
    });
  }

  const userDetails = await fetchUserSession();

  const serverData = {
    userSession: userDetails || {},
    announcements: finalAnnouncementsData || [],
    provinces: provinces || [],
    allSponsorships: allSponsorships || [],
  };

  return (
    <>
      <Breadcrumb pageName="Announcements" />
      <AnnouncementsList serverData={serverData as any} />
    </>
  );
};

export default Announcements;
