import { useEffect, useState } from "react";
import { getJobLocations, getJobTitles, getSalaryRange } from "../../../services/careerApi";
import { TitleSearchFilter } from "./TitleSearchFilter/TitleSearchFilter";
import { LocationFilter } from "./LocationFilter/LocationFilter";
import { JobTypeFilter } from "./JobTypeFilter/JobTypeFilter";
import { SalaryRangeFilter } from "./SalaryRangeFilter/SalaryRangeFilter";

export const Filters = ({ onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState({
    job_title: "",
    location: "",
    job_type: "",
    min: null,
    max: null
  });
  
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ 
    min_salary: 50000, 
    max_salary: 100000 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [titles, locs, range] = await Promise.all([
          getJobTitles(),
          getJobLocations(),
          getSalaryRange()
        ]);
        
        setJobTitles(titles);
        setLocations(locs);
        setSalaryRange(range);
        
        setFilters(prev => ({
          ...prev,
          min: range.min_salary,
          max: range.max_salary
        }));
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (filters.min === null || filters.max === null) return;
    
    const handler = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(handler);
  }, [filters, onFilterChange]);

  const handleTitleSelect = (title) => {
    setFilters(prev => ({ ...prev, job_title: title }));
  };

  const handleLocationSelect = (location) => {
    setFilters(prev => ({ ...prev, location }));
  };

  const handleJobTypeSelect = (type) => {
    setFilters(prev => ({ ...prev, job_type: type }));
  };

  const handleMinChange = (min) => {
    setFilters(prev => ({
      ...prev,
      min: Math.min(min, prev.max)
    }));
  };

  const handleMaxChange = (max) => {
    setFilters(prev => ({
      ...prev,
      max: Math.max(max, prev.min)
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full border-b shadow p-4 bg-white">
        <div className="flex justify-center items-center h-24">
          <div className="animate-pulse flex space-x-4">
            <div className="bg-gray-200 h-10 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-10 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-10 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-10 w-1/4 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-b  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
      <div className="w-full gap-6 h-full flex items-center justify-between">
        <div className="w-[25%]">
          <TitleSearchFilter
            jobTitles={jobTitles}
            onSelect={handleTitleSelect}
            value={filters.job_title}
          />
        </div>
        
        <div className="w-[25%]">
          <LocationFilter
            locations={locations}
            onSelect={handleLocationSelect}
            value={filters.location}
          />
        </div>
        
        <div className="w-[25%]">
          <JobTypeFilter
            onSelect={handleJobTypeSelect}
            value={filters.job_type}
          />
        </div>
        
        <div className="w-[25%]">
          <SalaryRangeFilter
            minValue={filters.min}
            maxValue={filters.max}
            minRange={salaryRange.min_salary}
            maxRange={salaryRange.max_salary}
            onMinChange={handleMinChange}
            onMaxChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
};