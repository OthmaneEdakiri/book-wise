import React from "react";
import BookWiseLogo from "./BookWiseLogo";
import Navbar from "./Navbar";
import UserCard from "./UserCard";
import { headers } from "next/headers";

const SideBar = async () => {
  const firsName = (await headers()).get("x-user-firstname");
  const lastName = (await headers()).get("x-user-lastname");
  const profileImage = (await headers()).get("x-user-profile_image");
  const email = (await headers()).get("x-user-email");
  return (
    <>
      <div>
        <BookWiseLogo />
        <div
          className="my-4 border border-[#8C8E98] border-dashed"
          style={{
            borderImage:
              "repeating-linear-gradient(to right, #8C8E98 0 5px, transparent 5px 15px) 4",
          }}
        ></div>
        <Navbar />
      </div>
      <UserCard
        firstName={firsName}
        lastName={lastName}
        profileImage={profileImage}
        email={email}
      />
    </>
  );
};

export default SideBar;
