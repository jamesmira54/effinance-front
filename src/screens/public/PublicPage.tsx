import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiDownload,
  FiFileText,
  FiHelpCircle,
  FiInfo,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { IconType } from "react-icons";

type StatItem = {
  label: string;
  value: string;
  icon: IconType;
  tone: string;
};

type PanelItem = {
  title: string;
  description: string;
  meta: string;
};

type PublicPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  stats: StatItem[];
  panels: PanelItem[];
  asideTitle: string;
  asideItems: string[];
};

export const pageContent: Record<string, PublicPageProps> = {
  home: {
    eyebrow: "Admission & Scholarship Office",
    title: "Scholarship applications, deadlines, and scholar support in one place.",
    description:
      "Track open grants, prepare required documents, read office announcements, and sign in to the portal when you are ready to submit or manage an application.",
    primaryAction: { label: "View Available Grants", href: "/available-grants" },
    stats: [
      { label: "Open Grants", value: "12", icon: FiAward, tone: "text-primary" },
      { label: "Upcoming Deadlines", value: "5", icon: FiCalendar, tone: "text-warning" },
      { label: "Published Forms", value: "18", icon: FiFileText, tone: "text-meta-5" },
      { label: "Active Scholars", value: "426", icon: FiUsers, tone: "text-success" },
    ],
    panels: [
      {
        title: "Merit Assistance Renewal",
        description: "Renewal window for continuing scholars closes this Friday.",
        meta: "Deadline: July 5, 2026",
      },
      {
        title: "New Grant Orientation",
        description: "Applicant briefing for first-year scholarship programs.",
        meta: "Schedule: July 12, 2026",
      },
      {
        title: "Document Submission Check",
        description: "Office validation for certificates, appeals, and clearances.",
        meta: "Status: Ongoing",
      },
    ],
    asideTitle: "Quick Actions",
    asideItems: [
      "Review eligibility requirements before applying.",
      "Download clearance and appeal forms.",
      "Prepare scanned copies for portal submission.",
      "Contact the campus desk for application issues.",
    ],
  },
  grants: {
    eyebrow: "Available Grants",
    title: "Directory of open scholarship programs.",
    description:
      "Browse scholarship opportunities, eligibility windows, funding categories, and document requirements before starting your portal application.",
    primaryAction: { label: "Portal Login", href: "/login" },
    stats: [
      { label: "Academic Grants", value: "6", icon: FiBookOpen, tone: "text-primary" },
      { label: "Financial Aid", value: "4", icon: FiAward, tone: "text-success" },
      { label: "Renewal Programs", value: "2", icon: FiCheckCircle, tone: "text-meta-5" },
      { label: "Closing Soon", value: "3", icon: FiAlertCircle, tone: "text-warning" },
    ],
    panels: [
      {
        title: "Academic Excellence Grant",
        description: "For applicants with strong academic standing and complete school records.",
        meta: "Open until July 15, 2026",
      },
      {
        title: "Need-Based Tuition Support",
        description: "Financial assistance for qualified students with household income review.",
        meta: "Open until July 30, 2026",
      },
      {
        title: "Continuing Scholar Renewal",
        description: "Renewal path for existing scholars with updated grades and requirements.",
        meta: "Open until July 5, 2026",
      },
    ],
    asideTitle: "Program Checklist",
    asideItems: [
      "Confirm eligibility and grade requirements.",
      "Check renewal or new-applicant category.",
      "Prepare income, enrollment, and identification documents.",
      "Submit before the posted deadline.",
    ],
  },
  forms: {
    eyebrow: "Document Forms",
    title: "Printable clearance, certificate, and appeal forms.",
    description:
      "Download the official forms used for application validation, clearance requests, scholar certificates, and scholarship appeals.",
    primaryAction: { label: "Open Help Guide", href: "/help-faqs" },
    stats: [
      { label: "Clearance Forms", value: "5", icon: FiFileText, tone: "text-primary" },
      { label: "Certificates", value: "4", icon: FiDownload, tone: "text-meta-5" },
      { label: "Appeal Forms", value: "3", icon: FiInfo, tone: "text-warning" },
      { label: "Guides", value: "6", icon: FiHelpCircle, tone: "text-success" },
    ],
    panels: [
      {
        title: "Scholarship Clearance Request",
        description: "Use this form for campus clearance and scholarship status verification.",
        meta: "Printable PDF",
      },
      {
        title: "Certificate of Scholarship",
        description: "Request certification for enrollment, billing, or external validation.",
        meta: "Printable PDF",
      },
      {
        title: "Appeal for Reconsideration",
        description: "Submit appeals for incomplete, late, or contested application decisions.",
        meta: "Printable PDF",
      },
    ],
    asideTitle: "Before Printing",
    asideItems: [
      "Use the latest posted version only.",
      "Print on clean short bond paper unless noted.",
      "Attach supporting documents before submission.",
      "Keep a personal copy of every signed form.",
    ],
  },
  announcements: {
    eyebrow: "Announcements",
    title: "Admission news, qualifiers lists, and renewal dates.",
    description:
      "Read public advisories from the Admission and Scholarship Office, including qualifier postings, schedule changes, and renewal reminders.",
    primaryAction: { label: "Get Support", href: "/contact-support" },
    stats: [
      { label: "News Posts", value: "9", icon: FiInfo, tone: "text-primary" },
      { label: "Qualifiers Lists", value: "3", icon: FiUsers, tone: "text-success" },
      { label: "Renewal Notices", value: "5", icon: FiCalendar, tone: "text-meta-5" },
      { label: "Urgent Updates", value: "2", icon: FiAlertCircle, tone: "text-warning" },
    ],
    panels: [
      {
        title: "Initial Qualifiers Posted",
        description: "Shortlisted applicants for the current scholarship cycle are now available.",
        meta: "Posted: June 29, 2026",
      },
      {
        title: "Renewal Schedule Released",
        description: "Continuing scholars may submit renewal requirements through the portal.",
        meta: "Posted: June 24, 2026",
      },
      {
        title: "Application Desk Extended Hours",
        description: "The campus desk will accept document concerns during extended office hours.",
        meta: "Posted: June 18, 2026",
      },
    ],
    asideTitle: "Announcement Types",
    asideItems: [
      "Admission and screening updates.",
      "Scholarship qualifier lists.",
      "Renewal and document deadlines.",
      "Office hours and campus advisories.",
    ],
  },
  help: {
    eyebrow: "Help & FAQs",
    title: "Application guides, submission checklists, and FAQs.",
    description:
      "Find step-by-step application reminders, document preparation notes, and answers to common scholarship portal questions.",
    primaryAction: { label: "Contact Support", href: "/contact-support" },
    stats: [
      { label: "Guides", value: "8", icon: FiBookOpen, tone: "text-primary" },
      { label: "FAQs", value: "24", icon: FiHelpCircle, tone: "text-meta-5" },
      { label: "Checklists", value: "6", icon: FiCheckCircle, tone: "text-success" },
      { label: "Support Channels", value: "3", icon: FiPhone, tone: "text-warning" },
    ],
    panels: [
      {
        title: "How do I apply?",
        description: "Create or access your portal account, choose an open grant, and complete all required fields.",
        meta: "Application guide",
      },
      {
        title: "What documents are required?",
        description: "Requirements vary by grant, but most programs ask for enrollment, grades, and income documents.",
        meta: "Submission checklist",
      },
      {
        title: "Can I update my submission?",
        description: "Updates are allowed while the application is still open and not yet under final review.",
        meta: "Portal FAQ",
      },
    ],
    asideTitle: "Support Reminders",
    asideItems: [
      "Use the same name across all submitted documents.",
      "Check file clarity before uploading scans.",
      "Monitor announcements for office schedule changes.",
      "Use your portal account for application status checks.",
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "Admission & Scholarship Office overview.",
    description:
      "The office manages scholarship screening, application validation, grant coordination, scholar records, and renewal support across campus programs.",
    primaryAction: { label: "View Announcements", href: "/public-announcements" },
    stats: [
      { label: "Grant Categories", value: "4", icon: FiAward, tone: "text-primary" },
      { label: "Office Services", value: "9", icon: FiInfo, tone: "text-meta-5" },
      { label: "Campus Partners", value: "7", icon: FiUsers, tone: "text-success" },
      { label: "Support Desk", value: "1", icon: FiMapPin, tone: "text-warning" },
    ],
    panels: [
      {
        title: "Scholarship Administration",
        description: "Coordinates eligibility screening, ranking workflows, and award documentation.",
        meta: "Core service",
      },
      {
        title: "Application Assistance",
        description: "Supports applicants with portal access, document questions, and submission concerns.",
        meta: "Student service",
      },
      {
        title: "Renewal Monitoring",
        description: "Guides continuing scholars through updates, requirements, and renewal schedules.",
        meta: "Scholar service",
      },
    ],
    asideTitle: "Office Focus",
    asideItems: [
      "Transparent scholarship processing.",
      "Reliable application and renewal guidance.",
      "Accessible public information.",
      "Secure portal support for scholars and staff.",
    ],
  },
  contact: {
    eyebrow: "Contact & Support",
    title: "Campus desk location, hotlines, and support emails.",
    description:
      "Reach the Admission and Scholarship Office for document concerns, portal access, deadline questions, and grant application support.",
    primaryAction: { label: "Portal Login", href: "/login" },
    stats: [
      { label: "Campus Desk", value: "Rm 102", icon: FiMapPin, tone: "text-primary" },
      { label: "Hotline", value: "215", icon: FiPhone, tone: "text-success" },
      { label: "Email Queues", value: "2", icon: FiInfo, tone: "text-meta-5" },
      { label: "Office Days", value: "Mon-Fri", icon: FiCalendar, tone: "text-warning" },
    ],
    panels: [
      {
        title: "Campus Desk",
        description: "Administration Building, Room 102, Scholarship Assistance Counter.",
        meta: "8:00 AM to 5:00 PM",
      },
      {
        title: "Hotline",
        description: "(02) 8123-4567 local 215 for application and document concerns.",
        meta: "Office hours only",
      },
      {
        title: "Support Email",
        description: "scholarships@efinas.edu for application, renewal, and portal questions.",
        meta: "Response within 1-2 office days",
      },
    ],
    asideTitle: "Best For",
    asideItems: [
      "Deadline and schedule clarification.",
      "Document validation concerns.",
      "Portal account access support.",
      "Grant eligibility questions.",
    ],
  },
  privacy: {
    eyebrow: "Privacy & Terms",
    title: "Data privacy policy and scholarship guidelines.",
    description:
      "Review how applicant information is handled and the public guidelines that govern scholarship application, screening, award, and renewal processes.",
    primaryAction: { label: "Read FAQs", href: "/help-faqs" },
    stats: [
      { label: "Privacy Notices", value: "3", icon: FiShield, tone: "text-primary" },
      { label: "Guidelines", value: "6", icon: FiFileText, tone: "text-meta-5" },
      { label: "Review Steps", value: "4", icon: FiCheckCircle, tone: "text-success" },
      { label: "Appeal Window", value: "7 days", icon: FiCalendar, tone: "text-warning" },
    ],
    panels: [
      {
        title: "Applicant Data Use",
        description: "Submitted information is used for eligibility review, verification, award processing, and scholar records.",
        meta: "Privacy policy",
      },
      {
        title: "Scholarship Guidelines",
        description: "Applicants must submit accurate information and complete all grant-specific requirements.",
        meta: "Program terms",
      },
      {
        title: "Appeals and Corrections",
        description: "Applicants may request correction or reconsideration within the published appeal period.",
        meta: "Office guideline",
      },
    ],
    asideTitle: "Key Notes",
    asideItems: [
      "Keep portal credentials private.",
      "Submit only accurate and complete information.",
      "Follow posted grant deadlines.",
      "Use official office channels for appeals.",
    ],
  },
};

const PublicPage = ({
  eyebrow,
  title,
  description,
  primaryAction,
  stats,
  panels,
  asideTitle,
  asideItems,
}: PublicPageProps) => {
  return (
    <div>
      <section className="border-b border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:py-14 2xl:px-10">
          <div>
            <span className="inline-flex rounded-sm bg-gray px-3 py-1 text-sm font-medium text-primary dark:bg-meta-4 dark:text-white">
              {eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl text-title-md2 font-bold text-black dark:text-white sm:text-title-xl lg:text-title-xxl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-body dark:text-bodydark">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-opacity-90"
                >
                  {primaryAction.label}
                  <FiArrowRight />
                </Link>
              )}
              <Link
                href="/login"
                className="inline-flex items-center rounded-sm border border-stroke bg-white px-5 py-3 text-sm font-semibold text-black shadow-card transition hover:border-primary hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
              >
                Portal Login
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {stats.slice(0, 2).map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-sm border border-stroke bg-whiten p-5 shadow-default dark:border-strokedark dark:bg-boxdark-2"
                >
                  <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon size={22} className={stat.tone} />
                  </div>
                  <p className="mt-4 text-title-md font-bold text-black dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6 2xl:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-sm border border-stroke bg-white px-6 py-5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  <Icon size={22} className={stat.tone} />
                </div>
                <div className="mt-4">
                  <h2 className="text-title-md font-bold text-black dark:text-white">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-title-sm font-semibold text-black dark:text-white">
              Latest Information
            </h2>
            <div className="mt-5 divide-y divide-stroke dark:divide-strokedark">
              {panels.map((panel) => (
                <article key={panel.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-black dark:text-white">
                        {panel.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-body dark:text-bodydark">
                        {panel.description}
                      </p>
                    </div>
                    <span className="inline-flex flex-shrink-0 rounded-sm bg-gray px-3 py-1 text-xs font-medium text-primary dark:bg-meta-4 dark:text-white">
                      {panel.meta}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-title-sm font-semibold text-black dark:text-white">
              {asideTitle}
            </h2>
            <div className="mt-5 space-y-4">
              {asideItems.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6">
                  <FiCheckCircle className="mt-1 flex-shrink-0 text-success" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PublicPage;
