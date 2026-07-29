import AxiosAPI from "./axios-api";
import {
  GranteeListResponse,
  GranteeStatusChangeRequest,
  MonitoringListParams,
} from "@/types/monitoring.types";

export default class MonitoringAPIService extends AxiosAPI {
  constructor() {
    super({ resourcePath: "/api/v1/monitoring" });
  }

  getGrantees(params: MonitoringListParams = {}): Promise<GranteeListResponse> {
    return this.get({ path: "/grantees", params });
  }

  updateGranteeStatus(applicationId: string, payload: GranteeStatusChangeRequest): Promise<void> {
    return this.put({ path: `/grantees/${applicationId}/status`, body: payload });
  }
}
