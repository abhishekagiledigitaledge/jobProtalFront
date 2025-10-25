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
