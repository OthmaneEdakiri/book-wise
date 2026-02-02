import { BorrowRequestStatus } from "@/constants/enums";
import { Book } from "./book";
import { User } from "./user";

export type BorrowRequest = {
  id: number;
  user_id: number;
  book_id: number;
  status: BorrowRequestStatus;
  borrowed_date: Date | null;
  due_date: Date | null;
  return_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type BorrowRequestWithRelation = BorrowRequest & {
  user: User;
  book: Book;
};
