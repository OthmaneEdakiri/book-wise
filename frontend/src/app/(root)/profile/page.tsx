import React from "react";
import ProfileDetails from "./_components/ProfileDetails";
import BorrowedBooks from "./_components/BorrowedBooks";
import { cookies, headers } from "next/headers";
import { getUserBorrowRequests } from "@/lib/db/borrow-request";

const ProfilePage = async () => {
  const firsName = (await headers()).get("x-user-firstname");
  const universityId = (await headers()).get("x-user-university_id");
  const profileImage = (await headers()).get("x-user-profile_image");
  const email = (await headers()).get("x-user-email");

  const token = (await cookies()).get("access_token")?.value;
  const borrowRequests = await getUserBorrowRequests(token);

  return (
    <main className="min-h-[calc(100vh-156px)]">
      <div className="container">
        <div className="flex justify-between gap-20">
          <ProfileDetails
            email={email}
            firsName={firsName}
            profileImage={profileImage}
            universityId={universityId}
          />
          <BorrowedBooks borrowRequests={borrowRequests} />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
