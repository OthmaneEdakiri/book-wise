"use server";
import { cookies } from "next/headers";
import { createAxiosServer } from "../axios";
import { revalidatePath } from "next/cache";
import { Pages, Routes, UserRole, UserStatus } from "@/constants/enums";

export const deleteUserAction = async (id: string, type: UserRole) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const response = await axiosServer.delete(`/api/admin/users/${id}`, {
      params: { type: type },
    });

    revalidatePath(`/${Routes.DASHBOARD}/${Pages.USERS}`);
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.ACCOUNT_REQUESTS}`);

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};

export const updateUserStatusAction = async (
  id: string,
  type: UserRole,
  current_status: UserStatus,
) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const response = await axiosServer.patch(`/api/admin/users/${id}/status`, {
      type,
      current_status
    });

    revalidatePath(`/${Routes.DASHBOARD}/${Pages.USERS}`);
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.ACCOUNT_REQUESTS}`);

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};
