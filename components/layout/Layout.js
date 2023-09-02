import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const noLayoutRoutes = ["/user", "/404"];
  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div className="bg-white shadow-sm z-10">
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
      </div>

      <div className="flex ">
        {isNoLayoutRoute ? (
          <></>
        ) : (
          <div className="shadow-xl">
            <Sidebar />
          </div>
        )}

        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;
