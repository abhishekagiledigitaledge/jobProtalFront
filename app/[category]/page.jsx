// import { fetcher } from "@/src/components/fetcher";
// import '../latest-jobs/latest-job.scss';
// import '../latest-jobs/ViewJobs.css';
// import Loader from "@/src/components/Loader/Loader";
// import Link from "next/link";
// import Head from "next/head";

// const limit = 10;

// export default async function CategoryDynamicPage({ params, searchParams }) {
//   const { category } = params;
//   const page = Number(searchParams.page) || 1;

//   let res = null;
//   try {
//     res = await fetcher(`/naukari?page=${page}&limit=${limit}&section=${category}`, {
//       next: { revalidate: 60 },
//     });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//   }

//   const jobs = res?.data || [];
//   const totalPages = res?.pagination?.totalPages || 1;

//   let json = null;
//   try {
//     json = await fetcher(`/section?section=${category}`, {
//       next: { revalidate: 60 },
//     });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//   }

//   const seoData = json?.data[0] || [];

//   const seo_title = seoData?.seo_title || "Default Title";
//   const seo_description = seoData?.seo_description || "Default Description";
//   const seo_keywords = seoData?.seo_keywords || "jobs, government jobs, india jobs";

//   if (!res) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "50vh",
//         }}
//       >
//         <Loader size={50} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{seo_title}</title>
//         <meta name="description" content={seo_description} />
//         <meta name="keywords" content={seo_keywords} />
//         <meta property="og:title" content={seo_title} />
//         <meta property="og:description" content={seo_description} />
//       </Head>

//       <div className="admin-card-container">
//         <h1 className="heading">Category Jobs</h1>

//         <p className="text">
//           Welcome to <strong>Sarkari Result.</strong> Stay informed about the
//           Admit Card of various competitive exams conducted by government bodies
//           across India. We update the Admit Card section regularly to keep you
//           informed. <a href="#">Let’s update.</a>
//         </p>

//         <p className="text">
//           <strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी
//           निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के एडमिट कार्ड के
//           बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या
//           किसी अन्य सरकारी परीक्षा के एडमिट कार्ड का इंतजार कर रहे हों, तो हम
//           आपको सूचित रखने के लिए समय-समय पर अपडेट करते हैं।
//         </p>

//         <h2>
//           All Latest <span className="highlight">Jobs</span>
//         </h2>

//         <div className="jobs-list">
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <Link
//                 key={job.naukari_id}
//                 href={`/${job.seo_section}/${job.slug}`}
//                 className="job-title"
//               >
//                 {job.title}
//               </Link>
//             ))
//           ) : (
//             <p className="no-jobs">No jobs available.</p>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="pagination">
//             {page > 1 && (
//               <Link href={`/${category}?page=${page - 1}`}>
//                 <button>Prev</button>
//               </Link>
//             )}
//             <span className="page-info">
//               Page {page} of {totalPages}
//             </span>
//             {page < totalPages && (
//               <Link href={`/${category}?page=${page + 1}`}>
//                 <button>Next</button>
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import { fetcher } from "@/src/components/fetcher";
import "../latest-jobs/latest-job.scss";
import "../latest-jobs/ViewJobs.css";
import Loader from "@/src/components/Loader/Loader";
import Link from "next/link";
import Head from "next/head";

const limit = 10;

export default async function CategoryDynamicPage({ params, searchParams }) {
  const { category } = params;
  const page = Number(searchParams.page) || 1;

  // ✅ Fetch Jobs by Category
  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&section=${category}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  // ✅ Fetch SEO Metadata
  let json = null;
  try {
    json = await fetcher(`/section?section=${category}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Error fetching category SEO:", error);
  }

  const seoData = json?.data?.[0] || {};
  const seo_title =
    seoData?.seo_title || `${category?.toUpperCase()} – Latest Government Jobs 2025`;
  const seo_description =
    seoData?.seo_description ||
    `Explore all latest ${category} job updates, government vacancies, admit cards, and results. Stay informed with accurate and timely Sarkari updates from India.`;
  const seo_keywords =
    seoData?.seo_keywords ||
    `${category}, government jobs, sarkari result, sarkari naukri, admit card, result 2025`;

  const pageUrl = `https://jobportalapp.agileappdemo.com/${category}`;

  if (!res) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* ✅ Basic SEO */}
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="keywords" content={seo_keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Sarkari Result Team" />
        <meta name="language" content="English" />

        {/* ✅ Canonical */}
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://jobportalapp.agileappdemo.com/og-image.jpg"
        />
        <meta property="og:site_name" content="Job Portal App" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo_title} />
        <meta name="twitter:description" content={seo_description} />
        <meta
          name="twitter:image"
          content="https://jobportalapp.agileappdemo.com/og-image.jpg"
        />

        {/* ✅ Structured Data: Breadcrumb + JobPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://jobportalapp.agileappdemo.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: category,
                    item: pageUrl,
                  },
                ],
              },
              ...jobs.slice(0, 5).map((job, i) => ({
                "@context": "https://schema.org",
                "@type": "JobPosting",
                title: job.title,
                description: job.title,
                datePosted: job.createdAt || "2025-01-01",
                validThrough: "2025-12-31",
                employmentType: "FULL_TIME",
                hiringOrganization: {
                  "@type": "Organization",
                  name: "Government of India",
                  sameAs: "https://www.india.gov.in/",
                },
                jobLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "IN",
                  },
                },
                identifier: {
                  "@type": "PropertyValue",
                  name: "Job Portal App",
                  value: job.naukari_id,
                },
                url: `https://jobportalapp.agileappdemo.com/${job.seo_section}/${job.slug}`,
              })),
            ]),
          }}
        />
      </Head>

      <div className="admin-card-container">
        <h1 className="heading">
          {category?.toUpperCase()} – Latest Government Jobs
        </h1>

        <p className="text">
          Welcome to <strong>Sarkari Result</strong> – your trusted portal for
          all updates related to {category} jobs, admit cards, and results.
          Check the latest openings, download admit cards, and view results in
          one place. <a href="#">Stay Updated.</a>
        </p>

        <p className="text">
          <strong>Sarkari Result</strong> में आपका स्वागत है। यहां पर आप{" "}
          <strong>{category}</strong> की नवीनतम सरकारी नौकरियों, प्रवेश पत्रों और
          परिणामों की जानकारी प्राप्त कर सकते हैं।
        </p>

        <h2>
          Latest <span className="highlight">{category}</span> Jobs
        </h2>

        <div className="jobs-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Link
                key={job.naukari_id}
                href={`/${job.seo_section}/${job.slug}`}
                className="job-title"
              >
                {job.title}
              </Link>
            ))
          ) : (
            <p className="no-jobs">No jobs available.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && (
              <Link href={`/${category}?page=${page - 1}`}>
                <button>Prev</button>
              </Link>
            )}
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/${category}?page=${page + 1}`}>
                <button>Next</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
