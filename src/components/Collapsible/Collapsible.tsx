import { useState } from "react";
import { CollapsibleProps } from "./Collapsible.types";


const Collapsible: React.FC<CollapsibleProps> = ({ title, children, isOpen }) => {
    const [isOpenS, setIsOpenS] = useState(isOpen);

    return (
        <div className="w-full mx-auto mt-2 mb-2">
            <button
                type="button"
                aria-label="Toggle Collapsible"
                onClick={() => setIsOpenS(!isOpenS)}
                className="w-full flex justify-between items-center text-left hover:bg-gray-50 transition"
            >
                <h3 className="text-lg mb-2">{title}</h3>
                <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                    isOpenS ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        <div
            className={`transition-all duration-300 ease-in-out ${
                isOpenS ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            {children}
        </div>
        </div>
    );
};
  
export default Collapsible;