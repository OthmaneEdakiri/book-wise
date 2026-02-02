import { UserStatus } from "@/constants/enums";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  profile_image: string;
  email: string;
  email_verified_at: string | null;
  password: string;
  university_id: number;
  status: UserStatus;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}
