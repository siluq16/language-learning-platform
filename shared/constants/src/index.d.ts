export declare const API_VERSION = "v1";
export declare const API_BASE_PREFIX = "/api/v1";
export declare const ERROR_CODES: {
    readonly AUTH_REQUIRED: "AUTH_REQUIRED";
    readonly AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN";
    readonly AUTH_ACCOUNT_SUSPENDED: "AUTH_ACCOUNT_SUSPENDED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly COURSE_ACCESS_DENIED: "COURSE_ACCESS_DENIED";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export declare const STORAGE_BUCKETS: {
    readonly AVATARS: "avatars";
    readonly PUBLIC_CONTENT: "public-content";
    readonly LESSON_MEDIA: "lesson-media";
    readonly SPEAKING_SUBMISSIONS: "speaking-submissions";
    readonly RESOURCES: "resources";
    readonly CERTIFICATES: "certificates";
};
