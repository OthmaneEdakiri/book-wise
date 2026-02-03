import BookWiseLogo from "@/components/BookWiseLogo";
import Navbar from "./Navbar";
import { headers } from "next/headers";

const Header = async () => {
  const firstname = (await headers()).get("x-user-firstname");
  const lastname = (await headers()).get("x-user-lastname");
  return (
    <header>
      <div className="container">
        <div className="header-content flex items-center justify-between md:py-[60px] py-[40px] relative">
          <BookWiseLogo />

          <Navbar firstname={firstname} lastname={lastname} />
        </div>
      </div>
    </header>
  );
};

export default Header;
