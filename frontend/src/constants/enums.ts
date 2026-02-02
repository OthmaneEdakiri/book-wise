export enum Routes {
  ROOT = "/",
  AUTH = "auth",
  DASHBOARD = "dashboard",
}

export enum Pages {
  BOOKS = "books",
  SEARCH = "search",
  LOGIN = "login",
  REGISTER = "register",
  PROFILE = "profile",
  USERS = "users",
  BORROW_REQUESTS = "borrow-requests",
  ACCOUNT_REQUESTS = "account-requests",
  CREATE = "create",
  UPDATE = "update",
  EDIT = "edit",
  LIBRARY = "library",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REVOKED = "revoked",
}

export enum BorrowRequestStatus {
  PENDING = "pending",
  BORROWED = "borrowed",
  RETURNED = "returned",
  OVERDUE = "overdue",
  EXPIRED = "expired",
}
