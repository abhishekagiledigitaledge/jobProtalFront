import AdsCard from "@/src/components/AdsCard";
import JobsChip from "@/src/components/JobsChip";
import { jobChipList } from "@/src/utils/constants";
import JobTypeCard from "@/src/components/JobTypeCard";
import NewJobCard from "@/src/components/NewJobCard";
import JobsAdmitResultSection from "@/src/components/Jobs/JobsAdmitResultSection";
import RecentJobCard from "@/src/components/RecentJobCard";
import { fetcher } from "@/src/components/fetcher";

// ✅ Dynamic metadata function
export async function generateMetadata() {
  try {
    const json = await fetcher("/home/text", { next: { revalidate: 120 } });
    const data = json?.success && json?.data?.length > 0 ? json.data[0] : null;

    const seo_title =
      data?.seo_title ||
      "Sarkari Result 2025 – Latest Govt Jobs, Admit Cards & Results";
    const seo_description =
      data?.seo_description ||
      "Sarkari Result 2025 provides all the latest government job notifications, admit cards, results, and exam updates in India.";
    const seo_keywords =
      data?.seo_keywords ||
      "sarkari result, government jobs, sarkari exam, admit card, result 2025, naukari, rojgar, sarkari naukri";

    return {
      title: seo_title,
      description: seo_description,
      keywords: seo_keywords,
      alternates: {
        canonical: "https://jobportalapp.agileappdemo.com/",
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
      openGraph: {
        title: seo_title,
        description: seo_description,
        url: "https://jobportalapp.agileappdemo.com/",
        siteName: "Sarkari Result 2025",
        images: [
          {
            url: "https://jobportalapp.agileappdemo.com/img/og-image.jpg",
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo_title,
        description: seo_description,
        images: ["https://jobportalapp.agileappdemo.com/img/og-image.jpg"],
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Sarkari Result 2025 – Govt Jobs, Admit Cards & Results",
      description:
        "Get all the latest government job updates, admit cards, and results in one place.",
    };
  }
}

export default async function Home() {
  const homeData = await fetcher("/home/text", { next: { revalidate: 120 } });
  const data = homeData?.success && homeData?.data?.length > 0 ? homeData.data[0] : null;
  const homeLinks = (await fetcher("/home/links?page=1&limit=3"))?.data || jobChipList;

  const heading1 = data?.heading1 || "Welcome to No. 1";
  const heading2 = data?.heading2 || " ";

  return (
    <div className="container">
      <div className="main_heagin_wrapp">
        <h2>
          <span>{heading1}</span> <br />
          Education Portal <span>Sarkari Result 2025</span>
        </h2>
      </div>
      <h1></h1>

      <div className="chipMainWrapp">
        {homeLinks?.map((item, index) => (
          <JobsChip key={index} title={item.display_name} url={item.url} />
        ))}
      </div>

      <JobTypeCard />
      <JobsAdmitResultSection />
      <RecentJobCard />
      <NewJobCard />
    </div>
  );
}
