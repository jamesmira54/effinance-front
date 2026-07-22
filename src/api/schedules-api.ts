import AxiosAPI from "./axios-api";
import { Schedule, ScheduleRequest } from "@/types/schedule.types";

export default class ScheduleAPIService extends AxiosAPI {
  constructor() {
    super({ resourcePath: "/api/v1/schedules" });
  }

  getAllSchedules(params?: { search?: string; limit?: number; offset?: number }): Promise<Schedule[]> {
    return this.get({ params });
  }

  getSchedule(scheduleId: string): Promise<Schedule> {
    return this.get({ path: `/${scheduleId}` });
  }

  createSchedule(payload: ScheduleRequest): Promise<Schedule> {
    return this.post({ body: payload });
  }

  updateSchedule(scheduleId: string, payload: ScheduleRequest): Promise<Schedule> {
    return this.put({ path: `/${scheduleId}`, body: payload });
  }

  deleteSchedule(scheduleId: string): Promise<void> {
    return this.delete({ path: `/${scheduleId}` });
  }
}
