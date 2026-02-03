import BookWiseLogo from "@/components/BookWiseLogo";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex">
      <div className="py-20 flex justify-center items-center xl:w-[55%] w-full min-h-screen bg-[linear-gradient(180deg,#090C15_8%,#080B17_100%)]">
        <div className="md:p-10 p-8 bg-[linear-gradient(180deg,#12141D_0%,#12151F_100%)] rounded-[20px] text-[#D6E0FF] max-w-xl w-[calc(100%-40px)]">
          <div className="mf:mb-8 mb-6">
            <BookWiseLogo />
          </div>
          {children}
        </div>
      </div>
      <div className="w-[45%] relative xl:block hidden">
        <Image src={"/images/auth-illustration.png"} alt="" fill={true} />
      </div>
    </div>
  );
}
