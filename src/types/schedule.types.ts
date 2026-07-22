export type ScheduleType = "TEST" | "INTERVIEW";
export type ExaminationType = "ONSITE" | "ONLINE";

export interface ScheduleRequest {
  sponsorshipId: string;
  batchNo: number;
  batchCode: string;
  scheduleType: ScheduleType;
  examinationType: ExaminationType;
  proctorInterviewer: string;
  location: string;
  scheduleQuota: number;
  startDate: string;
  endDate: string;
}

export interface Schedule extends Omit<ScheduleRequest, "batchCode" | "examinationType" | "proctorInterviewer"> {
  id: string;
  sponsorshipName?: string | null;
  batchCode: string | null;
  examinationType: ExaminationType | null;
  proctorInterviewer: string | null;
}
