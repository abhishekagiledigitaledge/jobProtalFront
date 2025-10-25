import { fetcher } from "@/src/components/fetcher";
import './SlugDynamicPage.css';
import Head from "next/head";

export default async function SlugDynamicPage({ params }) {
  const { category, slug } = params;

  // Server-side fetch
  let job = null;
  try {
    const res = await fetcher(`/naukari?section=${category}&slug=${slug}`, {
      cache: "no-store",
    });
    job = res?.data?.length === 1 ? res.data[0] : null;
  } catch (error) {
    console.error("Error fetching job:", error);
  }

  const seo_title = job?.seo_title || "Default Title";
  const seo_description = job?.seo_description || "Default Description";
  const seo_keywords = job?.seo_keywords || "jobs, government jobs, india jobs";

  if (!job) {
    return (
      <div className="view-naukari-error">
        <h3>No Data Found</h3>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="keywords" content={seo_keywords} />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
      </Head>

      <div className="view-naukari-container">
        {/* Header */}
        <div className="naukari-header">
          <h1 className="naukari-title">{job.title}</h1>
          <p className="naukari-date">
            Published On: {new Date(job.postDate).toLocaleDateString("en-IN")}
          </p>
        </div>

        {/* Description */}
        <div
          className="naukari-description"
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></div>

        {/* Useful Links */}
        {job.usefulLinks?.length > 0 && (
          <div className="useful-links-section">
            <h2 className="useful-links-header">Some Useful Important Links</h2>
            <table className="useful-links-table">
              <tbody>
                {job.usefulLinks.map((group, i) => (
                  <tr key={i}>
                    <td className="link-label">{group.text}</td>
                    <td className="link-url">
                      {group.links.map((link, j) => (
                        <span key={link.id}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.display_name}
                          </a>
                          {j < group.links.length - 1 && <span className="link-separator"> | </span>}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FAQ Section */}
        {job.importantQuesAns?.length > 0 && (
          <div className="faq-section">
            <h2>Important Questions and Answers</h2>
            {job.importantQuesAns.map((qa) => (
              <div className="faq-item" key={qa.id}>
                <h4>Q: {qa.question}</h4>
                <p>A: {qa.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Discover More */}
        {job.discoverMoreLinks?.length > 0 && (
          <div className="discover-section">
            <h2>Discover More</h2>
            <div className="discover-grid">
              {job.discoverMoreLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="discover-card"
                >
                  {link.display_name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
