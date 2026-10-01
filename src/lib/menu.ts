import { RxDashboard } from "react-icons/rx";
import { RiListSettingsLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export type UserRole = "admin" | "student" | "sponsor" | "coordinator";

export type MenuItem = {
  id: string;
  label: string;
  route?: string;
  icon?: IconType;
  roles?: UserRole[];
  // Shown only to students who are an official grantee of a sponsorship.
  granteeOnly?: boolean;
  children?: MenuItem[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    icon: RxDashboard,
    label: "Dashboard",
    route: "/dashboard",
    roles: ["admin", "sponsor", "coordinator"],
  },
  {
    id: "announcements",
    icon: GrAnnounce,
    label: "Announcements",
    route: "/announcements",
    roles: ["admin", "student", "coordinator"],
  },
  {
    id: "finas-application",
    icon: IoNewspaperOutline,
    label: "Finas Application",
    route: "",
    children: [
      {
        id: "pooling",
        label: "Pooling List",
        route: "/finas-application/pooling",
        roles: ["admin", "coordinator", "sponsor"],
      },
      {
        id: "application-list",
        label: "Application List",
        route: "/finas-application/application-list",
        roles: ["admin", "coordinator"],
      },
      {
        id: "ranked-list",
        label: "Pending Rankings",
        route: "/finas-application/ranked-list",
        roles: ["admin", "coordinator"],
      },
      {
        id: "ranking-results",
        label: "Ranking Results",
        route: "/finas-application/ranking-results",
        roles: ["admin", "coordinator"],
      },
      {
        id: "finas-proper",
        label: "Finas Proper",
        route: "/finas-application/finas-proper",
        roles: ["admin", "coordinator"],
      },
    ],
    roles: ["admin", "coordinator", "sponsor"],
  },
  {
    id: "sponsorhip-list",
    label: "Sponsorship List",
    route: "",
    icon: IoNewspaperOutline,
    roles: ["student"],
    children: [
      {
        id: "applied-sponsorships",
        label: "Applied",
        route: "/sponsorship-list/applied",
        roles: ["student"],
      },
      {
        id: "recommended-sponsorships",
        label: "Available Grants",
        route: "/sponsorship-list/recommended",
        roles: ["student"],
      },
    ],
  },
  {
    id: "finas-tracking-student",
    icon: IoNewspaperOutline,
    label: "Finas Tracking",
    route: "/document-tracking",
    roles: ["student"],
    granteeOnly: true,
  },
  {
    id: "setup-manager",
    icon: RiListSettingsLine,
    label: "Setup Manager",
    route: "",
    children: [
      {
        id: "academic-setup",
        label: "Academic Setup",
        route: "/setup-manager/academic-setup",
        roles: ["admin"],
      },
      {
        id: "sponsorships",
        label: "Sponsorships",
        route: "/setup-manager/sponsorships",
        roles: ["admin"],
      },
      {
        id: "schools",
        label: "Schools",
        route: "/setup-manager/schools",
        roles: ["admin"],
      },
      {
        id: "schedules",
        label: "Schedule",
        route: "/setup-manager/schedules",
        roles: ["admin", "coordinator"],
      },
      // Labels must match the backend's seeded module names or the sidebar hides them.
      {
        id: "process-type",
        label: "Process Type",
        route: "/setup-manager/process-types",
        roles: ["admin", "coordinator"],
      },
      {
        id: "process-purpose",
        label: "Process Purpose",
        route: "/setup-manager/process-purposes",
        roles: ["admin", "coordinator"],
      },
      {
        id: "process-destination",
        label: "Process Destination",
        route: "/setup-manager/process-destinations",
        roles: ["admin", "coordinator"],
      },
    ],
    roles: ["admin", "sponsor", "coordinator"],
  },
  {
    id: "manage-report",
    icon: HiOutlineOfficeBuilding,
    label: "Manage Report",
    route: "/manage-report",
    roles: ["admin", "coordinator"],
  },
  {
    id: "monitoring-list",
    icon: IoNewspaperOutline,
    label: "Monitoring List",
    route: "/monitoring-list",
    roles: ["admin", "coordinator", "sponsor"],
  },
  {
    id: "document-tracking",
    icon: IoNewspaperOutline,
    label: "Finas Tracking",
    route: "/document-tracking",
    roles: ["admin", "coordinator"],
  },
  {
    id: "settings",
    icon: CiSettings,
    label: "Settings",
    route: "",
    children: [
      {
        id: "profile",
        label: "Profile",
        route: "/settings/profile",
        roles: ["admin", "student"],
      },
      {
        id: "requirements",
        label: "Requirements",
        route: "/settings/requirements",
        roles: ["student"],
      },
      {
        id: "user-accounts",
        label: "User Accounts",
        route: "/settings/user-accounts",
        roles: ["admin"],
      },
      {
        id: "student-accounts",
        label: "Student Accounts",
        route: "/settings/student-accounts",
        roles: ["admin"],
      },
    ],
    roles: ["admin", "student"],
  },
];
