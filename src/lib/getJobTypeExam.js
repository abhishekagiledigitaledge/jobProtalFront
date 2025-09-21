import axios from "axios";

// src/lib/getExamDetails.js
export async function getJobTypeExam(type) {
  try {
    const res = await axios.get(
      `http://localhost:1337/api/exam-details?filters[job_type][$contains]=${type}`,
      {
        headers: {
          Authorization: `Bearer a290ea827a01bd3dd11479ef58a3c5dd814cb3caf28ad25e967bb41289d5f639ca4761fc02909d62a0845f4760873a1a932877f6c17104c95b8170dc118d4c0e7416ca128e874b5a166d53c1d57aa302c1a66be633b2c61836bcac594304ef567d3b89331d28958478a2f6451c1e251aa2c3e4598c929c55cca8850c6b9f896e`,
        },
        cache: "no-store",
      }
    );

    const json = await res.data;
    return json?.data || null;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}
