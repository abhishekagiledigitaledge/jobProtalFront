"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./dashboard.css";
// import Loader from "@/src/components/Loader/Loader";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const router = useRouter();

  useEffect(() => {
    // Check token in cookies
    const token = Cookies.get("job_portal");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Get user info from localStorage
    const storedUser = localStorage.getItem("job_portal");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminName(user?.name || "Admin");
    } else {
      setAdminName("Admin");
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("job_portal");
    localStorage.removeItem("job_portal");
    router.push("/admin/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Government Job Portal</h1>
        <div className="admin-info">
          <span>Welcome, <b>{adminName}</b></span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      {/* <Loader size={50} color="lightgray"/> */}

      <main className="dashboard-main">
        <section className="stats-grid">
          <div className="stat-card blue">
            <h3>Total Jobs</h3>
            <p>154</p>
          </div>
          <div className="stat-card green">
            <h3>Active Jobs</h3>
            <p>98</p>
          </div>
          <div className="stat-card orange">
            <h3>Applications Received</h3>
            <p>12,543</p>
          </div>
          <div className="stat-card red">
            <h3>Pending Approvals</h3>
            <p>23</p>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Job Postings</h2>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Posted On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Junior Engineer</td>
                <td>Public Works Department</td>
                <td>Oct 5, 2025</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Data Entry Operator</td>
                <td>Education Board</td>
                <td>Oct 3, 2025</td>
                <td><span className="status closed">Closed</span></td>
              </tr>
              <tr>
                <td>Assistant Manager</td>
                <td>Finance Department</td>
                <td>Oct 2, 2025</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer className="dashboard-footer">
        © {new Date().getFullYear()} Government Job Portal | All Rights Reserved
      </footer>
    </div>
  );
}
