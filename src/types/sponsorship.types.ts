import { APPLICATION_STAGE, APPLICATION_STATUS } from "@/utils/constant";
export interface APISponsorhipPayload {
    name: string;
    sponsorId: string;
    academicYearId:  string;
    durationFrom: string;
    durationTo: string;
    batchNumber: number;
    limit: number;
    slot: number;
    fundAllocation: number;
    sponsorshipRequirements: string[];
    sponsorshipSchool: string[];
}


export interface APISponsorshipListResponse {
    id: string;
    name: string;
    sponsorId: string;
    sponsorName: string;
    coordinatorId: string;
    coordinatorName: string;
    academicYearId: string;
    academicYearEnd: number;
    academicYearStart: number;
    durationFrom: string;
    durationTo: string;
    batchNumber: number;
    limit: number;
    slot: number;
    fundAllocation: number;
    status: string;
    studentCount: number;
    sponsorshipSchool: SponsorshipSchoolProps[];
    sponsorshipRequirements: SponsorshipRequirements[];
    students: any[],
    criterion: any[];
    pairwise: any[];
}

export interface SponsorshipSchoolProps {
    schoolId: string;
    schoolName: string;
}

export interface SponsorshipRequirements {
    fileId: string;
    fileName: string;
}

export interface SponsorshipApplicationResponse {
    id: string;
    appNumber: string;
    studentId: string;
    sponsorshipId: string;
    appStatus: string;
    appStage: string;
    applicantName: string;
    sex: string;
    program: string;
    yearLevel: string;
    municipality: string; 
    finAssname: string;
    dateOfApp: string;
}

export interface AppliedSponsorshipDetailResponse {
    appId: string;
    studentId: string;
    studentName: string;
    studentSex: string;
    programName: string;
    yearLevel: string;
    sponsorshipId: string;
    sponsorshipName: string;
    sponsorshipRemarks: string;
    sponsorshipStatus: typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
    sponsorshipStage: typeof APPLICATION_STAGE[keyof typeof APPLICATION_STAGE];
    applicationDate: string;
    sponsorshipRequirement: SponsorshipRequirements[];
}
