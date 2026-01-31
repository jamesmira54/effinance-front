'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";
import { usePathname } from "next/navigation";
import { FaCaretDown,FaCaretUp } from "react-icons/fa";

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);
  const Icon = item.icon

  return (
    <>
      <li>
        <Link
          href={item.route}
          onClick={handleClick}
          className={`${isItemActive ? "bg-graydark dark:bg-meta-4" : ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
        >
          {Icon && <Icon size={18} />}
          {item.label}
          {mounted && item.children && (
            pageName === item.label.toLowerCase() ? <FaCaretUp className="ml-auto"/> : <FaCaretDown className="ml-auto"/>
          )}
        </Link>

        {mounted && item.children && (
          <div
            className={`translate transform overflow-hidden ${
              pageName !== item.label.toLowerCase() ? 'hidden' : ''
            }`}
          >
            <SidebarDropdown key={item.id} item={item.children} />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
