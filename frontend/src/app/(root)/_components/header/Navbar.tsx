import React from "react";
import AuthLinks from "./auth-links";
import { Pages } from "@/constants/enums";
import { headers } from "next/headers";
import Link from "next/link";

const Navbar = async () => {
  const firstname = (await headers()).get("x-user-firstname");
  const lastname = (await headers()).get("x-user-lastname");

  return (
    <nav>
      <ul className="flex items-center gap-[34px]">
        <li>
          <Link
            className="text-[20px] leading-[32px] hover:text-gold transition-colors"
            href={`/${Pages.LIBRARY}`}
          >
            Library
          </Link>
        </li>
        <AuthLinks firstname={firstname} lastname={lastname} />
      </ul>
    </nav>
  );
};

export default Navbar;
