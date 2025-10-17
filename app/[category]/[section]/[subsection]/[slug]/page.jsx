// "use client";

// import { useParams } from "next/navigation";
// import React from "react";

// const SlugDynamicPage = () => {
//   const params = useParams();

//   const { category, section, subsection, slug } = params;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Dynamic Page</h1>
//       <p><strong>Category:</strong> {category}</p>
//       <p><strong>Section:</strong> {section}</p>
//       <p><strong>Subsection:</strong> {subsection}</p>
//       <p><strong>Slug:</strong> {slug}</p>
//     </div>
//   );
// };

// export default SlugDynamicPage;
"use client";

import { fetcher } from "@/src/components/fetcher";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import '../../../../latest-jobs/latest-job.scss';
import '../../../../latest-jobs/ViewJobs.css';
import { useRouter } from "next/navigation";
import Loader from "@/src/components/Loader/Loader";

const SlugDynamicPage = () => {
    const params = useParams();

    const { category, section, subsection, slug } = params;
    const [jobs, setJobs] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetcher(`/naukari?category=${category}&section=${section}&sub_section=${subsection}&slug=${slug}`);
            setJobs(res?.data.length === 1 ? res?.data[0] : {});
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}><Loader size={50} /></div>

    return (
        <div className="admin-card-container">
 
            {jobs.title}

        </div>
    );
};

export default SlugDynamicPage;
