// import { fetcher } from '@/src/components/fetcher';
// import './admit-cards.scss';
// import '../latest-jobs/ViewJobs.css';
// import Link from 'next/link';

// const limit = 10;

// export default async function AdmitCards({ searchParams }) {
//   const page = Number(searchParams?.page) || 1;

//   // ✅ Server-side fetch
//   let res = null;
//   try {
//     res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=admit_card`, {
//       next: { revalidate: 120 },
//     });
//   } catch (error) {
//     console.error("Error fetching admit cards:", error);
//   }

//   const jobs = res?.data || [];
//   const totalPages = res?.pagination?.totalPages || 1;

//   if (!res || jobs.length === 0) {
//     return (
//       <div className="admin-card-container">
//         <h1 className="heading">Admit Card</h1>
//         <p className="no-jobs">No admit cards available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-card-container">
//       <h1 className="heading">Admit Card</h1>
//       <p className='text'>
//         Welcome to <strong>Sarkari Result.</strong> Stay informed about the admit card of various competitive exams conducted by government bodies across India. We update admit cards regularly to keep you informed. <a href="#">Let’s update.</a>
//       </p>
//       <p className="text">
//         <strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के परिणाम के बारे में सूचित रहें। 
//       </p>

//       <h2>All Latest <span className="highlight">Admit Card</span></h2>

//       <div className="jobs-list">
//         {jobs.map((job) => (
//           <Link
//             key={job.naukari_id}
//             href={`/${job.seo_section}/${job.slug}`}
//             className="job-title"
//           >
//             {job.title}
//           </Link>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           {page > 1 && (
//             <Link href={`?page=${page - 1}`}>
//               <button>Prev</button>
//             </Link>
//           )}
//           <span className="page-info">Page {page} of {totalPages}</span>
//           {page < totalPages && (
//             <Link href={`?page=${page + 1}`}>
//               <button>Next</button>
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import { fetcher } from "@/src/components/fetcher";
import "./admit-cards.scss";
import "../latest-jobs/ViewJobs.css";
import Link from "next/link";

const limit = 10;

// ✅ SEO Metadata
export const metadata = {
  title: "Sarkari Result 2025 | Latest Admit Card, Exam Hall Tickets & Call Letters",
  description:
    "Download all Sarkari Result 2025 Admit Cards, Hall Tickets, and Call Letters for government exams like SSC, UPSC, Railway, Police, Defence, Bank, and State Exams. Updated daily.",
  keywords:
    "Sarkari Result, Admit Card 2025, Sarkari Admit Card, Govt Exam Admit Card, Hall Ticket, Sarkari Naukri Admit Card, SSC Admit Card, UPSC Admit Card, Bank Admit Card, Railway Admit Card",
  openGraph: {
    title: "Sarkari Result 2025 - Latest Admit Cards & Hall Tickets",
    description:
      "Check and download all Sarkari Result Admit Cards 2025 for SSC, UPSC, Police, Bank, and Railway exams. Get your government exam hall tickets updated daily.",
    url: "https://jobportalapp.agileappdemo.com/admit-card",
    type: "website",
  },
  alternates: {
    canonical: "https://jobportalapp.agileappdemo.com/admit-card",
  },
};

export default async function AdmitCards({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=admit_card`, {
      next: { revalidate: 120 },
    });
  } catch (error) {
    console.error("Error fetching admit cards:", error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res || jobs.length === 0) {
    return (
      <main className="admin-card-container">
        <h1 className="heading">Sarkari Result 2025 – Admit Card</h1>
        <p className="no-jobs">No admit cards available at the moment.</p>
      </main>
    );
  }

  return (
    <main className="admin-card-container">
      <h1 className="heading">Sarkari Result 2025 – Latest Admit Card Updates</h1>

      <section className="intro">
        <p className="text">
          Welcome to <strong>Sarkari Result</strong> – your trusted source for all{" "}
          <strong>Government Exam Admit Cards</strong> in India. Download the latest{" "}
          <strong>Admit Cards, Hall Tickets, and Call Letters</strong> for exams
          like <strong>SSC, UPSC, Railway, Police, Defence, Banking, and State-level exams</strong>.
          We update every new admit card daily to keep you informed.
        </p>

        <p className="text">
          <strong>Sarkari Result</strong> में आपका स्वागत है। यहां आपको भारत की सभी{" "}
          <strong>सरकारी परीक्षाओं के एडमिट कार्ड</strong> की जानकारी मिलेगी — जैसे SSC, UPSC,
          रेलवे, बैंक, पुलिस, सेना और राज्य सरकार की परीक्षाओं के एडमिट कार्ड। सभी नए एडमिट कार्ड
          यहां रोजाना अपडेट किए जाते हैं।
        </p>
      </section>

      <h2>All Latest <span className="highlight">Admit Cards 2025</span></h2>

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
              className="job-title"
              itemProp="url"
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
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`?page=${page + 1}`} prefetch>
              <button>Next</button>
            </Link>
          )}
        </nav>
      )}

      {/* ✅ Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sarkari Result 2025 - Admit Cards and Hall Tickets",
            description:
              "Find and download all Sarkari Result Admit Cards 2025 for SSC, UPSC, Railway, Police, and Bank exams. Daily updates of government exam hall tickets.",
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
