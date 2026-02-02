"use server";

import { cookies } from "next/headers";
import { createAxiosServer } from "../axios";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
import { BorrowRequestWithRelation } from "@/types/borrow-request";

export const createBorrowRequest = async (book_id: string) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const res = await axiosServer.post("/api/borrow-requests", {
      book_id,
    });
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BORROW_REQUESTS}`);
    revalidatePath(`/${Pages.PROFILE}`);
    revalidatePath(`/${Routes.DASHBOARD}`)

    return {
      status: res.status,
      message: res.data.message,
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error.response.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};
// /borrow-requests/{borrowRequest}/status
export const updateBorrowStatus = async (borrowId: BorrowRequestWithRelation['id'], status: BorrowRequestWithRelation['status']) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const res = await axiosServer.patch(
      `/api/admin/borrow-requests/${borrowId}/status`,
      {
        status,
      },
    );

    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BORROW_REQUESTS}`);
    revalidatePath(`/${Pages.BOOKS}/${res.data.data.book_id}`);
    revalidatePath(`/${Pages.PROFILE}`);
    revalidatePath(`/${Routes.DASHBOARD}`)
    return {
      message: res.data.message,
      status: res.status,
      newStatus: res.data.data.status,
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error.response.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};
