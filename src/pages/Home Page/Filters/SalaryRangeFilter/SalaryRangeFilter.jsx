import React from "react";

export const SalaryRangeFilter = ({
  minValue,
  maxValue,
  minRange,
  maxRange,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div className="w-full px-4 flex flex-col items-center justify-center">
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="w-[50%] text-black font-600">Salary Per Month</div>
        <div className="w-[35%] flex items-center justify-between text-black font-600 text-[16px] mt-1">
          <span>₹{(minValue / 1000).toFixed(0)}k</span>
          <span>-</span>
          <span>₹{(maxValue / 1000).toFixed(0)}k</span>
        </div>
      </div>

      <div className="relative h-1 mt-1 w-[93%] bg-gray-300 rounded-full">
        <div
          className="absolute h-1 bg-black rounded-full"
          style={{
            left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
            right: `${
              100 - ((maxValue - minRange) / (maxRange - minRange)) * 100
            }%`,
          }}
        ></div>

        <input
          type="range"
          min={minRange}
          max={maxRange}
          step={1000}
          value={minValue}
          onChange={(e) => onMinChange(parseInt(e.target.value))}
          className="absolute w-full top-1/2 -translate-y-1/2 h-0 opacity-0 cursor-pointer"
        />

        <input
          type="range"
          min={minRange}
          max={maxRange}
          step={1000}
          value={maxValue}
          onChange={(e) => onMaxChange(parseInt(e.target.value))}
          className="absolute w-full top-1/2 -translate-y-1/2 h-0 opacity-0 cursor-pointer"
        />

        <div
          className="absolute w-4 h-4 rounded-full border-4 border-black shadow -top-[5px] -ml-2 flex items-center justify-center"
          style={{
            left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
            backgroundColor: "white",
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>

        <div
          className="absolute w-4 h-4 rounded-full border-4 border-black shadow -top-[5px] -ml-2 flex items-center justify-center"
          style={{
            left: `${((maxValue - minRange) / (maxRange - minRange)) * 100}%`,
            backgroundColor: "white",
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
