# Web Học Ngoại Ngữ — Architecture & Product Decisions

> Đây là decision log chính thức của project.  
> Trạng thái: `ACCEPTED`, `PROVISIONAL`, `DEFERRED`, `REJECTED`.

---

# 1. Mục tiêu

`DECISIONS.md` dùng để tránh:

- thay đổi stack không có lý do,
- tài liệu mâu thuẫn,
- hard-code quyết định tạm thời,
- developer tự chọn cách triển khai khác nhau cho cùng vấn đề.

Nếu đổi decision:

```text
Update decision
→ ghi lý do
→ ghi impact
→ cập nhật tài liệu liên quan
```

---

# 2. Decision Summary

| ID | Decision | Status |
|---|---|---|
| DEC-001 | Tách `frontend/` và `backend/` | ACCEPTED |
| DEC-002 | npm + npm workspaces | ACCEPTED |
| DEC-003 | Next.js cho Frontend | ACCEPTED |
| DEC-004 | NestJS cho Backend | ACCEPTED |
| DEC-005 | Modular Monolith | ACCEPTED |
| DEC-006 | Supabase PostgreSQL | ACCEPTED |
| DEC-007 | Prisma ORM | ACCEPTED |
| DEC-008 | Supabase Auth | ACCEPTED |
| DEC-009 | Supabase Storage | ACCEPTED |
| DEC-010 | NestJS là business gateway | ACCEPTED |
| DEC-011 | REST `/api/v1` | ACCEPTED |
| DEC-012 | Socket.IO cho realtime app | ACCEPTED |
| DEC-013 | Redis cho cache/queue/lock khi cần | ACCEPTED |
| DEC-014 | Question Bank dùng lại giữa Exercise/Test | ACCEPTED |
| DEC-015 | Placement/Diagnostic reuse Test Engine | ACCEPTED |
| DEC-016 | TestVersion immutable sau publish | ACCEPTED |
| DEC-017 | `course_access_grants` là entitlement source | ACCEPTED |
| DEC-018 | Submission base dùng chung Writing/Speaking | ACCEPTED |
| DEC-019 | UTC/timestamptz | ACCEPTED |
| DEC-020 | Money dùng decimal/numeric | ACCEPTED |
| DEC-021 | Soft delete/archive cho content | ACCEPTED |
| DEC-022 | PostgreSQL search cho MVP | ACCEPTED |
| DEC-023 | AI là optional module | ACCEPTED |
| DEC-024 | Human review là baseline Writing/Speaking | ACCEPTED |
| DEC-025 | Signed URL cho private media | ACCEPTED |
| DEC-026 | RLS là defense-in-depth | ACCEPTED |
| DEC-027 | Payment provider | PROVISIONAL |
| DEC-028 | IELTS Academic vs General phạm vi MVP | PROVISIONAL |
| DEC-029 | HSK official exam version/config | PROVISIONAL |
| DEC-030 | Certificate eligibility rule | PROVISIONAL |
| DEC-031 | Email provider | DEFERRED |
| DEC-032 | Production hosting | DEFERRED |

---

# 3. DEC-001 — Repository tách Frontend / Backend

**Status:** ACCEPTED

```text
frontend/
backend/
shared/
docs/
```

Không dùng:

```text
apps/web
apps/api
```

Lý do:

- rõ trách nhiệm,
- dễ deploy độc lập,
- dễ đọc và bảo trì.

---

# 4. DEC-002 — npm + npm workspaces

**Status:** ACCEPTED

Dùng:

```text
npm
package-lock.json
npm workspaces
```

Không dùng:

```text
pnpm
pnpm-workspace.yaml
Yarn
```

---

# 5. DEC-003 — Next.js Frontend

**Status:** ACCEPTED

```text
Next.js
React
TypeScript
```

Responsibilities:

- UI,
- routing,
- SEO public pages,
- state/form,
- API integration.

Không chứa business-critical authorization.

---

# 6. DEC-004 — NestJS Backend

**Status:** ACCEPTED

```text
NestJS
TypeScript
REST API
Socket.IO Gateway
```

Responsibilities:

- business rules,
- authorization,
- transaction,
- scoring,
- access grant,
- commerce,
- review,
- audit,
- integrations.

---

# 7. DEC-005 — Modular Monolith

**Status:** ACCEPTED

Không dùng microservices cho MVP.

Modules:

```text
auth
users
catalog
courses
questions
tests
assessments
progress
vocabulary
submissions
reviews
commerce
cms
notifications
media
analytics
ai
```

Lý do:

- phù hợp team nhỏ/đồ án,
- deployment đơn giản,
- transaction dễ quản lý,
- vẫn giữ domain boundary.

---

# 8. DEC-006 — Supabase PostgreSQL

**Status:** ACCEPTED

Supabase là PostgreSQL hosting chính.

```text
Next.js
→ NestJS
→ Prisma/Repository
→ Supabase PostgreSQL
```

Không dùng Supabase table API làm business layer.

---

# 9. DEC-007 — Prisma ORM

**Status:** ACCEPTED

Dùng cho:

- application schema,
- typed query,
- migration,
- seed.

Source:

```text
backend/prisma/schema.prisma
```

---

# 10. DEC-008 — Supabase Auth

**Status:** ACCEPTED

Supabase Auth quản lý:

- email/password,
- verification,
- reset password,
- session/JWT.

Identity:

```text
auth.users.id
        ↓
public.users.id
```

NestJS validate JWT và áp dụng role/policy/business authorization.

---

# 11. DEC-009 — Supabase Storage

**Status:** ACCEPTED

Buckets baseline:

```text
avatars
public-content
lesson-media
speaking-submissions
resources
certificates
```

Application metadata ở `media_files`.

Không lưu binary lớn trong PostgreSQL.

---

# 12. DEC-010 — NestJS là Business Gateway

**Status:** ACCEPTED

Ngoại lệ:

```text
Frontend → Supabase Auth
Frontend → signed Storage upload URL
```

Business data:

```text
Frontend
→ NestJS
→ Database
```

Bắt buộc qua NestJS:

- course access,
- test,
- assessment,
- progress,
- review,
- payment,
- certificate,
- admin mutation.

---

# 13. DEC-011 — REST `/api/v1`

**Status:** ACCEPTED

Không dùng GraphQL cho MVP.

Lý do:

- đơn giản,
- Swagger/OpenAPI tốt,
- phù hợp codebase hiện tại.

---

# 14. DEC-012 — Socket.IO

**Status:** ACCEPTED

Dùng cho:

- notification,
- payment/order status signal,
- review published,
- assessment processing,
- background status.

Socket không thay canonical API/DB state.

---

# 15. DEC-013 — Redis

**Status:** ACCEPTED

Dùng khi cần:

- cache,
- rate limit,
- distributed lock,
- queue,
- pub/sub,
- idempotency helper.

Không là source of truth.

---

# 16. DEC-014 — Reusable Question Bank

**Status:** ACCEPTED

Question tái sử dụng:

```text
Exercise
Test
Assessment
Mock Test
Practice
```

Published test phải snapshot nội dung cần giữ lịch sử.

---

# 17. DEC-015 — Assessment reuse Test Engine

**Status:** ACCEPTED

```text
Assessment
→ Test
→ TestVersion
→ TestAttempt
→ TestResult
→ AssessmentResult
```

Không tạo engine riêng.

---

# 18. DEC-016 — TestVersion Immutable

**Status:** ACCEPTED

Sau publish:

- không sửa trực tiếp,
- tạo version mới,
- attempt cũ giữ version cũ.

---

# 19. DEC-017 — Course Access Grant

**Status:** ACCEPTED

Entitlement source:

```text
course_access_grants
```

Nguồn:

```text
PURCHASE
PACKAGE
TRIAL
ADMIN
```

`enrollments` là participation record.

---

# 20. DEC-018 — Unified Submission Base

**Status:** ACCEPTED

```text
submissions
├── writing_submission_details
└── speaking_submission_details

reviews
└── review_criterion_scores
```

---

# 21. DEC-019 — UTC

**Status:** ACCEPTED

Database:

```text
timestamptz
UTC
```

Frontend render theo timezone user.

---

# 22. DEC-020 — Money

**Status:** ACCEPTED

```text
numeric(12,2)
currency char(3)
```

Không dùng float.

Order Item snapshot giá.

---

# 23. DEC-021 — Soft Delete / Archive

**Status:** ACCEPTED

Content dùng:

```text
archived_at
deleted_at
status
```

Historical records như Payment/TestResult/Audit không cascade-delete tùy tiện.

---

# 24. DEC-022 — PostgreSQL Search cho MVP

**Status:** ACCEPTED

```text
ILIKE
full-text search
GIN index
```

Không Elasticsearch/OpenSearch ở MVP.

---

# 25. DEC-023 — AI Optional

**Status:** ACCEPTED

Core flow phải chạy khi AI unavailable.

AI provider không truy cập DB trực tiếp.

---

# 26. DEC-024 — Human Review Baseline

**Status:** ACCEPTED

MVP:

```text
Writing/Speaking Submission
→ Reviewer/Admin
→ Human score + feedback
```

AI feedback là enhancement.

---

# 27. DEC-025 — Signed URL

**Status:** ACCEPTED

Private read:

```text
Request
→ NestJS authorization
→ signed URL
→ Supabase Storage
```

Large upload:

```text
upload intent
→ signed upload
→ direct browser upload
→ confirm
```

---

# 28. DEC-026 — RLS Defense-in-Depth

**Status:** ACCEPTED

RLS cho table/storage expose qua Supabase API.

```text
RLS ≠ NestJS business authorization
```

`service_role` Backend-only.

---

# 29. DEC-027 — Payment Provider

**Status:** PROVISIONAL

Chưa chốt provider.

Candidate:

```text
VNPay
MoMo
Stripe
provider khác
```

Domain dùng adapter:

```text
PaymentProvider
createPayment()
verifyWebhook()
queryPayment()
refund()
```

Cần chốt trước Phase Commerce.

---

# 30. DEC-028 — IELTS Academic / General

**Status:** PROVISIONAL

MVP chưa chốt:

```text
Academic only
hoặc
Academic + General
```

Schema phải hỗ trợ `exam_type`/metadata.

---

# 31. DEC-029 — HSK Version

**Status:** PROVISIONAL

Bắt buộc dùng:

```text
exam_versions
```

Development seed dùng internal placeholder.

Trước production content cần xác minh/chốt official exam config mục tiêu.

---

# 32. DEC-030 — Certificate Eligibility

**Status:** PROVISIONAL

Possible baseline:

```text
Course completed
+
Required assessment passed
```

Cần chốt trước triển khai issuance.

---

# 33. DEC-031 — Email Provider

**Status:** DEFERRED

Interface trước:

```text
EmailProvider
```

Provider cụ thể chọn sau.

---

# 34. DEC-032 — Production Hosting

**Status:** DEFERRED

Frontend/Backend deploy độc lập.

Possible:

```text
Frontend → Vercel/other
Backend → container platform
Supabase → managed
Redis → managed
```

---

# 35. Decision Change Process

```text
1. Không overwrite im lặng
2. Ghi trạng thái mới
3. Ghi lý do
4. Ghi affected artifacts
5. Update docs/code/migration
```

Affected documents:

```text
PROJECT_OVERVIEW.md
REQUIREMENTS.md
USE_CASES.md
ERD.md
DATABASE_SCHEMA.md
API_SPEC.md
CODEBASE_STRUCTURE.md
TEST_PLAN.md
```

---

# 36. Những quyết định cần chốt tiếp

```text
Commerce
→ Payment Provider

IELTS content
→ Academic vs General

HSK production content
→ Official exam version/config

Certificate
→ Eligibility rule

Production
→ Email provider
→ Hosting
→ Backup/retention policy
```
