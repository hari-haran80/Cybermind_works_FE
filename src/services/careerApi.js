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
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => 
        value !== "" && value !== null && value !== undefined
      )
    );
    
    const response = await api.get("/career/jobs/", { params });
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

// get job Locations
export const getJobLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/career/jobs/locations/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job locations:", error);
    throw error;
  }
};

// get Job Titles
export const getJobTitles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/career/jobs/titles/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job titles:", error);
    throw error;
  }
};
