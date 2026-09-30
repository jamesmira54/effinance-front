import { DocumentTrackingAPIService, SponsorshipAPIService } from "@/api";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { APISponsorshipListResponse } from "@/types/sponsorship.types";
import { toOptions } from "@/screens/document-tracking/trackDisplay";

const SponsorshipAPI = new SponsorshipAPIService();
const trackingAPI = new DocumentTrackingAPIService();

export interface TrackFormOptions {
  processTypes: SelectOption[];
  purposes: SelectOption[];
  offices: SelectOption[];
  sponsorships: SelectOption[];
}

export const getTrackFormOptions = async (): Promise<TrackFormOptions> => {
  const active = { active: true, limit: 100 };
  const [processTypes, purposes, offices, sponsorships] = await Promise.all([
    trackingAPI.setupList("process-types", active),
    trackingAPI.setupList("purposes", active),
    trackingAPI.setupList("offices", active),
    SponsorshipAPI.getAllSponsorships() as Promise<APISponsorshipListResponse[]>,
  ]);

  return {
    processTypes: toOptions(processTypes?.data ?? []),
    purposes: toOptions(purposes?.data ?? []),
    offices: toOptions(offices?.data ?? []),
    sponsorships: (sponsorships || []).map((sponsorship) => ({
      label: `${sponsorship.name} - Batch ${sponsorship.batchNumber}`,
      value: sponsorship.id,
    })),
  };
};
