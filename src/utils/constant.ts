export const USER_ROLE = {
    ADMIN: 'System Admin',
    STUDENT: 'Student',
    SPONSOR: 'Sponsor',
    COORDINATOR: 'Financial Assistance Coordinator',
}

export const APPLICATION_STAGE = {
    POOLING: "POOLING", 
    APPLICATION_LIST: "APPLICATION_LIST",
    RANKING_SELECTION: "RANKING_SELECTION",
    FINAS_PROPER: "FINAS_PROPER"
} as const;

export const APPLICATION_STATUS = {
    // Pooling Stage Statuses
    PENDING_POOLING: "PENDING_POOLING",
    FOLLOW_UP: "FOLLOW_UP",
    COMPLETE: "COMPLETE",
    REJECTED: "REJECTED", // Common, used in multiple stages

    // Application List Stage Statuses
    PENDING_APPLICATION_LIST: "PENDING_APPLICATION_LIST",
    APPROVED: "APPROVED",

    // Ranking Selection Stage Statuses
    PENDING_RANKING_SELECTION: "PENDING_RANKING_SELECTION",
    RANKED: "RANKED",
    NOT_QUALIFIED: "NOT_QUALIFIED",

    // Final Selection Stage Statuses
    AWARDED: "AWARDED",
} as const;


export const EvaluationStatus = {
    PENDING: "PENDING",
    PASSED: "PASSED",
    FAILED: "FAILED",
} as const;

export const DATA_SOURCE_OPTIONS = [
    { label: 'Custom Input', value: 'CUSTOM_INPUT' },
    { label: 'Column', value: 'COLUMN' },
    { label: 'Computed', value: 'COMPUTED' }
];

export const PREFERENCE_OPTIONS = [
    { label: 'Max', value: 'MAX' },
    { label: 'Min', value: 'MIN' }
];

export const FORMULA_TYPE_OPTIONS = [
    { label: 'Sum', value: 'SUM' },
    { label: 'Average', value: 'AVG' },
];

// Must match backend role names exactly, including the curly apostrophes.
export const OFFICE_ROLE = {
    BUDGET_OFFICE: "Budget Office",
    MAYORS_OFFICE: "Mayor’s Office",
    TREASURERS_OFFICE: "Treasurer’s Office",
    CASHIER: "Cashier",
    ACCOUNTING: "Accounting",
} as const;

export const TRACK_OFFICES: string[] = Object.values(OFFICE_ROLE);

export const TRACK_ROUTING_OFFICES: string[] = [...TRACK_OFFICES, USER_ROLE.COORDINATOR];

export const TRACK_STATUS = {
    DRAFT: "DRAFT",
    SUBMITTED: "SUBMITTED",
    IN_PROCESSED: "IN_PROCESSED",
    FORWARDED: "FORWARDED",
    RETURNED: "RETURNED",
    DONE: "DONE",
} as const;

export const TRACK_STATUS_LABEL: Record<string, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Submitted",
    IN_PROCESSED: "In-Processed",
    FORWARDED: "Forwarded",
    RETURNED: "Returned",
    DONE: "Done",
};

export const PROCESS_TYPE_OPTIONS = [
    { label: "Scholarship Voucher", value: "SCHOLARSHIP_VOUCHER" },
    { label: "Scholarship Disbursement", value: "SCHOLARSHIP_DISBURSEMENT" },
];

export const TRACK_PURPOSE_OPTIONS = [
    { label: "For Processing", value: "FOR_PROCESSING" },
    { label: "For Approval", value: "FOR_APPROVAL" },
    { label: "For Validation", value: "FOR_VALIDATION" },
];
