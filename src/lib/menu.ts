import { RxDashboard } from "react-icons/rx";
import { RiListSettingsLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { IconType } from "react-icons";

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
        children: [
            {
              id: 'randomw',
              label: 'Random',
              route: '/finas-application/application-list',
              roles: ['admin'],
          }
        ]
      },
      {
        id: 'application-list',
        label: 'Application List',
        route: '/finas-application/application-list',
        roles: ['admin'],
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
        roles: ['admin'],
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
  },
];
