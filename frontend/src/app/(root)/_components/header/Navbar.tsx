"use client";
import React, { useEffect, useState } from "react";
import AuthLinks from "./logout-button";
import { Pages } from "@/constants/enums";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { TextAlignJustify, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  firstname: string | null;
  lastname: string | null;
}

const Navbar = ({ firstname, lastname }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    {
      id: crypto.randomUUID(),
      item: (
        <Link
          className="text-[20px] leading-[32px] hover:text-gold transition-colors"
          href={`/${Pages.LIBRARY}`}
        >
          Library
        </Link>
      ),
    },
    {
      id: crypto.randomUUID(),
      item: (
        <Link href={`/${Pages.PROFILE}`} className="text-[20px] leading-[32px]">
          <div className="md:flex hidden items-center gap-1.5 font-semibold">
            <span className="uppercase h-8 w-8 rounded-[50%] flex items-center justify-center bg-[#A5DEEF] text-[#0b0d16] text-[16px]">
              {firstname && lastname ? `${firstname[0]}${lastname[0]}` : "AB"}
            </span>
            <span>{firstname ? firstname : "name"}</span>
          </div>
          <span className="md:hidden block hover:text-gold transition-colors">
            Profile
          </span>
        </Link>
      ),
    },
    {
      id: crypto.randomUUID(),
      item: <LogoutButton />,
    },
  ];

  return (
    <>
      <nav className="md:block hidden">
        <ul className="flex items-center gap-[34px]">
          {navItems.map((item) => (
            <li key={item.id}>{item.item}</li>
          ))}
        </ul>
      </nav>

      <button
        className="md:hidden flex items-center text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="text-white h-7 w-7" />
        ) : (
          <TextAlignJustify className="text-white h-7 w-7" />
        )}
      </button>

      {isOpen && (
        <nav
          style={{
            background: "linear-gradient(180deg, #232839 0%, #12141D 100%)",
          }}
          className="md:hidden flex flex-col gap-4 pb-4 absolute top-28 right-8 shadow-[0px_0px_70px_0px_#00000066] p-5 rounded-[6px] z-20 min-w-[250px]"
        >
          <ul className="space-y-2.5">
            {navItems.map((item) => (
              <li key={item.id}>{item.item}</li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
