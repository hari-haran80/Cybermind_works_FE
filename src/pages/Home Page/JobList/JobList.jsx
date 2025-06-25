import React from "react";

export const JobList = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No jobs found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.job_title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {job.job_type}
              </span>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              {job.location}
            </div>
            
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-900">
                ₹{job.min_monthly_salary?.toLocaleString()} - ₹{job.max_monthly_salary?.toLocaleString()}/mo
              </span>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Description:</h4>
              <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                {job.job_description?.slice(0, 3).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {job.time_ago}
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};