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