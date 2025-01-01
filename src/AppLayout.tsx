import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
