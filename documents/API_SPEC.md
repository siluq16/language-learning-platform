# Web Học Ngoại Ngữ — API Specification

> Version: 1.0  
> Architecture: Next.js Frontend → NestJS Backend → Supabase PostgreSQL / Storage  
> Authentication: Supabase Auth  
> Base API: `/api/v1`

---

# 1. Mục tiêu

Tài liệu này định nghĩa contract giữa Frontend và Backend cho nền tảng học IELTS + HSK.

API phải bảo đảm:

- Contract ổn định và có version.
- Authorization được thực hiện ở Backend.
- Frontend không phụ thuộc database schema.
- Không expose answer key, payment secret hoặc internal audit data.
- Các mutation quan trọng hỗ trợ transaction và idempotency.
- Test/Assessment Result đã finalized không bị sửa tùy tiện.
- Media private được cấp quyền thông qua signed URL.
- Supabase Auth chỉ phụ trách identity/session; business API vẫn do NestJS cung cấp.

---

# 2. Authentication Boundary

## 2.1 Supabase Auth

Các tác vụ identity/session dùng Supabase Auth:

```text
Register
Login
Email verification
Password reset
Session refresh
Logout
```

Frontend có thể dùng Supabase Auth client với:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Frontend gửi Supabase Access Token đến NestJS:

```http
Authorization: Bearer <access_token>
```

NestJS:

```text
Verify JWT
→ Resolve application user
→ Load roles
→ Authorize resource/action
→ Execute business use case
```

Không dùng Supabase Auth để thay thế business authorization.

## 2.2 Application Auth Endpoints

| Method | Endpoint | Auth | Mục đích |
|---|---|---:|---|
| GET | `/api/v1/auth/me` | Yes | lấy identity + app profile + roles |
| POST | `/api/v1/auth/bootstrap` | Yes | tạo application profile sau lần đăng nhập đầu |
| POST | `/api/v1/auth/logout-all` | Yes | revoke/terminate app sessions nếu triển khai |
| GET | `/api/v1/auth/permissions` | Yes | permission summary phục vụ UI |

---

# 3. API Conventions

## 3.1 Content Type

```http
Content-Type: application/json
Accept: application/json
```

Upload file lớn sử dụng signed upload URL.

## 3.2 Success Response

```json
{
  "data": {},
  "meta": {
    "requestId": "req_01..."
  }
}
```

## 3.3 List Response

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6,
    "requestId": "req_01..."
  }
}
```

## 3.4 Error Response

```json
{
  "error": {
    "code": "COURSE_ACCESS_DENIED",
    "message": "You do not have access to this course.",
    "details": {},
    "requestId": "req_01..."
  }
}
```

Frontend xử lý chủ yếu dựa trên `error.code`.

## 3.5 Pagination

Query:

```text
?page=1
&limit=20
```

Rules:

- `page >= 1`
- `1 <= limit <= 100`
- default `limit = 20`

## 3.6 Sort

```text
?sort=createdAt:desc
```

## 3.7 Filter

Ví dụ:

```text
?language=en
&exam=IELTS
&level=6.0
&status=PUBLISHED
```

## 3.8 Date / Time

API dùng ISO-8601 UTC:

```text
2026-10-02T13:30:00.000Z
```

Frontend render theo timezone của user.

## 3.9 IDs

Public/API IDs dùng UUID.

## 3.10 Idempotency

Mutation nhạy cảm gửi:

```http
Idempotency-Key: <client-generated-uuid>
```

Bắt buộc hoặc khuyến nghị cho:

- test submit,
- payment initiation,
- webhook processing,
- course access grant,
- certificate issue,
- critical retryable commands.

---

# 4. Common Error Codes

```text
AUTH_REQUIRED
AUTH_INVALID_TOKEN
AUTH_ACCOUNT_SUSPENDED
VALIDATION_ERROR
RESOURCE_NOT_FOUND
CONFLICT
RATE_LIMITED
COURSE_NOT_FOUND
COURSE_ACCESS_DENIED
COURSE_NOT_PUBLISHED
LESSON_NOT_FOUND
LESSON_LOCKED
QUESTION_NOT_FOUND
EXERCISE_NOT_FOUND
EXERCISE_ATTEMPT_LIMIT_REACHED
TEST_NOT_FOUND
TEST_NOT_AVAILABLE
TEST_VERSION_NOT_AVAILABLE
TEST_ATTEMPT_NOT_FOUND
TEST_ATTEMPT_ALREADY_SUBMITTED
TEST_ATTEMPT_EXPIRED
ASSESSMENT_NOT_FOUND
ASSESSMENT_RETAKE_NOT_ALLOWED
LEARNING_GOAL_NOT_FOUND
LEARNING_PATH_NOT_FOUND
SUBMISSION_NOT_FOUND
SUBMISSION_ALREADY_SUBMITTED
SUBMISSION_ACCESS_DENIED
REVIEW_NOT_FOUND
REVIEW_ACCESS_DENIED
ORDER_NOT_FOUND
ORDER_INVALID_STATE
COUPON_INVALID
COUPON_EXPIRED
COUPON_LIMIT_REACHED
PAYMENT_NOT_FOUND
PAYMENT_INVALID_STATE
PAYMENT_VERIFICATION_FAILED
MEDIA_NOT_FOUND
MEDIA_ACCESS_DENIED
MEDIA_INVALID_TYPE
MEDIA_TOO_LARGE
CERTIFICATE_NOT_FOUND
CERTIFICATE_REVOKED
ADMIN_PERMISSION_DENIED
AI_UNAVAILABLE
AI_OUTPUT_INVALID
```

---

# 5. Public Catalog API

## GET `/api/v1/languages`

## GET `/api/v1/exams`

Filters:

```text
languageCode
active
```

## GET `/api/v1/exams/:examId/versions`

Không expose private scoring internals cho public client.

## GET `/api/v1/exam-versions/:versionId/levels`

## GET `/api/v1/skills`

---

# 6. User API

## GET `/api/v1/users/me`

Response:

```json
{
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "displayName": "Student",
    "avatarUrl": null,
    "timezone": "Asia/Ho_Chi_Minh",
    "locale": "vi-VN",
    "roles": ["STUDENT"],
    "preferences": {
      "dailyStudyMinutes": 45,
      "showPinyin": true,
      "showTranslation": true
    }
  }
}
```

## PATCH `/api/v1/users/me`

## PATCH `/api/v1/users/me/preferences`

## POST `/api/v1/users/me/avatar/upload-intent`

---

# 7. Public Course API

## GET `/api/v1/courses`

Query:

```text
languageCode
examCode
examVersion
level
skill
courseType
search
page
limit
sort
```

## GET `/api/v1/courses/slug/:slug`

Public detail chỉ trả published content.

## GET `/api/v1/courses/:courseId/outline`

Public outline không trả premium lesson body nếu chưa có access.

---

# 8. Student Course API

## GET `/api/v1/me/courses`

## GET `/api/v1/courses/:courseId/access`

Response:

```json
{
  "data": {
    "hasAccess": true,
    "sourceType": "PURCHASE",
    "expiresAt": null
  }
}
```

## POST `/api/v1/courses/:courseId/enroll`

Không tự grant paid course chỉ vì gọi endpoint này.

## GET `/api/v1/courses/:courseId/learning`

---

# 9. Lesson API

## GET `/api/v1/lessons/:lessonId`

Backend kiểm tra:

```text
published
+
course access
+
prerequisite/lock rule
```

## POST `/api/v1/lessons/:lessonId/start`

Idempotent.

## POST `/api/v1/lessons/:lessonId/complete`

## PATCH `/api/v1/learning-materials/:materialId/progress`

---

# 10. Exercise API

## GET `/api/v1/exercises/:exerciseId`

Student response không chứa answer key.

## POST `/api/v1/exercises/:exerciseId/attempts`

## PUT `/api/v1/exercise-attempts/:attemptId/answers/:questionId`

## POST `/api/v1/exercise-attempts/:attemptId/submit`

---

# 11. Question Bank Admin API

Base:

```text
/api/v1/admin/questions
```

## GET `/api/v1/admin/questions`

Filters:

```text
exam
examVersion
level
skill
questionType
difficulty
status
tag
search
```

## POST `/api/v1/admin/questions`

Request:

```json
{
  "languageId": "uuid",
  "examId": "uuid",
  "examVersionId": "uuid",
  "levelId": "uuid",
  "skillId": "uuid",
  "questionType": "MULTIPLE_CHOICE",
  "difficulty": "MEDIUM",
  "prompt": "Choose the best answer.",
  "content": {},
  "answerKey": {},
  "explanation": {},
  "status": "DRAFT"
}
```

## GET `/api/v1/admin/questions/:id`

## PATCH `/api/v1/admin/questions/:id`

## POST `/api/v1/admin/questions/:id/archive`

## POST `/api/v1/admin/questions/import`

## GET `/api/v1/admin/questions/export`

---

# 12. Test Builder Admin API

## GET `/api/v1/admin/tests`

## POST `/api/v1/admin/tests`

## POST `/api/v1/admin/tests/:testId/versions`

## POST `/api/v1/admin/test-versions/:versionId/sections`

## POST `/api/v1/admin/test-sections/:sectionId/questions`

## PATCH `/api/v1/admin/test-sections/:sectionId/questions/reorder`

## POST `/api/v1/admin/test-versions/:versionId/validate`

## POST `/api/v1/admin/test-versions/:versionId/publish`

Published TestVersion là immutable snapshot.

---

# 13. Student Test API

## GET `/api/v1/tests`

## GET `/api/v1/tests/:testId`

## POST `/api/v1/tests/:testId/attempts`

## GET `/api/v1/test-attempts/:attemptId`

## PUT `/api/v1/test-attempts/:attemptId/answers/:testQuestionId`

## POST `/api/v1/test-attempts/:attemptId/submit`

Header:

```http
Idempotency-Key: 4f8...
```

Backend:

```text
Validate
→ Lock Attempt
→ Persist final answer snapshot
→ Auto grade supported questions
→ Create result
→ Update progress
→ Commit
```

## GET `/api/v1/test-attempts/:attemptId/result`

## GET `/api/v1/me/test-results`

---

# 14. Assessment API

Placement và Diagnostic reuse Test Engine.

## GET `/api/v1/assessments`

## POST `/api/v1/assessments/:assessmentId/attempts`

## POST `/api/v1/assessment-attempts/:id/submit`

## GET `/api/v1/assessment-attempts/:id/result`

Response:

```json
{
  "data": {
    "estimatedLevel": {
      "id": "uuid",
      "code": "6.0"
    },
    "estimatedOverall": 5.5,
    "skills": [
      {
        "skill": "READING",
        "estimatedScore": 6.0
      }
    ],
    "weakSkills": ["WRITING"],
    "learningGaps": [],
    "recommendedNextAction": "CREATE_LEARNING_GOAL"
  }
}
```

---

# 15. Learning Goal API

## GET `/api/v1/me/learning-goals`

## POST `/api/v1/me/learning-goals`

## PATCH `/api/v1/me/learning-goals/:goalId`

## POST `/api/v1/me/learning-goals/:goalId/activate`

## POST `/api/v1/me/learning-goals/:goalId/complete`

---

# 16. Learning Path API

## GET `/api/v1/me/learning-paths/current`

## POST `/api/v1/me/learning-paths/generate`

## POST `/api/v1/me/learning-paths/:id/regenerate`

Tạo version/path mới, không xóa history.

## GET `/api/v1/me/next-learning`

---

# 17. Study Plan API

## GET `/api/v1/me/study-plans/current`

## POST `/api/v1/me/study-plans`

## GET `/api/v1/me/study-tasks`

## POST `/api/v1/me/study-tasks/:id/complete`

---

# 18. Progress API

## GET `/api/v1/me/progress/overview`

## GET `/api/v1/me/progress/courses`

## GET `/api/v1/me/progress/courses/:courseId`

## GET `/api/v1/me/progress/skills`

## GET `/api/v1/me/activity`

---

# 19. Vocabulary API

## GET `/api/v1/vocabulary`

## GET `/api/v1/vocabulary/:id`

## GET `/api/v1/me/vocabulary`

## POST `/api/v1/me/vocabulary`

## PATCH `/api/v1/me/vocabulary/:userVocabularyId/state`

## POST `/api/v1/me/vocabulary/practice-attempts`

## POST `/api/v1/me/vocabulary/practice-attempts/:id/complete`

---

# 20. Writing / Speaking Submission API

## POST `/api/v1/submissions/writing`

## PATCH `/api/v1/submissions/:id/writing`

## POST `/api/v1/submissions/:id/submit`

## POST `/api/v1/submissions/speaking`

## POST `/api/v1/submissions/:id/speaking/upload-intent`

## POST `/api/v1/submissions/:id/speaking/confirm-upload`

## GET `/api/v1/me/submissions`

## GET `/api/v1/submissions/:id`

---

# 21. Review API

## GET `/api/v1/reviewer/queue`

## POST `/api/v1/reviewer/submissions/:submissionId/assign`

## POST `/api/v1/reviewer/submissions/:submissionId/reviews`

## PATCH `/api/v1/reviewer/reviews/:reviewId`

## POST `/api/v1/reviewer/reviews/:reviewId/publish`

## GET `/api/v1/submissions/:submissionId/review`

Student gets only published review.

---

# 22. Package API

```text
GET    /api/v1/packages
GET    /api/v1/packages/slug/:slug

GET    /api/v1/admin/packages
POST   /api/v1/admin/packages
PATCH  /api/v1/admin/packages/:id
POST   /api/v1/admin/packages/:id/publish
```

---

# 23. Order API

## POST `/api/v1/orders`

Request:

```json
{
  "items": [
    {
      "itemType": "PACKAGE",
      "packageId": "uuid",
      "quantity": 1
    }
  ],
  "couponCode": "WELCOME10"
}
```

Backend snapshot giá tại thời điểm order.

## GET `/api/v1/me/orders`

## GET `/api/v1/orders/:orderId`

## POST `/api/v1/orders/:orderId/cancel`

---

# 24. Coupon API

## POST `/api/v1/coupons/validate`

Admin:

```text
GET    /api/v1/admin/coupons
POST   /api/v1/admin/coupons
PATCH  /api/v1/admin/coupons/:id
POST   /api/v1/admin/coupons/:id/disable
```

---

# 25. Payment API

Provider chưa chốt; contract app không phụ thuộc provider cụ thể.

## POST `/api/v1/orders/:orderId/payments`

Header:

```http
Idempotency-Key: ...
```

## GET `/api/v1/payments/:paymentId`

## POST `/api/v1/webhooks/payments/:provider`

Flow:

```text
Webhook
→ Verify signature
→ payment_events
→ Payment
→ Order
→ CourseAccessGrant
→ Enrollment
→ Commit
→ Notification
```

Frontend redirect không phải payment source of truth.

---

# 26. Media API

## POST `/api/v1/media/upload-intents`

Response trả signed upload URL.

## POST `/api/v1/media/:mediaId/confirm`

## GET `/api/v1/media/:mediaId/access`

## DELETE `/api/v1/media/:mediaId`

Private media phải authorization trước khi cấp signed URL.

---

# 27. Notification API

```text
GET   /api/v1/me/notifications
POST  /api/v1/me/notifications/:id/read
POST  /api/v1/me/notifications/read-all
GET   /api/v1/me/notification-preferences
PATCH /api/v1/me/notification-preferences
```

---

# 28. Certificate API

```text
GET  /api/v1/me/certificates
GET  /api/v1/certificates/:id
GET  /api/v1/certificates/verify/:verificationCode

POST /api/v1/admin/certificates/issue
POST /api/v1/admin/certificates/:id/revoke
```

Issuance phải idempotent.

---

# 29. CMS Public API

```text
GET /api/v1/articles
GET /api/v1/articles/slug/:slug
GET /api/v1/article-categories
GET /api/v1/resources
GET /api/v1/resources/slug/:slug
```

Only published content.

---

# 30. CMS Admin API

```text
GET    /api/v1/admin/articles
POST   /api/v1/admin/articles
GET    /api/v1/admin/articles/:id
PATCH  /api/v1/admin/articles/:id
POST   /api/v1/admin/articles/:id/publish
POST   /api/v1/admin/articles/:id/unpublish
POST   /api/v1/admin/articles/:id/archive

GET    /api/v1/admin/resources
POST   /api/v1/admin/resources
PATCH  /api/v1/admin/resources/:id
POST   /api/v1/admin/resources/:id/publish
```

---

# 31. Admin Course Management API

```text
GET    /api/v1/admin/courses
POST   /api/v1/admin/courses
GET    /api/v1/admin/courses/:id
PATCH  /api/v1/admin/courses/:id
POST   /api/v1/admin/courses/:id/publish
POST   /api/v1/admin/courses/:id/unpublish
POST   /api/v1/admin/courses/:id/archive

POST   /api/v1/admin/courses/:courseId/modules
PATCH  /api/v1/admin/course-modules/:moduleId

POST   /api/v1/admin/course-modules/:moduleId/lessons
PATCH  /api/v1/admin/lessons/:lessonId
POST   /api/v1/admin/lessons/:lessonId/publish

POST   /api/v1/admin/lessons/:lessonId/materials
PATCH  /api/v1/admin/learning-materials/:id
```

---

# 32. Admin User API

```text
GET    /api/v1/admin/users
GET    /api/v1/admin/users/:id
PATCH  /api/v1/admin/users/:id/status
POST   /api/v1/admin/users/:id/roles
DELETE /api/v1/admin/users/:id/roles/:roleId
GET    /api/v1/admin/users/:id/activity
```

Role changes phải audit.

---

# 33. Admin Analytics API

```text
GET /api/v1/admin/analytics/overview
GET /api/v1/admin/analytics/learning
GET /api/v1/admin/analytics/courses
GET /api/v1/admin/analytics/questions
GET /api/v1/admin/analytics/revenue
```

---

# 34. Search API

```text
GET /api/v1/search
GET /api/v1/admin/search
```

MVP dùng PostgreSQL search / ILIKE / full-text.

---

# 35. Audit API

## GET `/api/v1/admin/audit-logs`

Audit log read-only từ application API.

---

# 36. AI API — V2 / Optional

```text
POST /api/v1/ai/explain-answer
POST /api/v1/ai/generate-practice
POST /api/v1/ai/analyze-writing
POST /api/v1/ai/analyze-speaking
POST /api/v1/ai/suggest-study-plan
POST /api/v1/ai/tutor/messages
```

Rules:

- authorize referenced resource,
- validate output schema,
- no direct database access by provider,
- mutation action requires explicit confirmation when applicable.

---

# 37. Realtime / Socket.IO Contract

Connection:

```text
JWT authenticated socket
```

Rooms:

```text
user:{userId}
admin
reviewer:{reviewerId}
```

Events Backend → Client:

```text
notification.created
review.published
payment.updated
order.completed
course.access-granted
assessment.processing
assessment.completed
certificate.issued
```

Socket event là signal; client refetch canonical API data khi cần.

---

# 38. HTTP Status Conventions

```text
200 OK
201 Created
202 Accepted
204 No Content
400 Validation / malformed request
401 Unauthenticated
403 Unauthorized
404 Not Found
409 Conflict / invalid state
422 Domain validation when appropriate
429 Rate Limited
500 Internal Error
502/503 External provider unavailable
```

---

# 39. Authorization Matrix ở API Boundary

| Resource | Student | Reviewer | Content Manager | Admin |
|---|---:|---:|---:|---:|
| Own profile | RW | RW | RW | RW |
| Public course | R | R | R | R |
| Own learning data | RW | own only | own only | scoped R |
| Question answer key | No | scoped | RW | RW |
| Test Builder | No | No | RW | RW |
| Own submission | RW by state | No | No | R |
| Review queue | No | RW scoped | No | RW |
| Orders | own | own | own | RW |
| Payment webhook | No | No | No | system only |
| Analytics | No | No | scoped | R |
| Audit | No | No | No | R |

Backend policy là nguồn quyết định cuối cùng.

---

# 40. API Versioning

Current:

```text
/api/v1
```

Breaking change:

```text
/api/v2
```

---

# 41. OpenAPI / Swagger

NestJS development/staging:

```text
/api/docs
```

Mỗi endpoint cần:

- request schema,
- response schema,
- auth requirement,
- error codes,
- examples.

---

# 42. API Definition of Done

```text
[ ] DTO validation
[ ] Authentication
[ ] Authorization
[ ] Service/use case
[ ] Repository access
[ ] Error mapping
[ ] API response contract
[ ] Logging/requestId
[ ] Transaction nếu cần
[ ] Idempotency nếu cần
[ ] Audit nếu cần
[ ] Unit test
[ ] Integration test
[ ] Swagger/OpenAPI
[ ] Frontend contract updated
```
