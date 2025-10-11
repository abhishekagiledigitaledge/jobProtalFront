import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:5500/api";

export const fetcher = async (endpoint, options = {}) => {
  try {
    const token = Cookies.get("job_portal");

    const res = await fetch(API_BASE_URL + endpoint, {
      ...options,
      headers: {
        // "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
