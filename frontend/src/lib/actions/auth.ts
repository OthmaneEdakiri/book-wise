"use server";

import { createAxiosServer } from "@/lib/axios";
import { cookies } from "next/headers";

export const loginAction = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  try {
    const token = (await cookies()).get("access_token")?.value;
    const axiosServer = await createAxiosServer(token);

    const response = await axiosServer.post("/login", credentials);

    if (response.status === 200) {
      (await cookies()).set("access_token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return {
        status: 200,
        token: response.data.token,
        user: response.data.user,
        message: "You are login successfully",
      };
    }
  } catch (err: any) {
    if (err.status === 422) {
      return {
        status: 422,
        message: err.response.data.message,
        errors: err.response.data.errors,
      };
    }
    return {
      status: 500,
      message: "An unexpected server error occurred.",
    };
  }
};

export const logoutAction = async () => {
  try {
    const token = (await cookies()).get("access_token")?.value;
    const axiosServer = await createAxiosServer(token);

    const response = await axiosServer.post("/logout");

    if (response.status === 204) {
      (await cookies()).delete("access_token");

      return {
        status: 204,
      };
    }

    return {
      status: 500,
      message: "An unexpected error occurred",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.response?.data?.message || "An unexpected error occurredz",
    };
  }
};

export const signupAction = async (values: Record<string, string>) => {
    try {
      const token = (await cookies()).get("access_token")?.value;
    const axiosServer = await createAxiosServer(token);

    const response = await axiosServer.post("/register", values);

    if (response.status === 204) {
      return { status: 204 };
    }

    return {
      status: response.status || 500,
      message: "Unexpected response from the server.",
    };
  } catch (error: any) {
    const status = error.response?.status || 500;
    const data = error.response?.data;

    if (status === 422) {
      return {
        status,
        message: data?.message || "Validation failed.",
        errors: data?.errors || {},
      };
    }

    return {
      status,
      message:
        data?.message ||
        error.message ||
        "An unexpected server error occurred.",
    };
  }
};

