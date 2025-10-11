"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/admin/login", "/admin/dashboard", "/admin/job"];

  const hideLayout = noLayoutRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
