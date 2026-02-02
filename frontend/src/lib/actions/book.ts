"use server";

import { Pages, Routes } from "@/constants/enums";
import { createAxiosServer } from "@/lib/axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createBookAction = async (formData: FormData) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const response = await axiosServer.post("/api/admin/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BOOKS}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    if (error.status === 422) {
      return {
        status: 422,
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    }
    return {
      status: error.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};

export const updateBookAction = async (formData: FormData, bookId: string) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);
  try {
    const response = await axiosServer.post(
      `/api/admin/books/${bookId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BOOKS}`);
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BOOKS}/${bookId}`);
    revalidatePath(`/${Pages.LIBRARY}`)
    revalidatePath(
      `/${Routes.DASHBOARD}/${Pages.BOOKS}/${bookId}/${Pages.EDIT}`
    );
    revalidatePath(`/${Routes.DASHBOARD}`)

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    if (error.status === 422) {
      return {
        status: 422,
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    }
    return {
      status: error.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};

export const deleteBookAction = async (bookId: string) => {
  const token = (await cookies()).get("access_token")?.value;
  const axiosServer = await createAxiosServer(token);

  try {
    const response = await axiosServer.delete(`/api/admin/books/${bookId}`);
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BOOKS}`);
    revalidatePath(`/${Routes.DASHBOARD}/${Pages.BOOKS}/${bookId}`);
    revalidatePath(
      `/${Routes.DASHBOARD}/${Pages.BOOKS}/${bookId}/${Pages.EDIT}`
    );
    revalidatePath(`/${Routes.DASHBOARD}`)
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.status || 500,
      message:
        error.response.data.message || "An unexpected server error occurred.",
    };
  }
};
