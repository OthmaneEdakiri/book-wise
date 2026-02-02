import BookWiseLogo from "@/components/BookWiseLogo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content flex items-center justify-between py-[60px]">
          <BookWiseLogo />

          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
