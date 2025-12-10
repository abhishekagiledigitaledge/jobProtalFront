"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetcher } from "@/src/components/agentFetcher";
import "./verify-otp.css";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  useEffect(() => {
    const token = Cookies.get("job_portal_agent");
    const storedStudent = localStorage.getItem("job_portal_agent");

    if (token || storedStudent) {
      router.push("/student/dashboard");
    }
  }, [router]);

  const verifyOtp = async () => {
    try {
      await fetcher("/student/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      alert("Email verified successfully");
      router.push("/student/login");
    } catch (err) {
      alert(err.message || "Verification failed");
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP</h2>
      <p>{email}</p>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
}
