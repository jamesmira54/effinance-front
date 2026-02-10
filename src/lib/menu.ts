import { RxDashboard } from "react-icons/rx";
import { RiListSettingsLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineOfficeBuilding } from "react-icons/hi";


export type UserRole = 'admin' | 'student' | 'sponsor' | 'coordinator';

export type MenuItem = {
  id: string
  label: string
  route?: string 
  icon?: IconType
  roles?: UserRole[]
  children?: MenuItem[]
}


export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    icon: RxDashboard,
    label: "Dashboard",
    route: "/dashboard",
    roles: ['admin', 'student'],
  },
  {
    id: 'announcements',
    icon: GrAnnounce,
    label: "Announcements",
    route: "/announcements",
    roles: ['admin', 'student'],
  },
  {
    id: 'finas-application',
    icon: IoNewspaperOutline,
    label: "Finas Application",
    route: "",
    children: [
      {
        id: 'pooling',
        label: 'Pooling',
        route: '/finas-application/pooling',
        roles: ['admin'],
      },
      {
        id: 'application-list',
        label: 'Application List',
        route: '/finas-application/application-list',
        roles: ['admin', 'student'],
      },
      {
        id: 'ranking-selection',
        label: 'Ranking Selection',
        route: '/finas-application/ranking-selection',
        roles: ['admin'],
      },
      {
        id: 'finas-proper',
        label: 'Finas Proper',
        route: '/finas-application/finas-proper',
        roles: ['admin'],
      }
    ],
    roles: ['admin', 'student'],
  },
  {
    id: 'financing',
    icon: HiOutlineOfficeBuilding,
    label: "Financing",
    route: "",
    roles: ['admin'],
    children: [
      {
        id: 'budget-office',
        icon: HiOutlineOfficeBuilding,
        label: "Budget Office",
        route: "/financing/budget-office",
        roles: ['admin'],
      },
      {
        id: 'mayors-office',
        icon: HiOutlineOfficeBuilding,
        label: "Mayor's Office",
        route: "/financing/mayors-office",
        roles: ['admin'],
      },
      {
        id: 'treasurers-office',
        icon: HiOutlineOfficeBuilding,
        label: "Treasurer's Office",
        route: "/financing/treasurers-office",
        roles: ['admin'],
      },
      {
        id: 'cashiering',
        icon: HiOutlineOfficeBuilding,
        label: "Cashiering",
        route: "/financing/cashiering",
        roles: ['admin'],
      },
      {
        id: 'accounting',
        icon: HiOutlineOfficeBuilding,
        label: "Accounting",
        route: "/financing/accounting",
        roles: ['admin'],
      },
    ]
  },
  {
    id: 'setup-manager',
    icon: RiListSettingsLine,
    label: "Set-up Manager",
    route: "",
    children: [
      {
        id: 'academic-setup',
        label: 'Academic Setup',
        route: '/setup-manager/academic-setup',
        roles: ['admin'],
      },
      {
        id: 'sponsorships',
        label: 'Sponsorships',
        route: '/setup-manager/sponsorships',
        roles: ['admin'],
      },
      {
        id: 'schools',
        label: 'Schools',
        route: '/setup-manager/schools',
        roles: ['admin'],
      },
      {
        id: 'schedules',
        label: 'Schedules',
        route: '/setup-manager/schedules',
        roles: ['admin'],
      },
      {
        id: 'ranking-order',
        label: 'Ranking Order',
        route: '/setup-manager/ranking-order',
        roles: ['admin'],
      }
    ],
    roles: ['admin'],
  },
  {
    id: 'manage-report',
    icon: HiOutlineOfficeBuilding,
    label: "Manage Report",
    route: "/manage-report",
    roles: ['admin'],
  },
  {
    id: 'settings',
    icon: CiSettings,
    label: "Settings",
    route: "",
    children: [
      {
        id: 'profile',
        label: 'Profile',
        route: '/settings/profile',
        roles: ['admin', 'student'],
      },
      {
        id: 'requirements',
        label: 'Requirements',
        route: '/settings/requirements',
        roles: ['student'],
      },
      {
        id: 'user-accounts',
        label: 'User Accounts',
        route: '/settings/user-accounts',
        roles: ['admin'],
      },
      {
        id: 'student-accounts',
        label: 'Student Accounts',
        route: '/settings/student-accounts',
        roles: ['admin'],
      }
    ],
    roles: ['admin', 'student'],
  }
];
