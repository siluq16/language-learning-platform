export type Role = 'GUEST' | 'STUDENT' | 'CONTENT_MANAGER' | 'TEACHER_REVIEWER' | 'ADMIN';
export type ExamType = 'IELTS' | 'HSK' | 'CUSTOM';
export type SkillType = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING' | 'VOCABULARY' | 'GRAMMAR';
export type SubmissionStatus = 'PENDING' | 'IN_REVIEW' | 'REVIEWED' | 'REJECTED';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type AccessGrantSource = 'PURCHASE' | 'PACKAGE' | 'TRIAL' | 'ADMIN';
export interface ApiResponse<T = unknown> {
    data: T;
    meta?: {
        requestId?: string;
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}
export interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
        requestId?: string;
    };
}
