import React, { useCallback, useEffect, useState } from "react";
import { Filters } from "./Filters/Filters";
import { getJobs } from "../../services/careerApi";
import { JobList } from "./JobList/JobList";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = useCallback(async (filters) => {
    setIsLoading(true);
    setError(null);

    try {
      const jobs = await getJobs(filters);
      setJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFilterChange({
      min: 50000,
      max: 100000,
    });
  }, [handleFilterChange]);

  return (
    <div className="w-full mx-auto px-4">
      <Filters onFilterChange={handleFilterChange} />

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading jobs...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!isLoading && !error && <JobList jobs={jobs} />}
    </div>
  );
};

export default HomePage;
