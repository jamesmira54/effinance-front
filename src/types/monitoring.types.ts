export type MonitoringFilter = "all" | "active" | "delisted" | "graduated" | "loa";
export type GranteeStatus = "ACTIVE" | "DELISTED" | "GRADUATED" | "LOA";

export interface GranteeRow {
  seq: number;
  applicationId: string;
  awardNumber: string | null;
  // The application number, shown as the student number.
  studentNumber: string | null;
  sponsor: string | null;
  grantName: string;
  academicYear: string | null;
  batch: number | null;
  semester: number | null;
  studentId: string | null;
  completeName: string;
  gender: string | null;
  yearLevel: number | null;
  course: string | null;
  school: string | null;
  gwa: number | null;
  status: GranteeStatus;
}

export interface GranteeListResponse {
  totalCount: number;
  grantees: GranteeRow[];
}

export interface MonitoringListParams {
  type?: MonitoringFilter;
  search?: string;
  academic_year_id?: string;
  offset?: number;
  limit?: number;
}

// AWARDED reinstates an LOA grantee to Active.
export type GranteeStatusTarget = "DELISTED" | "GRADUATED" | "LOA" | "AWARDED";

export interface GranteeStatusChangeRequest {
  status: GranteeStatusTarget;
  remarks?: string;
}
