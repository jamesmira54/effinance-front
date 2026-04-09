export interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
};


export interface ApplicationsByStatus {
  pendingPooling: number;
  followUp: number;
  complete: number;
  rejected: number;
  awarded: number;
  ranked: number;
  notQualified: number;
};

export interface ApplicationsByStage {
  pooling: number;
  applicationList: number;
  rankingSelection: number;
  finasProper: number;
};

export interface SchoolsByType {
  public: number;
  private: number;
};

export interface DashboardData {
  numberOfQualifiedStudents: number;
  numberOfFinancialAssistance: number;
  numberOfSchools: number;
  applicationsByStatus: ApplicationsByStatus;
  applicationsByStage: ApplicationsByStage;
  granteesBySponsorship: any[];
  schoolsByType: SchoolsByType;
  recentApplicationsCount: number;
  totalApplications: number;
};

export interface StatCardProps {
  title: string;
  value: number;
};