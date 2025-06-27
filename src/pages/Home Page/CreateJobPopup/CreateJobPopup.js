import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { createJob } from "../../../services/careerApi";
import { toast } from "react-toastify";
import { RiArrowUpDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaAnglesDown, FaAnglesRight } from "react-icons/fa6";

export const CreateJobPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "Chennai",
    job_type: "Internship",
    min_monthly_salary: "",
    max_monthly_salary: "",
    application_deadline: "",
    job_description: "",
    requirements: "something",
    responsibilities: "something",
    experience: "1-3 Yr Exp",
    is_draft: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({ draft: false, publish: false });
  const [dropdowns, setDropdowns] = useState({
    location: false,
    job_type: false,
    experience: false,
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdowns({ location: false, job_type: false, experience: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "min_monthly_salary" || name === "max_monthly_salary") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length > 7) return;
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "job_title",
      "company_name",
      "location",
      "job_type",
      "min_monthly_salary",
      "max_monthly_salary",
      "application_deadline",
      "job_description",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.min_monthly_salary &&
      formData.max_monthly_salary &&
      parseInt(formData.min_monthly_salary) >
        parseInt(formData.max_monthly_salary)
    ) {
      newErrors.max_monthly_salary =
        "Max salary must be greater than min salary";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft) => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const key = isDraft ? "draft" : "publish";
    setLoading((prev) => ({ ...prev, [key]: true }));

    const payload = {
      ...formData,
      is_draft: isDraft,
      min_monthly_salary: parseInt(formData.min_monthly_salary),
      max_monthly_salary: parseInt(formData.max_monthly_salary),
    };

    try {
      await createJob(payload);
      toast.success(isDraft ? "Draft saved!" : "Job published successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Job creation failed:", error);
      toast.error("Job creation failed!");
    } finally {
      setLoading({ draft: false, publish: false });
    }
  };

  const toggleDropdown = (name) => {
    setDropdowns((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === name ? !prev[key] : false;
        return acc;
      }, {})
    );
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setDropdowns((prev) => ({ ...prev, [name]: false }));
  };

  const formatSalaryValue = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const Spinner = ({ color = "black" }) => (
    <svg
      className="animate-spin h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
  );

  return (
    <div className="absolute top-0 left-0 w-full h-[1000px] flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
      <div className="bg-white h-[780px] p-6 rounded-xl shadow-lg w-[90%] max-w-[850px] relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h5 className="text-[24px] font-[700] text-center w-full">
          Create Job Opening
        </h5>

        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1">
            <label
              className={`font-[600] text-[20px] ${
                formData.job_title ? "text-black" : "text-gray-500"
              }`}
            >
              Job Title
            </label>
            <input
              name="job_title"
              type="text"
              value={formData.job_title}
              onChange={handleChange}
              className={`w-[370px] p-3 rounded-md ${
                formData.job_title
                  ? "border border-black"
                  : "border border-gray-500"
              }`}
              placeholder="UI UX Designer"
            />
            {errors.job_title && (
              <span className="text-red-500 text-sm">{errors.job_title}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`font-[600] text-[20px] ${
                formData.company_name ? "text-black" : "text-gray-500"
              }`}
            >
              Company Name
            </label>
            <input
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
              className={`w-[370px] p-3 rounded-md ${
                formData.company_name
                  ? "border border-black"
                  : "border border-gray-500"
              }`}
              placeholder="Amazon, Microsoft, Swiggy"
            />
            {errors.company_name && (
              <span className="text-red-500 text-sm">
                {errors.company_name}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
            <label
              className={`font-[600] text-[20px] ${
                formData.location ? "text-black" : "text-gray-500"
              }`}
            >
              Location
            </label>
            <div
              className={`w-[370px] p-3 rounded-md cursor-pointer flex justify-between items-center
                ${
                  formData.location
                    ? "border border-black"
                    : "border border-gray-500"
                }`}
              onClick={() => toggleDropdown("location")}
            >
              <span>{formData.location}</span>
              <motion.span
                animate={{ rotate: dropdowns.location ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {dropdowns.location ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </motion.span>
            </div>

            <AnimatePresence>
              {dropdowns.location && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                  {["Chennai", "Madurai", "Coimbatore"].map((loc) => (
                    <div
                      key={loc}
                      className={`p-3 hover:bg-gray-100 cursor-pointer ${
                        formData.location === loc ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleSelect("location", loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {errors.location && (
              <span className="text-red-500 text-sm">{errors.location}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 relative">
            <label
              className={`font-[600] text-[20px] ${
                formData.job_type ? "text-black" : "text-gray-500"
              }`}
            >
              Job Type
            </label>
            <div
              className={`w-[370px] p-3 rounded-md cursor-pointer flex justify-between items-center
                ${
                  formData.job_type
                    ? "border border-black"
                    : "border border-gray-500"
                }`}
              onClick={() => toggleDropdown("job_type")}
            >
              <span>{formData.job_type}</span>
              <motion.span
                animate={{ rotate: dropdowns.job_type ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {dropdowns.job_type ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </motion.span>
            </div>

            <AnimatePresence>
              {dropdowns.job_type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                  {["Internship", "Full-time", "Part-time", "Contract"].map(
                    (type) => (
                      <div
                        key={type}
                        className={`p-3 hover:bg-gray-100 cursor-pointer ${
                          formData.job_type === type ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleSelect("job_type", type)}
                      >
                        {type}
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {errors.job_type && (
              <span className="text-red-500 text-sm">{errors.job_type}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1">
            <label
              className={`font-[600] text-[20px] ${
                formData.min_monthly_salary || formData.max_monthly_salary
                  ? "text-black"
                  : "text-gray-500"
              }`}
            >
              Salary Range
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <RiArrowUpDownLine className="text-gray-400" />
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  name="min_monthly_salary"
                  type="text"
                  inputMode="numeric"
                  value={formatSalaryValue(formData.min_monthly_salary)}
                  onChange={handleChange}
                  className={`w-[183px] p-3 pl-14 rounded-md ${
                    formData.min_monthly_salary
                      ? "border border-black"
                      : "border border-gray-500"
                  }`}
                  placeholder="0"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <RiArrowUpDownLine className="text-gray-400" />
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  name="max_monthly_salary"
                  type="text"
                  inputMode="numeric"
                  value={formatSalaryValue(formData.max_monthly_salary)}
                  onChange={handleChange}
                  className={`w-[183px] p-3 pl-14 rounded-md ${
                    formData.max_monthly_salary
                      ? "border border-black"
                      : "border border-gray-500"
                  }`}
                  placeholder="12,00,000"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-5 justify-between">
              <div className="text-left w-[50%]">
                {errors.min_monthly_salary && (
                  <span className="text-red-500 text-sm">
                    {errors.min_monthly_salary}
                  </span>
                )}
              </div>
              <div className="text-left w-[50%]">
                {errors.max_monthly_salary && (
                  <span className="text-red-500 text-sm">
                    {errors.max_monthly_salary}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className={`font-[600] text-[20px] ${
                formData.application_deadline ? "text-black" : "text-gray-500"
              }`}
            >
              Application Deadline
            </label>
            <input
              name="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={handleChange}
              className={`w-[370px] p-3 rounded-md ${
                formData.application_deadline
                  ? "border border-black"
                  : "border border-gray-500"
              }`}
            />
            {errors.application_deadline && (
              <span className="text-red-500 text-sm">
                {errors.application_deadline}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-6 w-[95%] mx-auto">
          <label
            className={`font-[600] text-[20px] ${
              formData.job_description ? "text-black" : "text-gray-500"
            }`}
          >
            Job Description
          </label>
          <textarea
            name="job_description"
            rows="6"
            value={formData.job_description}
            onChange={handleChange}
            className={`w-full p-3 rounded-md resize-none ${
              formData.job_description
                ? "border border-black"
                : "border border-gray-500"
            }`}
            placeholder="Please share a description to let the candidate know more about the job role"
          ></textarea>
          {errors.job_description && (
            <span className="text-red-500 text-sm">
              {errors.job_description}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 w-[95%] mx-auto">
          <button
            onClick={() => handleSubmit(true)}
            className="p-3 font-[600] text-[20px] border-2 border-black w-[230px] rounded-lg flex justify-center items-center gap-2"
            disabled={loading.draft}
          >
            {loading.draft ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Save Draft <FaAnglesDown className="text-[18px]" />
              </div>
            )}
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="p-3 font-[600] text-[20px] text-white bg-[#00AAFF] w-[230px] rounded-lg flex justify-center items-center gap-2"
            disabled={loading.publish}
          >
            {loading.publish ? (
              <>
                <Spinner color="white" /> Publishing...
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Publish <FaAnglesRight className="text-[18px]" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
