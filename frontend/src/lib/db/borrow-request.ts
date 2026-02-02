"use server";

import { createAxiosServer } from "../axios";
import { cach } from "../cach";

export const getUserBorrowRequests = cach(
  async (token: string | undefined) => {
    const axiosServer = await createAxiosServer(token);

    try {
      const res = await axiosServer.get(`/api/borrow-requests/my`);
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
  ["borrow-bequests"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export const getAllBorrowRequests = cach(
  async (page: Number, token: string | undefined) => {
    const axiosServer = await createAxiosServer(token);

    try {
      const res = await axiosServer.get("/api/admin/borrow-requests", {
        params: { page },
      });

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
  ["all-borrow-bequests"],
  {
    revalidate: 60 * 60 * 24,
  },
);
