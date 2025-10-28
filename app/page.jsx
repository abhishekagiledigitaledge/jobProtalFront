// import AdsCard from "@/src/components/AdsCard";
// import JobsChip from "@/src/components/JobsChip";
// import { jobChipList } from "@/src/utils/constants";
// import JobTypeCard from "@/src/components/JobTypeCard";
// import NewJobCard from "@/src/components/NewJobCard";
// import JobsAdmitResultSection from "@/src/components/Jobs/JobsAdmitResultSection";
// import RecentJobCard from "@/src/components/RecentJobCard";
// import Head from "next/head";
// import { fetcher } from "@/src/components/fetcher";

// async function getHomeTextData() {
//   try {
//     const json = await fetcher("/home/text", {
//       next: { revalidate: 120 },
//     });
//     if (json?.success && json?.data?.length > 0) {
//       return json.data[0];
//     }
//   } catch (error) {
//     console.error("Error fetching home text:", error);
//   }
//   return null;
// }

// async function getHomeLinksData() {
//   try {
//     const json = await fetcher("/home/links?page=1&limit=6", {
//       next: { revalidate: 120 },
//     });
//     if (json?.success && json?.data?.length > 0) {
//       return json.data;
//     }
//   } catch (error) {
//     console.error("Error fetching home text:", error);
//   }
//   return null;
// }

// export default async function Home() {
//   const homeData = await getHomeTextData();
//   const homeLinks = await getHomeLinksData() || jobChipList;

//   const heading1 = homeData?.heading1 || "Welcome to No. 1";
//   const heading2 = homeData?.heading2 || "Education Portal Sarkari Result 2025";

//   const seo_title = homeData?.seo_title || "Default Title";
//   const seo_description = homeData?.seo_description || "Default Description";
//   const seo_keywords = homeData?.seo_keywords || "jobs, government jobs, india jobs";

//   return (
//     <>
//       <Head>
//         <title>{seo_title}</title>
//         <meta name="description" content={seo_description} />
//         <meta name="keywords" content={seo_keywords} />
//         <meta property="og:title" content={seo_title} />
//         <meta property="og:description" content={seo_description} />
//       </Head>

//       <div className="container">
//         <div className="main_heagin_wrapp">
//           <h2>
//             <span>{heading1}</span> <br />
//             {heading2}
//           </h2>
//         </div>

//         <div className="chipMainWrapp">
//           {homeLinks?.map((item, index) => (
//             <JobsChip key={index} title={item.display_name} url={item.url} />
//           ))}
//         </div>

//         <div className="ads_banner_wrapp">
//           <AdsCard />
//         </div>

//         <RecentJobCard />
//         <JobTypeCard />
//         <JobsAdmitResultSection />

//         <div className="ads_banner_wrapp">
//           <AdsCard />
//         </div>

//         <NewJobCard />

//         <div className="ads_banner_wrapp">
//           <AdsCard imgUrl={"img/add_icon2.png"} />
//         </div>
//       </div>
//     </>
//   );
// }
import AdsCard from "@/src/components/AdsCard";
import JobsChip from "@/src/components/JobsChip";
import { jobChipList } from "@/src/utils/constants";
import JobTypeCard from "@/src/components/JobTypeCard";
import NewJobCard from "@/src/components/NewJobCard";
import JobsAdmitResultSection from "@/src/components/Jobs/JobsAdmitResultSection";
import RecentJobCard from "@/src/components/RecentJobCard";
import Head from "next/head";
import { fetcher } from "@/src/components/fetcher";

async function getHomeTextData() {
  try {
    const json = await fetcher("/home/text", {
      next: { revalidate: 120 },
    });
    if (json?.success && json?.data?.length > 0) {
      return json.data[0];
    }
  } catch (error) {
    console.error("Error fetching home text:", error);
  }
  return null;
}

async function getHomeLinksData() {
  try {
    const json = await fetcher("/home/links?page=1&limit=6", {
      next: { revalidate: 120 },
    });
    if (json?.success && json?.data?.length > 0) {
      return json.data;
    }
  } catch (error) {
    console.error("Error fetching home links:", error);
  }
  return null;
}

export default async function Home() {
  const homeData = await getHomeTextData();
  const homeLinks = (await getHomeLinksData()) || jobChipList;

  const heading1 = homeData?.heading1 || "Welcome to No. 1";
  const heading2 = homeData?.heading2 || " ";

  const seo_title =
    homeData?.seo_title ||
    "Sarkari Result 2025 – Latest Govt Jobs, Admit Cards & Results";
  const seo_description =
    homeData?.seo_description ||
    "Sarkari Result 2025 provides all the latest government job notifications, admit cards, results, and exam updates in India. Stay updated with the most accurate Sarkari information.";
  const seo_keywords =
    homeData?.seo_keywords ||
    "sarkari result, government jobs, sarkari exam, admit card, result 2025, naukari, rojgar, sarkari naukri";

  return (
    <>
      <Head>
        {/* ✅ Basic SEO */}
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="keywords" content={seo_keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Sarkari Result Team" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://jobportalapp.agileappdemo.com/" />

        {/* ✅ Open Graph (Facebook / LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:url" content="https://jobportalapp.agileappdemo.com/" />
        <meta property="og:site_name" content="Sarkari Result 2025" />
        <meta
          property="og:image"
          content="https://jobportalapp.agileappdemo.com/img/og-image.jpg"
        />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo_title} />
        <meta name="twitter:description" content={seo_description} />
        <meta
          name="twitter:image"
          content="https://jobportalapp.agileappdemo.com/img/og-image.jpg"
        />

        {/* ✅ Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sarkari Result 2025",
              url: "https://jobportalapp.agileappdemo.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://jobportalapp.agileappdemo.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div className="container">
        <div className="main_heagin_wrapp">
          <h2>
            <span>{heading1}</span> <br />
            Education Portal  <span>Sarkari Result 2025</span>
          </h2>
        </div>

        <div className="chipMainWrapp">
          {homeLinks?.map((item, index) => (
            <JobsChip key={index} title={item.display_name} url={item.url} />
          ))}
        </div>

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <RecentJobCard />
        <JobTypeCard />
        <JobsAdmitResultSection />

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <NewJobCard />

        <div className="ads_banner_wrapp">
          <AdsCard imgUrl={"img/add_icon2.png"} />
        </div>
      </div>
    </>
  );
}

