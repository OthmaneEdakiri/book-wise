"use server";

import { createAxiosServer } from "../axios";
import { cach } from "../cach";

export const getDashboardStats = cach(
  async (token : string | undefined) => {
    const axiosServer = await createAxiosServer(token);

    try {
      const res = await axiosServer.get("/api/admin/dashboard/stats");

      return res.data;
    } catch (error: any) {
      console.error(error);
      return {
        status: error.response.status || 500,
        message:
          error.response.data.message || "An unexpected server error occurred.",
      };
    }
  },
  ["dashboard-stats"],
  { revalidate: 60 * 60 * 24 },
);
