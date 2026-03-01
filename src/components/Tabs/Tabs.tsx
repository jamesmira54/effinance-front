"use client"

import { useState } from "react";
import { TabsProps } from "./Tabs.types";

const Tabs: React.FC<TabsProps> = ({tabs }) => {
    
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b">
                {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                    activeTab === index
                        ? "border-b-2 border-primary-500 text-primary-500"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            <div className="p-4 bg-white shadow-md rounded-md mt-2">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}


export default Tabs;