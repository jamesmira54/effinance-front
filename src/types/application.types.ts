import { APPLICATION_STAGE, APPLICATION_STATUS } from "@/utils/constant";

export interface APIApplicationResponse  {
    id: string;
    appNumber: string;
    studentId: string;
    sponsorshipId: string;
    appStatus: typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
    appStage: typeof APPLICATION_STAGE[keyof typeof APPLICATION_STAGE];
    applicantName: string;
    sex: string;
    program: string;
    yearLevel: string;
    municipality: string; 
    finAssname: string;
    dateOfApp: string;
    remarks?: string;
}