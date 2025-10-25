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
    console.error("Error fetching home text:", error);
  }
  return null;
}

export default async function Home() {
  const homeData = await getHomeTextData();
  const homeLinks = await getHomeLinksData() || jobChipList;

  const heading1 = homeData?.heading1 || "Welcome to No. 1";
  const heading2 = homeData?.heading2 || "Education Portal Sarkari Result 2025";

  const seo_title = homeData?.seo_title || "Default Title";
  const seo_description = homeData?.seo_description || "Default Description";
  const seo_keywords = homeData?.seo_keywords || "jobs, government jobs, india jobs";

  return (
    <>
      <Head>
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="keywords" content={seo_keywords} />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
      </Head>

      <div className="container">
        <div className="main_heagin_wrapp">
          <h2>
            <span>{heading1}</span> <br />
            {heading2}
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
