import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { ScrollToTopArrow } from "../components/Header/ScrollToTop/ScrollToTopArrow";

const HomeLayout = () => {
  return (
    <div className="font-satoshi">
      <ScrollToTopArrow />
      <Header />
      <main className="pt-[100px]">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
