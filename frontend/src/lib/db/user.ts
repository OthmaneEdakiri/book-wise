"use server";

import { createAxiosServer } from "../axios";
import { cach } from "../cach";

export const getUser = async (token: string | undefined) => {
  const axiosServer = await createAxiosServer(token);
  try {
    const res = await axiosServer.get("/api/user");
    return {
      status: 200,
      user: res.data,
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: 401,
      user: null,
    };
  }
};

export const getUsers = cach(
  async (token: string | undefined) => {
    const axiosServer = await createAxiosServer(token);
    const response = await axiosServer.get("/api/admin/users");
    return response.data;
  },
  ["users"],
  { revalidate: 60 * 60 * 24 }
);
