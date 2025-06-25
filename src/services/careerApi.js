import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get Jobs with Filters
export const getJobs = async (filters = {}) => {
  try {
    const response = await api.get("/career/jobs/", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Create a New Job
export const createJob = async (jobData) => {
  try {
    const response = await api.post("/career/jobs/create/", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error.response?.data || error.message);
    throw error;
  }
};

// Get Salary Range
export const getSalaryRange = async () => {
  try {
    const response = await api.get("/career/jobs/salary-range/");
    return response.data;
  } catch (error) {
    console.error("Error fetching salary range:", error);
    throw error;
  }
};
