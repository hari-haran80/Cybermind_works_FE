import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="font-satoshi">
      <Header />
      <main className="pt-[100px]">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
