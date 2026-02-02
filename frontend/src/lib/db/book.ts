"use server";
import { createAxiosServer } from "../axios";
import { cach } from "../cach";

// export interface Book {
//   id: string;
//   title: string;
//   genre: string;
//   author: string;
//   image: string;
//   description: string;
//   summary: string;
//   total_copies: number;
//   available_copies: number;
//   created_at: Date;
//   updated_at: Date;
// }

export const getBooks = cach(
  async (
    page: number = 1,
    token?: string,
    search: string = "",
    sort: string = "newest",
  ) => {
    const axios = await createAxiosServer(token);

    const res = await axios.get(`/api/books`, {
      params: { page, search, sort },
    });
    return res.data;
  },
  ["books"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export const getBook = cach(
  async (token: string | undefined, id: string) => {
    const axiosServer = await createAxiosServer(token);
    const res = await axiosServer.get(`/api/books/${id}`);
    return res.data;
  },
  ["book"],
  {
    revalidate: 60 * 60 * 24,
  },
);
