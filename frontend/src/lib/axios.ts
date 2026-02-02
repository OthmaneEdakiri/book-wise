"use server";
import axios, { AxiosInstance } from "axios";

export const createAxiosServer = async (
  token: string | undefined
): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return instance;
};
