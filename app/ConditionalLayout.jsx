"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/admin/login", "/admin/dashboard", "/admin/contact", "/admin/section", "/admin/job", "/admin/home-links", "/admin/government-jobs"];

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
