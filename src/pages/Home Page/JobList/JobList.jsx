import React from "react";
import AmazonIcon from "../../../assets/images/homepage/amazon.png";
import TeslaIcon from "../../../assets/images/homepage/Tesla.png";
import SwiggyIcon from "../../../assets/images/homepage/swiggy.png";
import DefaultIcon from "../../../assets/images/homepage/Logo.png";
import { BiUserPlus } from "react-icons/bi";
import { RiBuildingLine } from "react-icons/ri";
import { RxLayers } from "react-icons/rx";

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
    <div className="w-full flex flex-wrap justify-evenly gap-6 p-4 mt-6">
      {jobs.map((job) => {
        const companyLogo = () => {
          const name = job.company_name.toLowerCase();
          if (name.includes("amazon")) return AmazonIcon;
          if (name.includes("tesla")) return TeslaIcon;
          if (name.includes("swiggy")) return SwiggyIcon;
          return DefaultIcon;
        };

        const annualSalary = job.max_monthly_salary 
          ? Math.round((job.max_monthly_salary * 12) / 100000) 
          : "N/A";

        return (
          <div
            key={job.id}
            className="w-[315px] h-[360px] bg-white rounded-lg overflow-hidden shadow-lg transition-shadow p-4"
          >
            <div className="flex items-center justify-between w-full h-[83px]">
              <div className="w-[50%]">
                <div className="w-[83px] h-[83px] bg-gradient-to-b from-white to-gray-200 border-2 border-white rounded-xl shadow-md shadow-gray-300 flex items-center justify-center">
                  <img 
                    src={companyLogo()} 
                    alt={job.company_name} 
                    className="w-[65px] h-[65px] object-contain" 
                  />
                </div>
              </div>
              <div className="w-[50%] h-[83px]">
                <div className="flex items-start justify-end h-full">
                  <p className="bg-[#B0D9FF] text-black px-3 py-1 rounded-lg text-[14px]">
                    {job.time_ago}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-[700] text-[20px]">{job.job_title}</h1>
            </div>
            <div className="flex items-center justify-between mt-4 text-gray-600">
              <div className="flex gap-2 items-center justify-center">
                <span>
                  <BiUserPlus className="text-[20px]" />
                </span>
                <span className="font-[500] text-[16px]">{job.experience}</span>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <span>
                  <RiBuildingLine className="text-[20px]" />
                </span>
                <span className="font-[500] text-[16px]">Onsite</span>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <span>
                  <RxLayers className="text-[20px]" />
                </span>
                <span className="font-[500] text-[16px]">
                  {annualSalary}LPA
                </span>
              </div>
            </div>
            <div className="mt-2 p-3">
              <ul className="list-disc text-[14px] font-[500] text-justify text-gray-600">
                {job.job_description.slice(0, 2).map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className="w-full mt-2">
              <button className="bg-[#00AAFF] w-full text-[16px] font-[600] text-white rounded-lg p-2">
                Apply Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};