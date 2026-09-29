import { SponsorshipAPIService } from "@/api";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";

const SponsorshipAPI = new SponsorshipAPIService();

export const getSponsorshipOptions = async (): Promise<SelectOption[]> => {
  const sponsorships: APISponsorshipListResponse[] = await SponsorshipAPI.getAllSponsorships();
  return (sponsorships || []).map((sponsorship) => ({
    label: `${sponsorship.name} - Batch ${sponsorship.batchNumber}`,
    value: sponsorship.id,
  }));
};
