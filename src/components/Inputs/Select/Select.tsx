import React from "react";
import { useState } from "react";
import { SelectProps, SelectOption } from "./Select.types";
import { GoSingleSelect } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Select, { SingleValue, StylesConfig } from "react-select";
import { styled } from "styled-components";

const StyledSelect = styled(Select)<any>`
   
`;



const SelectComponent:React.FC<SelectProps> = React.forwardRef(
(
    {
        className,
        name,
        value,
        options=[],
        onChange,
        label="Select Input",
        placeholder,
        isMultiple=false, 
        ...props
    }
) => {

        const isDarkMode = typeof window !== "undefined" && document.body.classList.contains("dark");

        const customStyles: StylesConfig<SelectOption, false> = {
            control: (provided, state) => ({
              ...provided,
              backgroundColor: isDarkMode ? "#1f2937" : "white", // Tailwind: dark:bg-gray-800, bg-white
              borderColor: state.isFocused
                ? isDarkMode
                  ? "#3C50E0" // Blue in dark mode
                  : "#3C50E0" // Blue in light mode
                : isDarkMode
                ? "#333A48" // Dark gray
                : "#e5e7eb", // Light gray
              boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
              padding: "0.1rem",
              color: isDarkMode ? "#e5e7eb" : "#374151", // Tailwind: dark:text-gray-300, text-gray-700
              borderWidth: "1px"
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: isDarkMode ? "#1f2937" : "white",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused
                ? isDarkMode
                  ? "#3b82f6"
                  : "#2563eb"
                : isDarkMode
                ? "#374151"
                : "white",
              color: state.isFocused
                ? "white"
                : isDarkMode
                ? "#e5e7eb"
                : "#374151",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: isDarkMode ? "#9ca3af" : "#6b7280", // Tailwind: dark:text-gray-400, text-gray-500
            }),
            singleValue: (provided) => ({
              ...provided,
              color: isDarkMode ? "#e5e7eb" : "#374151",
            }),
        };

        return (
            <div>
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                    {label}
                </label>
                <StyledSelect
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    options={options}
                    styles={customStyles}
                    onChange={onChange}
                    isMulti={isMultiple}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${className}`}
                    {...props}
                />
            </div>
        );
    }
);


export default SelectComponent;