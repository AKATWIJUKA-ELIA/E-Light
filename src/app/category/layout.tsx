"use client";

import React from "react";
// import MainHero from "@/components/MainHero/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;