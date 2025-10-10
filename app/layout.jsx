import React from "react";
import "@/styles/global.scss";
import "./slick.css";
import ConditionalLayout from "./ConditionalLayout";

export const metadata = {
  title: "Job Portal",
  description: "Job Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
