import { APPLICATION_STAGE, APPLICATION_STATUS } from "@/utils/constant";

export interface PoolingFormProps {
    studentId: string;
    sponsorshipId: string;
    appStage: typeof APPLICATION_STAGE[keyof typeof APPLICATION_STAGE];
    appStatus: typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
    remarks?: string;
}