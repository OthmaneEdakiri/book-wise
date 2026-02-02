"use client";
import ArchiveBook from "@/components/icons/admin/ArchiveBook";
import BookOpen from "@/components/icons/admin/BookOpen";
import House from "@/components/icons/admin/House";
import User from "@/components/icons/admin/User";
import Users from "@/components/icons/admin/Users";
import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      href: `/${Routes.DASHBOARD}`,
      title: "Home",
      icon: <House />,
    },
    {
      href: `/${Routes.DASHBOARD}/${Pages.USERS}`,
      title: "All Users",
      icon: <Users />,
    },
    {
      href: `/${Routes.DASHBOARD}/${Pages.BOOKS}`,
      title: "All Books",
      icon: <BookOpen />,
    },
    {
      href: `/${Routes.DASHBOARD}/${Pages.BORROW_REQUESTS}`,
      title: "Borrow Requests",
      icon: <ArchiveBook />,
    },
    {
      href: `/${Routes.DASHBOARD}/${Pages.ACCOUNT_REQUESTS}`,
      title: "Account Requests",
      icon: <User />,
    },
  ];
  return (
    <nav>
      <ul className="flex flex-col gap-2.5">
        {navLinks.map((navLink, index) => (
          <li key={index}>
            <Link
              className={`px-3 rounded-[8px] flex items-center gap-2.5 h-[50px] w-full transition-colors font-[500] ${pathname === navLink.href ? "bg-[#25388C] text-white" : "hover:bg-[#F8F8FF] text-[#3A354E]"}`}
              href={navLink.href}
            >
              {navLink.icon}
              <span>{navLink.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
