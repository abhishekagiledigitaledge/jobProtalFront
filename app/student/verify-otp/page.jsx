import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient.jsx";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
