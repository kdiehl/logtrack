import axios from "axios";

class JiraBookingService {
  private readonly baseUrl: string;
  private readonly accessToken: string;

  constructor(baseUrl: string, accessToken: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  async createBooking(
    ticketId: string,
    durationInHours: number,
  ): Promise<void> {
    const url = `${this.baseUrl}/rest/api/2/issue/${ticketId}/worklog`;
    const startTime = new Date().toISOString();
    const timeSpentSeconds = durationInHours * 3600; // Convert hours to seconds
    const data = {
      started: startTime,
      timeSpentSeconds: timeSpentSeconds,
    };

    await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default JiraBookingService;
