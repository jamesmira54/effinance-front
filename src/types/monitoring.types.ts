export type MonitoringFilter = "all" | "active" | "delisted" | "graduated";
export type GranteeStatus = "ACTIVE" | "DELISTED" | "GRADUATED";

export interface GranteeRow {
  seq: number;
  awardNumber: string | null;
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

export interface GranteeStatusChangeRequest {
  status: "DELISTED" | "GRADUATED";
  remarks?: string;
}
