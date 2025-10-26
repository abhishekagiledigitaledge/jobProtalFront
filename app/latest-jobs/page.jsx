// import { fetcher } from "@/src/components/fetcher";
// import './ViewJobs.css';
// import './latest-job.scss';
// import Link from "next/link";

// const limit = 10;

// export default async function ViewJobs({ searchParams }) {
//     const page = Number(searchParams?.page) || 1;

//     // ✅ Server-side fetch
//     let res = null;
//     try {
//         res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=jobs`, {
//             cache: "no-store", // disables caching for fresh data
//         });
//     } catch (error) {
//         console.error("Error fetching jobs:", error);
//     }

//     const jobs = res?.data || [];
//     const totalPages = res?.pagination?.totalPages || 1;

//     if (!res || jobs.length === 0) {
//         return (
//             <div className="admin-card-container">
//                 <h1 className="heading">Latest Jobs</h1>
//                 <p className="no-jobs">No jobs available.</p>
//             </div>
//         );
//     }

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
//                 {jobs.map((job) => (
//                     <Link
//                         key={job.naukari_id}
//                         href={`/${job.seo_section}/${job.slug}`}
//                         className="job-title"
//                     >
//                         {job.title}
//                     </Link>
//                 ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <div className="pagination">
//                     {page > 1 && (
//                         <Link href={`?page=${page - 1}`}>
//                             <button>Prev</button>
//                         </Link>
//                     )}
//                     <span className="page-info">Page {page} of {totalPages}</span>
//                     {page < totalPages && (
//                         <Link href={`?page=${page + 1}`}>
//                             <button>Next</button>
//                         </Link>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }
import { fetcher } from "@/src/components/fetcher";
import './ViewJobs.css';
import './latest-job.scss';
import Link from "next/link";

const limit = 10;

export const metadata = {
  title: "Sarkari Result 2025 | Latest Government Jobs & Vacancies Today",
  description:
    "Check all Latest Sarkari Result 2025 Government Jobs, SSC, UPSC, Railway, Police, Defence, Bank, and State Jobs. Get the latest govt job notifications updated daily.",
  keywords:
    "Sarkari Result, Sarkari Naukri, Latest Government Jobs 2025, Govt Jobs 2025, Sarkari Exam, Sarkari Vacancy, Police Jobs, Railway Jobs, Bank Jobs, SSC, UPSC",
  openGraph: {
    title: "Sarkari Result 2025 - Latest Government Jobs & Sarkari Naukri Updates",
    description:
      "Get Sarkari Result 2025 latest government job updates — SSC, UPSC, Bank, Railway, and State Vacancies. Find Sarkari Naukri notifications updated daily.",
    url: "https://jobportalapp.agileappdemo.com/latest-jobs",
    type: "website",
  },
  alternates: {
    canonical: "https://jobportalapp.agileappdemo.com/latest-jobs",
  },
};

export default async function ViewJobs({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=jobs`, {
      next: { revalidate: 120 },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res || jobs.length === 0) {
    return (
      <main className="admin-card-container">
        <h1 className="heading">Latest Sarkari Jobs 2025</h1>
        <p className="no-jobs">No jobs available at the moment.</p>
      </main>
    );
  }

  return (
    <main className="admin-card-container">
      <h1 className="heading">Sarkari Result 2025 – Latest Government Jobs & Vacancies</h1>

      <section className="intro">
        <p className="text">
          Welcome to <strong>Sarkari Result</strong> – your trusted source for all
          <strong> latest government job updates</strong> in India. Explore opportunities from
          <strong> SSC, UPSC, Railway, Bank, Defence, Police, and State Government</strong> sectors.
          We update this page daily to keep you informed about new openings, eligibility, and last dates.
        </p>

        <p className="text">
          <strong>Sarkari Result</strong> में आपका स्वागत है। यहां आपको भारत भर की सभी
          <strong> सरकारी नौकरियों </strong>की जानकारी मिलेगी — SSC, UPSC, बैंक, रेलवे, पुलिस
          और राज्य सरकार की नौकरियों से जुड़ी सभी वैकेंसी की नवीनतम जानकारी यहां रोज़ अपडेट की जाती है।
        </p>
      </section>

      <h2>All Latest <span className="highlight">Government Jobs 2025</span></h2>

      <section className="jobs-list" itemScope itemType="https://schema.org/ItemList">
        {jobs.map((job, index) => (
          <article
            key={job.naukari_id}
            className="job-item"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={String(index + 1)} />
            <Link
              href={`/${job.seo_section}/${job.slug}`}
              itemProp="url"
              className="job-title"
            >
              <span itemProp="name">{job.title}</span>
            </Link>
          </article>
        ))}
      </section>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          {page > 1 && (
            <Link href={`?page=${page - 1}`} prefetch>
              <button>Previous</button>
            </Link>
          )}
          <span className="page-info">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`?page=${page + 1}`} prefetch>
              <button>Next</button>
            </Link>
          )}
        </nav>
      )}

      {/* ✅ JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sarkari Result 2025 - Latest Government Jobs",
            description:
              "Explore all Sarkari Result 2025 latest government jobs including SSC, UPSC, Police, Bank, Railway, and Defence job updates.",
            itemListElement: jobs.map((job, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: job.title,
              url: `https://jobportalapp.agileappdemo.com/${job.seo_section}/${job.slug}`,
            })),
          }),
        }}
      />
    </main>
  );
}
