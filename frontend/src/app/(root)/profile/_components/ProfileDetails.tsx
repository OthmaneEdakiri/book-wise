import GoldenBadgeCheck from "@/components/icons/GoldenBadgeCheck";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const ProfileDetails = ({
  firsName,
  universityId,
  profileImage,
  email,
}: {
  firsName: string | null;
  universityId: string | null;
  profileImage: string | null;
  email: string | null;
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #232839 0%, #12141D 100%)",
      }}
      className="xl:w-1/2 w-full h-fit px-10 pb-10 pt-28 rounded-[20px] relative shadow-[0px_0px_70px_0px_#00000066]"
    >
      <div className="absolute top-[-17px] left-[50%] transform -translate-x-[50%] w-[59px] h-[88px] rounded-b-[100px] bg-[#464F6F] opacity-80">
        <span className="bg-[#1E2230] h-[10px] w-[40px] rounded-[40px] absolute left-[50%] transform -translate-[50%] bottom-[19px]"></span>
      </div>

      <div className="space-y-8">
        <div className="flex gap-[30px] items-center">
          <div className="relative h-[99px] w-[99px] rounded-[50%] overflow-hidden">
            {profileImage && <Image src={profileImage} alt="" fill={true} />}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2.5">
              <GoldenBadgeCheck />
              <span className="text-[14px] leading-[20px]">
                Verified Student
              </span>
            </div>
            <h2 className="text-[24px] leading-[30px] font-semibold text-white mb-2">
              {firsName}
            </h2>
            <h3 className="text-[18px] leading-[20px]">{email}</h3>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[18px] leading-[28px]">Student ID</span>
          <p className="text-[24px] leading-[32px] font-semibold text-white">
            {universityId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
