// "use client";
// import React, { useEffect, useState } from "react";
// import "./ViewJobs.css";
// import './latest-job.scss'
// import { useRouter } from "next/navigation";
// import { fetcher } from "@/src/components/fetcher";
// import Loader from "@/src/components/Loader/Loader";

// const ViewJobs = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const router = useRouter();
//     const limit = 10;

//     const fetchJobs = async (pageNum = 1) => {
//         try {
//             setLoading(true);
//             const res = await fetcher(`/naukari?page=${pageNum}&limit=${limit}&type=jobs`);
//             setJobs(res?.data || []);
//             setTotalPages(res?.pagination?.totalPages || 1);
//         } catch (error) {
//             console.error("Error fetching jobs:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchJobs(page);
//     }, [page]);

//     const handleNext = () => {
//         if (page < totalPages) setPage(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) setPage(page - 1);
//     };

//     if (loading) return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}><Loader size={50} /></div>

//     return (
//         <div className="admin-card-container">
//             <h1 className="heading">Latest Jobs</h1>
//             <p className='text'>Welcome to <strong>Sarkari Result.</strong> Stay informed about the
//                 Admit Card of various competitive exams conducted by government bodies across India, whether
//                 you are waiting for the Admit Card of any recruitment exam, entrance exam or any other
//                 government exam then we update the Admit Card from time to time to keep
//                 you informed. <a href="">Let’s update.</a></p>
//             <p className="text"><strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के एडमिट कार्ड के बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या किसी अन्य सरकारी परीक्षा के एडमिट कार्ड का इंतजार कर रहे हों तो हम आपको सूचित रखने के लिए समय-समय पर एडमिट कार्ड अपडेट करते हैं।</p>
//             <h2>All Latest <span className="highlight">Jobs</span></h2>

//             <div className="jobs-list">
//                 {jobs.length > 0 ? (
//                     jobs.map((job) => (
//                         <div
//                             key={job.naukari_id}
//                             className="job-title"
//                             onClick={() => router.push(`/${job.seo_section}/${job.slug}`)}
//                         >
//                             {job.title}
//                         </div>
//                     ))
//                 ) : (
//                     <p className="no-jobs">No jobs available.</p>
//                 )}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//                 <div className="pagination">
//                     <button onClick={handlePrev} disabled={page === 1}>
//                         Prev
//                     </button>
//                     <span className="page-info">
//                         Page {page} of {totalPages}
//                     </span>
//                     <button onClick={handleNext} disabled={page === totalPages}>
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewJobs;
import { fetcher } from "@/src/components/fetcher";
import './ViewJobs.css';
import './latest-job.scss';
import Link from "next/link";

const limit = 10;

export default async function ViewJobs({ searchParams }) {
    const page = Number(searchParams?.page) || 1;

    // ✅ Server-side fetch
    let res = null;
    try {
        res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=jobs`, {
            cache: "no-store", // disables caching for fresh data
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }

    const jobs = res?.data || [];
    const totalPages = res?.pagination?.totalPages || 1;

    if (!res || jobs.length === 0) {
        return (
            <div className="admin-card-container">
                <h1 className="heading">Latest Jobs</h1>
                <p className="no-jobs">No jobs available.</p>
            </div>
        );
    }

    return (
        <div className="admin-card-container">
            <h1 className="heading">Latest Jobs</h1>
            <p className='text'>Welcome to <strong>Sarkari Result.</strong> Stay informed about the
                Admit Card of various competitive exams conducted by government bodies across India, whether
                you are waiting for the Admit Card of any recruitment exam, entrance exam or any other
                government exam then we update the Admit Card from time to time to keep
                you informed. <a href="">Let’s update.</a></p>
            <p className="text"><strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के एडमिट कार्ड के बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या किसी अन्य सरकारी परीक्षा के एडमिट कार्ड का इंतजार कर रहे हों तो हम आपको सूचित रखने के लिए समय-समय पर एडमिट कार्ड अपडेट करते हैं।</p>
            <h2>All Latest <span className="highlight">Jobs</span></h2>


            <div className="jobs-list">
                {jobs.map((job) => (
                    <Link
                        key={job.naukari_id}
                        href={`/${job.seo_section}/${job.slug}`}
                        className="job-title"
                    >
                        {job.title}
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    {page > 1 && (
                        <Link href={`?page=${page - 1}`}>
                            <button>Prev</button>
                        </Link>
                    )}
                    <span className="page-info">Page {page} of {totalPages}</span>
                    {page < totalPages && (
                        <Link href={`?page=${page + 1}`}>
                            <button>Next</button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
