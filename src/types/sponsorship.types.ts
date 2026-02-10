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
    students: any[]
}

export interface SponsorshipSchoolProps {
    schoolId: string;
    schoolName: string;
}

export interface SponsorshipRequirements {
    id: string;
    filetype: string;
    filename: string;
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