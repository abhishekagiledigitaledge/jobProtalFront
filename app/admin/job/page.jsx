"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "../dashboard/dashboard.css";
import CreateJob from "@/src/components/Jobs/CreateJob";
import PostLists from "@/src/components/Jobs/PostLists";
// import Loader from "@/src/components/Loader/Loader";

export default function JobDashboard() {
    const [adminName, setAdminName] = useState("Admin");
    const [isViewForm, setIsViewForm] = useState(false);
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

    const handleCloseForm = () => {
        setIsViewForm(false);
    }

    const handleOpenForm = () => {
        console.log("sfgS")
        setIsViewForm(true);
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Government Job Portal</h1>
                <div className="admin-info">
                    <span>Welcome, <b>{adminName}</b></span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {isViewForm ? <CreateJob handleCloseForm={handleCloseForm} /> : <PostLists handleOpenForm={handleOpenForm} />}

            <footer className="dashboard-footer">
                © {new Date().getFullYear()} Government Job Portal | All Rights Reserved
            </footer>
        </div>
    );
}
