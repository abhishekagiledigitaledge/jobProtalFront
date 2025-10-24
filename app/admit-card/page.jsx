// "use client"

// import React, { useEffect, useState } from 'react'
// import './admit-cards.scss'
// import { useRouter } from "next/navigation";
// import '../latest-jobs/ViewJobs.css';
// import { fetcher } from '@/src/components/fetcher';
// import Loader from '@/src/components/Loader/Loader';

// const latestJobs = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const router = useRouter();
//     const limit = 10;

//     const fetchJobs = async (pageNum = 1) => {
//         try {
//             setLoading(true);
//             const res = await fetcher(`/naukari?page=${pageNum}&limit=${limit}&type=admit_card`);
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
//             <h1 className="heading">Admit Card</h1>
//             <p className='text'>Welcome to <strong>Sarkari Result.</strong> Stay informed about the
//                 admit card of various competitive exams conducted by government bodies across India, whether
//                 you are waiting for the admit card of any recruitment exam, entrance exam or any other
//                 government exam then we update the admit card from time to time to keep
//                 you informed. <a href="">Let’s update.</a></p>
//             <p className="text"><strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के परिणाम के बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या किसी अन्य सरकारी परीक्षा के परिणाम का इंतजार कर रहे हों तो हम आपको सूचित रखने के लिए समय-समय पर परिणाम अपडेट करते हैं।</p>
//             <h2>All Latest <span className="highlight">Admit Card</span></h2>
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

//     )
// }

// export default latestJobs;
import { fetcher } from '@/src/components/fetcher';
import './admit-cards.scss';
import '../latest-jobs/ViewJobs.css';
import Link from 'next/link';

const limit = 10;

export default async function AdmitCards({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  // ✅ Server-side fetch
  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=admit_card`, {
      cache: 'no-store', // ensures fresh data every request
    });
  } catch (error) {
    console.error("Error fetching admit cards:", error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res || jobs.length === 0) {
    return (
      <div className="admin-card-container">
        <h1 className="heading">Admit Card</h1>
        <p className="no-jobs">No admit cards available.</p>
      </div>
    );
  }

  return (
    <div className="admin-card-container">
      <h1 className="heading">Admit Card</h1>
      <p className='text'>
        Welcome to <strong>Sarkari Result.</strong> Stay informed about the admit card of various competitive exams conducted by government bodies across India. We update admit cards regularly to keep you informed. <a href="#">Let’s update.</a>
      </p>
      <p className="text">
        <strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के परिणाम के बारे में सूचित रहें। 
      </p>

      <h2>All Latest <span className="highlight">Admit Card</span></h2>

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
