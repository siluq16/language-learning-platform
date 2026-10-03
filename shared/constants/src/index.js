"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_BUCKETS = exports.ERROR_CODES = exports.API_BASE_PREFIX = exports.API_VERSION = void 0;
exports.API_VERSION = 'v1';
exports.API_BASE_PREFIX = '/api/v1';
exports.ERROR_CODES = {
    AUTH_REQUIRED: 'AUTH_REQUIRED',
    AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
    AUTH_ACCOUNT_SUSPENDED: 'AUTH_ACCOUNT_SUSPENDED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    COURSE_ACCESS_DENIED: 'COURSE_ACCESS_DENIED',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
exports.STORAGE_BUCKETS = {
    AVATARS: 'avatars',
    PUBLIC_CONTENT: 'public-content',
    LESSON_MEDIA: 'lesson-media',
    SPEAKING_SUBMISSIONS: 'speaking-submissions',
    RESOURCES: 'resources',
    CERTIFICATES: 'certificates',
};
