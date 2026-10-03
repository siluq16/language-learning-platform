# Web Học Ngoại Ngữ — SYSTEM CODEBASE STRUCTURE

> Tài liệu định nghĩa cấu trúc source code cho hệ thống học ngoại ngữ theo hướng **Frontend / Backend tách biệt**, kết hợp **feature-based architecture** ở Frontend và **modular layered architecture** ở Backend.
>
> Mục tiêu chính: source code dễ đọc, dễ mở rộng, dễ test, hạn chế coupling giữa UI và business logic, đồng thời giữ ranh giới rõ giữa Frontend, Backend, Database, Realtime, AI và các dịch vụ tích hợp.

---

# 1. Kiến trúc tổng thể

Hệ thống sử dụng mô hình:

```text
                    ┌─────────────────────────┐
                    │        Frontend         │
                    │         Next.js         │
                    │                         │
                    │ Public / Student / Admin│
                    └────────────┬────────────┘
                                 │
                          HTTP / WebSocket
                                 │
                    ┌────────────▼────────────┐
                    │         Backend         │
                    │         NestJS          │
                    │                         │
                    │ Business / Auth / API   │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼────────────────────┐
             │                   │                    │
       Supabase                Redis             Supabase Storage
       PostgreSQL           Cache / Queue               Media
             │                   │                    │
             └───────────────────┼────────────────────┘
                                 │
                         External Services
                                 │
              ┌──────────────────┼───────────────────┐
              │                  │                   │
           LLM API         Payment Provider      Email Provider
```

Các nguyên tắc:

1. Frontend và Backend là hai phần riêng biệt trong repository.
2. Không dùng cấu trúc `apps/web` và `apps/api`.
3. Frontend không truy cập database trực tiếp cho nghiệp vụ chính.
4. Frontend chỉ giao tiếp với Backend thông qua REST API hoặc WebSocket.
5. Frontend không chứa business rule quan trọng trong component.
6. Backend không chứa logic UI.
7. Business logic nằm trong service / use-case layer.
8. Database access nằm trong repository / data-access layer.
9. Authorization được kiểm tra ở Backend.
10. API Request / Response phải có DTO và contract rõ ràng.
11. Mỗi domain lớn có module / feature riêng.
12. Shared code chỉ chứa code thực sự dùng chung.
13. IELTS / HSK / ExamVersion không được hard-code rải rác.
14. AI là lớp hỗ trợ, không phải dependency bắt buộc của core learning flow.
15. Test Attempt, Payment, Progress và các mutation quan trọng phải xử lý idempotency khi cần.

---

# 2. Repository Structure

Cấu trúc repository chuẩn:

```text
language-learning-platform/
│
├── frontend/                       # Next.js Frontend
│
├── backend/                        # NestJS Backend
│
├── shared/                         # Contract/schema dùng chung có kiểm soát
│   ├── api-contracts/
│   ├── constants/
│   └── types/
│
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── USE_CASES.md
│   ├── REQUIREMENTS.md
│   ├── DESIGN_SYSTEM.md
│   ├── CODEBASE_STRUCTURE.md
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── decisions/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── deployment/
│
├── scripts/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

> `frontend/` và `backend/` là hai application độc lập về runtime. Có thể deploy riêng, build riêng và scale riêng.

---

# 3. Workspace Configuration

Nếu dùng PNPM Workspace:

```yaml
packages:
  - "frontend"
  - "backend"
  - "shared/*"
```

Root `package.json` có thể dùng:

```json
{
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint"
  }
}
```

Mục tiêu của workspace:

- Đồng bộ TypeScript tooling.
- Dùng chung API contract có kiểm soát.
- Chạy Frontend / Backend song song.
- Không làm mất ranh giới Frontend / Backend.

---

# 4. Frontend — Next.js

## 4.1. Vai trò

Frontend chịu trách nhiệm:

- Public website.
- Authentication UI.
- Student learning area.
- Admin dashboard.
- Reviewer workspace.
- Form state.
- Server state cache.
- Client-side validation.
- API integration.
- WebSocket integration.
- Media playback / recording.
- UX / Design System.

Frontend **không** chịu trách nhiệm:

- Quyết định permission cuối cùng.
- Truy cập PostgreSQL trực tiếp.
- Xử lý payment webhook.
- Tính finalized test result ở client.
- Grant Course Access.
- Publish Review trực tiếp vào database.
- Issue Certificate trực tiếp.
- Lưu secret.

---

# 5. Frontend Folder Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── packages/
│   │   │   ├── trial/
│   │   │   ├── placement-test/
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── resources/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verify-email/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   │
│   │   ├── (student)/
│   │   │   ├── dashboard/
│   │   │   ├── my-courses/
│   │   │   ├── learning/
│   │   │   │   └── [courseId]/
│   │   │   ├── lesson/
│   │   │   │   └── [lessonId]/
│   │   │   ├── practice/
│   │   │   ├── exams/
│   │   │   ├── test/
│   │   │   │   └── [attemptId]/
│   │   │   ├── results/
│   │   │   ├── progress/
│   │   │   ├── vocabulary/
│   │   │   ├── learning-path/
│   │   │   ├── study-plan/
│   │   │   ├── submissions/
│   │   │   ├── certificates/
│   │   │   ├── orders/
│   │   │   ├── notifications/
│   │   │   └── profile/
│   │   │
│   │   ├── (reviewer)/
│   │   │   ├── review/
│   │   │   │   ├── queue/
│   │   │   │   └── [submissionId]/
│   │   │   └── submissions/
│   │   │
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── students/
│   │   │       ├── courses/
│   │   │       ├── modules/
│   │   │       ├── lessons/
│   │   │       ├── exercises/
│   │   │       ├── question-bank/
│   │   │       ├── tests/
│   │   │       ├── vocabulary/
│   │   │       ├── submissions/
│   │   │       ├── articles/
│   │   │       ├── resources/
│   │   │       ├── packages/
│   │   │       ├── orders/
│   │   │       ├── coupons/
│   │   │       ├── certificates/
│   │   │       ├── analytics/
│   │   │       ├── audit/
│   │   │       └── settings/
│   │   │
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── modules/
│   │   ├── lessons/
│   │   ├── learning-materials/
│   │   ├── exercises/
│   │   ├── question-bank/
│   │   ├── tests/
│   │   ├── assessments/
│   │   ├── learning-goals/
│   │   ├── learning-path/
│   │   ├── study-plan/
│   │   ├── progress/
│   │   ├── vocabulary/
│   │   ├── ielts/
│   │   ├── hsk/
│   │   ├── writing/
│   │   ├── speaking/
│   │   ├── submissions/
│   │   ├── reviews/
│   │   ├── packages/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── coupons/
│   │   ├── certificates/
│   │   ├── articles/
│   │   ├── resources/
│   │   ├── notifications/
│   │   ├── analytics/
│   │   ├── search/
│   │   ├── media/
│   │   └── ai/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── feedback/
│   │   ├── data-display/
│   │   ├── forms/
│   │   └── charts/
│   │
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   ├── use-media-query.ts
│   │   ├── use-click-outside.ts
│   │   ├── use-keyboard-shortcut.ts
│   │   ├── use-microphone.ts
│   │   └── use-websocket.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── query/
│   │   ├── socket/
│   │   ├── storage/
│   │   ├── validation/
│   │   ├── permissions/
│   │   ├── media/
│   │   ├── formatters/
│   │   └── utils/
│   │
│   ├── providers/
│   │   ├── query-provider.tsx
│   │   ├── auth-provider.tsx
│   │   ├── theme-provider.tsx
│   │   └── socket-provider.tsx
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── navigation.ts
│   │   ├── feature-flags.ts
│   │   └── app.config.ts
│   │
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── query-keys.ts
│   │   ├── storage-keys.ts
│   │   └── app.constants.ts
│   │
│   ├── types/
│   │   ├── common.types.ts
│   │   ├── auth.types.ts
│   │   ├── pagination.types.ts
│   │   └── api.types.ts
│   │
│   └── middleware.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   └── audio/
│
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
│
├── .env.local.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# 6. Frontend Route Responsibilities

## `app/`

`app/` chịu trách nhiệm:

- Routing.
- Layout composition.
- Loading state cấp route.
- Error boundary cấp route.
- Metadata / SEO.
- Server component composition khi phù hợp.

Không nên đặt business logic lớn trong `page.tsx`.

Ví dụ:

```tsx
import { CourseDetailScreen } from "@/features/courses";

export default function CoursePage() {
  return <CourseDetailScreen />;
}
```

Business UI phức tạp nằm tại:

```text
features/courses/
```

hoặc component cấp route nhỏ tại:

```text
app/(public)/courses/[slug]/_components/
```

---

# 7. Frontend Feature-Based Architecture

Mỗi feature chịu trách nhiệm cho một domain.

Ví dụ `features/courses/`:

```text
features/courses/
├── api/
│   ├── course.api.ts
│   ├── course.queries.ts
│   └── course.mutations.ts
│
├── components/
│   ├── course-card.tsx
│   ├── course-grid.tsx
│   ├── course-detail.tsx
│   ├── course-progress.tsx
│   └── course-access-badge.tsx
│
├── hooks/
│   ├── use-course.ts
│   ├── use-courses.ts
│   └── use-course-progress.ts
│
├── schemas/
│   ├── course-filter.schema.ts
│   └── course-form.schema.ts
│
├── types/
│   ├── course.types.ts
│   └── course-filter.types.ts
│
├── constants/
│   └── course.constants.ts
│
├── utils/
│   └── course.utils.ts
│
└── index.ts
```

Quy tắc:

- `features/courses` chỉ xử lý domain Course.
- Không import database model.
- Không gọi Supabase database client.
- Không tự quyết định Course Access bằng UI state.
- Access state hiển thị dựa trên response Backend.

---

# 8. Shared Components

Shared component nằm tại:

```text
frontend/src/components/
```

Ví dụ:

```text
components/ui/
├── button.tsx
├── input.tsx
├── textarea.tsx
├── dialog.tsx
├── dropdown.tsx
├── tooltip.tsx
├── badge.tsx
├── tabs.tsx
├── progress.tsx
└── avatar.tsx
```

Shared UI không biết domain IELTS / HSK.

Ví dụ tốt:

```tsx
<Button variant="primary">
  Tiếp tục học
</Button>
```

Feature component mới biết nghiệp vụ:

```tsx
<CourseCard course={course} />
```

---

# 9. Frontend Hooks

## Global Hooks

```text
frontend/src/hooks/
├── use-debounce.ts
├── use-media-query.ts
├── use-click-outside.ts
├── use-keyboard-shortcut.ts
├── use-microphone.ts
└── use-websocket.ts
```

## Feature Hooks

Ví dụ:

```text
features/tests/hooks/
├── use-test.ts
├── use-test-attempt.ts
├── use-save-answer.ts
├── use-submit-test.ts
└── use-test-timer.ts
```

Không tạo hook kiểu:

```text
useEverything()
```

---

# 10. Frontend API Layer

Không gọi `fetch()` rải rác trong component.

Không nên:

```tsx
const response = await fetch("/api/v1/courses");
```

Nên có API client chung:

```text
frontend/src/lib/api/
├── client.ts
├── request.ts
├── response.ts
├── error.ts
└── interceptors.ts
```

Feature API:

```text
features/courses/api/
├── course.api.ts
├── course.queries.ts
└── course.mutations.ts
```

Ví dụ:

```ts
export const courseApi = {
  getBySlug: (slug: string) =>
    apiClient.get<CourseResponse>(`/courses/slug/${slug}`),

  enroll: (courseId: string) =>
    apiClient.post<EnrollmentResponse>(
      `/courses/${courseId}/enroll`,
      {},
    ),
};
```

---

# 11. Frontend Server State

Phân loại state:

```text
Server State
    ↓
TanStack Query

Form State
    ↓
React Hook Form

Local UI State
    ↓
useState / useReducer

Shared Client State
    ↓
Zustand khi thật sự cần

Realtime State
    ↓
Socket handlers + Query Cache
```

Không đưa toàn bộ app vào một global store.

---

# 12. Frontend Validation

Dùng schema:

```text
features/auth/schemas/
features/courses/schemas/
features/tests/schemas/
features/submissions/schemas/
```

Ví dụ:

```ts
const learningGoalSchema = z.object({
  examId: z.string().uuid(),
  targetLevelId: z.string().uuid(),
  targetDate: z.string().optional(),
  dailyStudyMinutes: z.number().min(10).max(480),
});
```

Frontend validation phục vụ UX.

Backend vẫn phải validate lại.

---

# 13. Frontend Domain Types

Không tạo:

```text
types.ts
```

chứa toàn bộ type của project.

Nên:

```text
features/courses/types/
features/tests/types/
features/vocabulary/types/
features/assessments/types/
features/progress/types/
```

Phân loại:

```text
API Request / Response → shared/api-contracts hoặc feature API types
UI State              → feature/types hoặc store
Form Type             → schema inference
Shared Primitive      → frontend/src/types
```

---

# 14. Backend — NestJS

## 14.1. Vai trò

Backend chịu trách nhiệm:

- Authentication.
- Authorization.
- Business rules.
- Course access.
- Learning progress.
- Assessment.
- Test scoring.
- Question Bank.
- Submission.
- Review.
- Payment.
- Coupon.
- Certificate.
- CMS.
- Notification.
- Audit.
- Realtime events.
- AI orchestration.
- Data persistence.

---

# 15. Backend Folder Structure

```text
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── auth.config.ts
│   │   ├── database.config.ts
│   │   ├── supabase.config.ts
│   │   ├── redis.config.ts
│   │   ├── storage.config.ts
│   │   ├── email.config.ts
│   │   ├── payment.config.ts
│   │   └── ai.config.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   ├── pipes/
│   │   ├── middleware/
│   │   ├── exceptions/
│   │   ├── error-codes/
│   │   ├── constants/
│   │   ├── logger/
│   │   └── utils/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── languages/
│   │   ├── exams/
│   │   ├── levels/
│   │   ├── skills/
│   │   ├── courses/
│   │   ├── modules/
│   │   ├── lessons/
│   │   ├── learning-materials/
│   │   ├── enrollments/
│   │   ├── exercises/
│   │   ├── question-bank/
│   │   ├── tests/
│   │   ├── assessments/
│   │   ├── learning-goals/
│   │   ├── learning-paths/
│   │   ├── study-plans/
│   │   ├── progress/
│   │   ├── vocabulary/
│   │   ├── submissions/
│   │   ├── reviews/
│   │   ├── packages/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── coupons/
│   │   ├── certificates/
│   │   ├── cms/
│   │   ├── notifications/
│   │   ├── search/
│   │   ├── media/
│   │   ├── analytics/
│   │   ├── activity/
│   │   ├── audit/
│   │   ├── realtime/
│   │   └── ai/
│   │
│   ├── database/
│   │   ├── prisma/
│   │   ├── migrations/
│   │   ├── seed/
│   │   └── transaction/
│   │
│   ├── integrations/
│   │   ├── supabase/
│   │   │   ├── supabase.module.ts
│   │   │   ├── supabase.client.ts
│   │   │   └── supabase-auth.service.ts
│   │   ├── redis/
│   │   ├── storage/
│   │   ├── email/
│   │   ├── payment/
│   │   └── ai/
│   │
│   ├── events/
│   │   ├── event-bus.ts
│   │   ├── event.types.ts
│   │   └── handlers/
│   │
│   ├── jobs/
│   │   ├── queues/
│   │   ├── processors/
│   │   └── schedules/
│   │
│   └── health/
│       ├── health.module.ts
│       └── health.controller.ts
│
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── nest-cli.json
├── tsconfig.json
├── package.json
└── README.md
```

---

# 16. Backend Module Structure

Mỗi domain là module độc lập.

Ví dụ `modules/courses/`:

```text
modules/courses/
├── courses.module.ts
│
├── controllers/
│   ├── courses.controller.ts
│   └── admin-courses.controller.ts
│
├── services/
│   ├── create-course.service.ts
│   ├── update-course.service.ts
│   ├── publish-course.service.ts
│   ├── archive-course.service.ts
│   ├── get-course.service.ts
│   └── list-courses.service.ts
│
├── repositories/
│   ├── course.repository.interface.ts
│   └── course.repository.ts
│
├── dto/
│   ├── create-course.dto.ts
│   ├── update-course.dto.ts
│   └── course-filter.dto.ts
│
├── entities/
│   └── course.entity.ts
│
├── policies/
│   └── course.policy.ts
│
├── validators/
│   └── course.validator.ts
│
├── mappers/
│   └── course.mapper.ts
│
├── events/
│   ├── course-published.event.ts
│   └── course-archived.event.ts
│
└── index.ts
```

---

# 17. Controller

Controller chỉ xử lý HTTP boundary.

Không nên:

```ts
@Post()
async create(@Body() dto: CreateCourseDto) {
  // check permission
  // query database
  // validate exam version
  // create course
  // emit event
}
```

Nên:

```ts
@Post()
create(
  @CurrentUser() user: AuthUser,
  @Body() dto: CreateCourseDto,
) {
  return this.createCourseService.execute({
    actorId: user.id,
    ...dto,
  });
}
```

Flow:

```text
HTTP Request
    ↓
Authentication
    ↓
DTO Validation
    ↓
Controller
    ↓
Service / Use Case
    ↓
HTTP Response
```

---

# 18. Service / Use Case

Business logic đặt trong service / use case.

Ví dụ:

```text
create-course.service.ts
publish-course.service.ts
submit-test-attempt.service.ts
calculate-assessment-result.service.ts
grant-course-access.service.ts
publish-review.service.ts
complete-order.service.ts
issue-certificate.service.ts
```

Ví dụ flow `SubmitTestAttemptService`:

```text
1. Load Attempt
2. Verify Student ownership
3. Check attempt state
4. Lock / idempotency check
5. Validate answers
6. Finalize answer snapshot
7. Auto-grade supported questions
8. Create / update TestResult
9. Mark attempt submitted
10. Update Progress
11. Emit domain event
12. Queue async side effects
```

---

# 19. Repository

Repository là abstraction cho data access.

Ví dụ:

```ts
export interface CourseRepository {
  findById(id: string): Promise<Course | null>;

  findBySlug(slug: string): Promise<Course | null>;

  create(data: CreateCourseData): Promise<Course>;

  update(
    id: string,
    data: UpdateCourseData,
  ): Promise<Course>;

  archive(id: string): Promise<void>;
}
```

Service không phụ thuộc trực tiếp vào Prisma / Supabase query.

Không nên:

```text
Controller
→ prisma.course.create()
```

Nên:

```text
Controller
→ Service
→ Repository
→ Prisma/PostgreSQL
```

---

# 20. DTO

DTO mô tả API input.

Ví dụ:

```text
modules/tests/dto/
├── create-test.dto.ts
├── update-test.dto.ts
├── add-test-question.dto.ts
├── save-answer.dto.ts
└── submit-test-attempt.dto.ts
```

DTO chịu trách nhiệm:

- Required field.
- Optional field.
- Primitive validation.
- Enum validation.
- Format validation.

DTO không chịu trách nhiệm:

- Course access.
- Payment rule.
- Test state rule.
- Scoring business logic.

---

# 21. Entity

Domain Entity không nhất thiết bằng database row.

Ví dụ:

```ts
export interface TestAttempt {
  id: string;
  testId: string;
  testVersionId: string;
  userId: string;
  status: TestAttemptStatus;
  startedAt: Date;
  submittedAt: Date | null;
  finalizedAt: Date | null;
}
```

Không đồng nhất máy móc:

```text
Database Model
=
Domain Entity
=
API Response
```

---

# 22. Mapper

Mapper chuyển đổi giữa layer.

```text
Database Model
      ↓
Repository
      ↓
Domain Entity
      ↓
Mapper
      ↓
API Response
```

Ví dụ:

```ts
CourseMapper.toResponse(course)
TestResultMapper.toResponse(result)
```

Lợi ích:

- Không expose database model.
- Dễ thay đổi API response.
- Dễ đổi data layer.
- Giảm coupling.

---

# 23. Authorization / Policy

Authorization được tách thành policy hoặc service.

Ví dụ:

```text
modules/courses/policies/course.policy.ts
modules/submissions/policies/submission.policy.ts
modules/reviews/policies/review.policy.ts
modules/orders/policies/order.policy.ts
```

Ví dụ:

```ts
coursePolicy.canManage({
  user,
  course,
});
```

Không nên rải:

```ts
if (user.role === "ADMIN") { ... }
```

ở tất cả controller.

---

# 24. Course Access Architecture

Course Access là một business concern riêng.

Flow:

```text
Student requests Lesson
        ↓
Lesson Service
        ↓
CourseAccessService
        ↓
Check:
- Enrollment
- Package Entitlement
- Trial Access
- Admin Grant
- Expiry / Revocation
        ↓
Allow / Deny
```

Frontend chỉ hiển thị trạng thái.

Backend là nguồn canonical.

---

# 25. Question Bank Architecture

```text
modules/question-bank/
├── question-bank.module.ts
├── controllers/
├── services/
│   ├── create-question.service.ts
│   ├── update-question.service.ts
│   ├── archive-question.service.ts
│   ├── import-questions.service.ts
│   └── search-questions.service.ts
├── repositories/
├── dto/
├── entities/
├── validators/
├── mappers/
└── question-types/
    ├── multiple-choice/
    ├── true-false-not-given/
    ├── matching/
    ├── completion/
    └── short-answer/
```

Question type logic nên tách theo strategy.

Ví dụ:

```text
Question
    ↓
QuestionTypeResolver
    ↓
ScoringStrategy
    ↓
Result
```

---

# 26. Test Engine Architecture

```text
modules/tests/
├── controllers/
├── services/
│   ├── create-test.service.ts
│   ├── publish-test.service.ts
│   ├── create-attempt.service.ts
│   ├── save-answer.service.ts
│   ├── submit-attempt.service.ts
│   ├── score-attempt.service.ts
│   └── get-result.service.ts
├── repositories/
├── dto/
├── entities/
├── policies/
├── scoring/
│   ├── scoring-engine.ts
│   ├── scoring-strategy.interface.ts
│   └── strategies/
├── versioning/
│   └── test-version.service.ts
└── events/
```

Nguyên tắc:

- Attempt gắn với TestVersion.
- Result finalized không bị silent overwrite.
- Timer dùng server time.
- Submit phải idempotent.
- Manual review và auto grading phải phân biệt.

---

# 27. IELTS Module

Không nhất thiết tạo toàn bộ IELTS thành một bảng dữ liệu riêng.

IELTS là composition của:

```text
Exam
ExamVersion
Skill
Course
Question
Test
Submission
Review
Scoring Config
```

Có thể có module điều phối:

```text
modules/ielts/
├── ielts.module.ts
├── services/
│   ├── calculate-estimated-band.service.ts
│   ├── build-skill-result.service.ts
│   └── get-ielts-dashboard.service.ts
├── scoring/
├── types/
└── constants/
```

IELTS Writing / Speaking reuse:

```text
submissions/
reviews/
```

---

# 28. HSK Module

HSK reuse core domain:

```text
Exam
ExamVersion
Level
Skill
Vocabulary
Course
Question
Test
Progress
```

Module điều phối:

```text
modules/hsk/
├── hsk.module.ts
├── services/
│   ├── get-hsk-level.service.ts
│   ├── build-hsk-result.service.ts
│   └── get-hsk-dashboard.service.ts
├── types/
└── constants/
```

Không hard-code HSK format ở Frontend.

---

# 29. Assessment Architecture

```text
modules/assessments/
├── controllers/
├── services/
│   ├── start-assessment.service.ts
│   ├── submit-assessment.service.ts
│   ├── calculate-result.service.ts
│   ├── build-learning-gap.service.ts
│   └── recommend-path.service.ts
├── repositories/
├── dto/
├── entities/
├── scoring/
├── policies/
└── events/
```

Flow:

```text
Start
→ Attempt
→ Answer
→ Submit
→ Score
→ Assessment Result
→ Learning Gap
→ Learning Path Suggestion
```

---

# 30. Learning Path Architecture

```text
modules/learning-paths/
├── controllers/
├── services/
│   ├── create-learning-path.service.ts
│   ├── regenerate-learning-path.service.ts
│   ├── get-learning-path.service.ts
│   └── get-next-learning.service.ts
├── repositories/
├── entities/
├── dto/
└── rules/
```

Input:

```text
Learning Goal
+
Assessment Result
+
Learning Gap
+
Course Prerequisites
+
Completed Progress
```

Output:

```text
Learning Path
+
Path Items
+
Suggested Next Learning
```

---

# 31. Progress Architecture

```text
modules/progress/
├── controllers/
├── services/
│   ├── record-lesson-progress.service.ts
│   ├── record-exercise-progress.service.ts
│   ├── calculate-course-progress.service.ts
│   ├── calculate-skill-progress.service.ts
│   └── get-dashboard-progress.service.ts
├── repositories/
├── entities/
└── events/
```

Nguyên tắc:

- Progress event phải idempotent.
- Không cộng duplicate do retry.
- Server là nguồn canonical.
- Completed state có timestamp.

---

# 32. Vocabulary Architecture

```text
modules/vocabulary/
├── controllers/
├── services/
│   ├── create-vocabulary.service.ts
│   ├── search-vocabulary.service.ts
│   ├── add-user-vocabulary.service.ts
│   ├── update-vocabulary-state.service.ts
│   └── generate-practice.service.ts
├── repositories/
├── dto/
├── entities/
├── practice/
└── events/
```

User state:

```text
NEW
LEARNING
REVIEW
MASTERED
```

Master Vocabulary và UserVocabulary phải tách.

---

# 33. Submission Architecture

```text
modules/submissions/
├── controllers/
├── services/
│   ├── create-writing-submission.service.ts
│   ├── create-speaking-submission.service.ts
│   ├── submit-submission.service.ts
│   ├── return-submission.service.ts
│   └── get-submission.service.ts
├── repositories/
├── dto/
├── entities/
├── policies/
└── events/
```

Speaking audio dùng Media module / Storage integration.

---

# 34. Review Architecture

```text
modules/reviews/
├── controllers/
├── services/
│   ├── list-review-queue.service.ts
│   ├── assign-reviewer.service.ts
│   ├── save-review-draft.service.ts
│   ├── publish-review.service.ts
│   └── revise-review.service.ts
├── repositories/
├── dto/
├── entities/
├── policies/
└── events/
```

Publish review có audit.

---

# 35. Commerce Architecture

## Package

```text
modules/packages/
```

## Order

```text
modules/orders/
```

## Payment

```text
modules/payments/
```

## Coupon

```text
modules/coupons/
```

Flow:

```text
Checkout
→ Create Order
→ Apply Coupon
→ Create Payment
→ Payment Provider
→ Webhook
→ Verify
→ Update Payment
→ Complete Order
→ Grant Course Access
→ Notification
```

Payment webhook không nằm ở Frontend.

---

# 36. Media / Storage

```text
modules/media/
├── controllers/
├── services/
│   ├── create-upload.service.ts
│   ├── complete-upload.service.ts
│   ├── get-media-access.service.ts
│   └── delete-media.service.ts
├── repositories/
├── dto/
└── policies/
```

Integration:

```text
integrations/storage/
├── storage.module.ts
├── storage.provider.ts
├── supabase-storage.provider.ts
└── signed-url.service.ts
```

Private media:

```text
Request
→ Authorization
→ Signed URL / Stream Token
→ Storage
```

---

# 37. Notification Architecture

```text
modules/notifications/
├── controllers/
├── services/
│   ├── create-notification.service.ts
│   ├── list-notifications.service.ts
│   ├── mark-read.service.ts
│   └── mark-all-read.service.ts
├── repositories/
├── channels/
│   ├── in-app.channel.ts
│   ├── email.channel.ts
│   └── realtime.channel.ts
└── events/
```

Ví dụ:

```text
ReviewPublishedEvent
      ↓
Notification Handler
      ├── In-app
      ├── Socket.IO
      └── Email
```

---

# 38. Realtime Architecture

Realtime tách khỏi REST Controller.

```text
modules/realtime/
├── realtime.module.ts
├── gateways/
│   ├── notification.gateway.ts
│   └── status.gateway.ts
├── handlers/
│   ├── review-events.handler.ts
│   ├── payment-events.handler.ts
│   └── notification-events.handler.ts
└── rooms/
    └── realtime-room.service.ts
```

Flow:

```text
Service
  │
  ├── Database Transaction
  │
  └── Commit
       │
       ▼
  Domain Event
       │
       ▼
  Realtime Handler
       │
       ▼
    Socket.IO
       │
       ▼
    Frontend
```

Không emit event trước commit.

---

# 39. Redis

Redis tập trung tại integration:

```text
integrations/redis/
├── redis.module.ts
├── redis.client.ts
├── cache.service.ts
├── lock.service.ts
├── rate-limit.service.ts
└── pubsub.service.ts
```

Use cases:

- Cache.
- Rate limiting.
- Distributed lock.
- Temporary state.
- Job coordination.
- Pub/Sub.
- Idempotency support.

Không gọi Redis client trực tiếp rải rác.

---

# 40. Background Jobs

```text
jobs/
├── queues/
│   ├── email.queue.ts
│   ├── notification.queue.ts
│   ├── media.queue.ts
│   └── analytics.queue.ts
├── processors/
│   ├── email.processor.ts
│   ├── notification.processor.ts
│   ├── media.processor.ts
│   └── analytics.processor.ts
└── schedules/
    ├── study-reminder.schedule.ts
    └── cleanup.schedule.ts
```

Use cases:

- Email.
- Notification.
- Media processing.
- Analytics aggregation.
- Study reminder.
- Cleanup expired token.
- Certificate background generation.

---

# 41. AI Architecture

AI là module độc lập.

```text
modules/ai/
├── ai.module.ts
├── controllers/
│   └── ai.controller.ts
├── services/
│   ├── explain-answer.service.ts
│   ├── generate-practice.service.ts
│   ├── analyze-writing.service.ts
│   ├── analyze-speaking.service.ts
│   ├── suggest-study-plan.service.ts
│   └── tutor-chat.service.ts
├── providers/
│   ├── llm.provider.ts
│   └── prompt.provider.ts
├── prompts/
├── schemas/
├── dto/
└── types/
```

Flow:

```text
Frontend
  ↓
Backend AI API
  ↓
AI Service
  ↓
Prompt Builder
  ↓
LLM Provider
  ↓
Output Schema Validation
  ↓
Domain-safe Result
  ↓
Frontend
```

AI không được gọi trực tiếp từ UI bằng secret key.

---

# 42. API Contracts

Shared contract chỉ chứa dữ liệu thực sự cần chia sẻ.

```text
shared/api-contracts/
├── common/
│   ├── api-response.ts
│   ├── error-response.ts
│   └── pagination.ts
├── auth/
├── users/
├── courses/
├── lessons/
├── exercises/
├── questions/
├── tests/
├── assessments/
├── progress/
├── vocabulary/
├── submissions/
├── reviews/
├── orders/
├── payments/
└── notifications/
```

Không đưa toàn bộ Backend Domain Entity vào shared.

Ví dụ:

```ts
export interface CourseSummaryResponse {
  id: string;
  slug: string;
  title: string;
  languageCode: string;
  examCode?: string | null;
  levelCode?: string | null;
}
```

---

# 43. API Response Standard

## Success

```json
{
  "data": {},
  "meta": {
    "requestId": "req_..."
  }
}
```

## Pagination

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "requestId": "req_..."
  }
}
```

## Error

```json
{
  "error": {
    "code": "COURSE_ACCESS_DENIED",
    "message": "You do not have access to this course.",
    "requestId": "req_..."
  }
}
```

Frontend xử lý dựa trên `code`, không phụ thuộc hoàn toàn vào `message`.

---

# 44. Backend Route Organization

Base:

```text
/api/v1
```

Routes chính:

```text
/api/v1/auth
/api/v1/users
/api/v1/languages
/api/v1/exams
/api/v1/levels
/api/v1/skills

/api/v1/courses
/api/v1/modules
/api/v1/lessons
/api/v1/learning-materials
/api/v1/enrollments

/api/v1/exercises
/api/v1/questions
/api/v1/tests
/api/v1/test-attempts

/api/v1/assessments
/api/v1/learning-goals
/api/v1/learning-paths
/api/v1/study-plans
/api/v1/progress

/api/v1/vocabulary

/api/v1/submissions
/api/v1/reviews

/api/v1/packages
/api/v1/orders
/api/v1/payments
/api/v1/coupons

/api/v1/certificates

/api/v1/articles
/api/v1/resources

/api/v1/notifications
/api/v1/search
/api/v1/media
/api/v1/analytics
/api/v1/ai
```

Version API từ đầu.

---

# 45. Example Flow — Student học Lesson

```text
Student opens Lesson
        │
        ▼
Next.js Lesson Page
        │
        ▼
useLesson()
        │
        ▼
lesson.api.ts
        │
        ▼
GET /api/v1/lessons/:lessonId
        │
        ▼
LessonsController
        │
        ▼
GetLessonService
        │
        ├── LessonRepository
        ├── CourseAccessService
        └── ProgressRepository
        │
        ▼
Lesson Response
        │
        ▼
Frontend renders
```

---

# 46. Example Flow — Submit Test

```text
Student clicks Submit
        │
        ▼
useSubmitTest()
        │
        ▼
test.api.ts
        │
        ▼
POST /api/v1/test-attempts/:id/submit
        │
        ▼
TestAttemptsController
        │
        ▼
SubmitTestAttemptService
        │
        ├── Attempt Policy
        ├── Idempotency Check
        ├── TestAttemptRepository
        ├── TestAnswerRepository
        ├── Scoring Engine
        ├── TestResultRepository
        ├── Progress Service
        └── Domain Event
        │
        ▼
Transaction Commit
        │
        ▼
Result Response
```

---

# 47. Example Flow — Placement Test

```text
Student starts Placement Test
        │
        ▼
Assessment API
        │
        ▼
StartAssessmentService
        │
        ▼
Assessment Attempt
        │
        ▼
Student answers
        │
        ▼
SubmitAssessmentService
        │
        ▼
CalculateAssessmentResultService
        │
        ├── Scoring Config
        ├── Skill Result
        ├── Estimated Level
        └── Learning Gap
        │
        ▼
Create / Suggest Learning Path
        │
        ▼
Student Dashboard
```

---

# 48. Example Flow — Writing Review

```text
Student writes answer
        │
        ▼
WritingEditor
        │
        ▼
Create / Update Submission
        │
        ▼
Submit
        │
        ▼
Submission Service
        │
        ▼
Review Queue
        │
        ▼
Reviewer opens submission
        │
        ▼
Review Workspace
        │
        ▼
PublishReviewService
        │
        ├── Save Criteria
        ├── Save Feedback
        ├── Audit
        └── ReviewPublishedEvent
        │
        ▼
Notification
        │
        ▼
Student sees feedback
```

---

# 49. Example Flow — Payment

```text
Student Checkout
        │
        ▼
CreateOrder API
        │
        ▼
OrderService
        │
        ▼
CreatePayment
        │
        ▼
Payment Provider
        │
        ▼
Webhook
        │
        ▼
PaymentWebhookController
        │
        ▼
Verify Provider Signature
        │
        ▼
Payment Service
        │
        ├── Idempotency
        ├── Update Payment
        ├── Complete Order
        └── Grant Course Access
        │
        ▼
Notification
```

Frontend redirect không phải nguồn xác nhận payment.

---

# 50. Naming Convention

## Frontend

```text
course-card.tsx
course.api.ts
course.queries.ts
use-course.ts
course.types.ts
course.schema.ts
course.constants.ts
```

## Backend

```text
courses.controller.ts
create-course.service.ts
course.repository.ts
create-course.dto.ts
course.entity.ts
course.policy.ts
course.mapper.ts
```

Tên file phải phản ánh đúng trách nhiệm.

---

# 51. Import Rules

## Frontend

Dependency direction:

```text
app/
 ↓
features/
 ↓
components / hooks / lib
 ↓
shared utilities
```

Không:

```text
components/ui → features
lib → business feature
UI Component → Database
UI Component → Supabase DB
```

---

## Backend

Dependency direction:

```text
Controller
    ↓
Service / Use Case
    ↓
Repository Interface
    ↓
Repository Implementation
    ↓
Infrastructure / Database
```

Không:

```text
Repository → Controller
Domain Service → React
Controller → Direct SQL
Frontend → Backend Repository
```

---

# 52. Database Access

Tất cả nghiệp vụ chính đi qua Backend.

```text
Frontend
   ↓
REST API / WebSocket
   ↓
Backend
   ↓
Service
   ↓
Repository
   ↓
Supabase PostgreSQL
```

Không:

```text
Frontend
   ↓
Supabase Database
```

cho các nghiệp vụ có:

- authorization,
- commerce,
- assessment,
- progress,
- course access,
- test result,
- review,
- certificate.

---

# 53. Environment Variables

## Frontend

```text
frontend/.env.local
frontend/src/config/env.ts
```

Ví dụ:

```ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};
```

Frontend chỉ dùng public configuration.

Supabase public configuration chỉ cần khi Frontend dùng:

- Supabase Auth client.
- Signed/direct upload flow.

Không chứa:

- Database password.
- `SUPABASE_SERVICE_ROLE_KEY`.
- Payment secret.
- LLM secret.
- Email secret.

## Backend

```text
backend/.env
backend/src/config/
```

Backend validate environment khi startup.

---

# 53.1. Supabase Integration Rules

Baseline:

```text
Supabase PostgreSQL   → database
Supabase Auth         → identity/session
Supabase Storage      → media/file
```

NestJS vẫn là business gateway:

```text
Frontend
→ REST API / WebSocket
→ NestJS
→ Supabase
```

## Database

```text
NestJS Service
→ Repository
→ Prisma
→ Supabase PostgreSQL
```

Không để Frontend query trực tiếp business-critical tables như:

- test attempts/results,
- progress,
- orders/payments,
- course access,
- reviews,
- certificates.

## Auth

Identity flow:

```text
Supabase Auth
→ JWT
→ NestJS Auth Guard
→ Application User
→ Role / Policy
→ Business Service
```

Supabase Auth xử lý:

- email/password,
- verification,
- password reset,
- session/JWT.

NestJS xử lý:

- role,
- permission,
- resource ownership,
- course entitlement,
- admin/reviewer scope.

## Storage

Bucket baseline:

```text
avatars
public-content
lesson-media
speaking-submissions
resources
certificates
```

Premium/private file:

```text
Frontend
→ Media API
→ Backend authorization
→ Signed URL
→ Supabase Storage
```

Upload file lớn:

```text
Frontend
→ Create Upload Intent API
→ Backend validates
→ Signed Upload URL
→ Direct upload to Supabase Storage
→ Confirm upload
→ Save media_files metadata
```

## Security

Không được:

```text
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
```

`service_role` key chỉ ở Backend.

RLS là defense-in-depth, không thay thế Backend business authorization.


# 54. Error Handling

## Frontend

```text
frontend/src/lib/api/error.ts
```

Responsibilities:

- Parse API error.
- Map error code.
- Display message phù hợp.
- Retry policy khi phù hợp.

## Backend

```text
backend/src/common/
├── exceptions/
├── filters/
└── error-codes/
```

Ví dụ code:

```text
AUTH_INVALID_CREDENTIALS
COURSE_NOT_FOUND
COURSE_ACCESS_DENIED
LESSON_NOT_FOUND
TEST_NOT_AVAILABLE
TEST_ATTEMPT_ALREADY_SUBMITTED
ASSESSMENT_NOT_AVAILABLE
SUBMISSION_ALREADY_SUBMITTED
REVIEW_ACCESS_DENIED
PAYMENT_VERIFICATION_FAILED
COUPON_INVALID
MEDIA_ACCESS_DENIED
```

Không trả:

- stack trace,
- SQL error,
- secret,
- answer key ngoài policy.

---

# 55. Logging

Backend:

```text
common/logger/
├── logger.service.ts
├── logger.interceptor.ts
└── logger.types.ts
```

Mỗi request nên có:

```text
requestId
userId
route
method
duration
statusCode
```

Không log:

- password,
- reset token,
- payment secret,
- raw credential.

---

# 56. Activity và Audit

Tách hai mục đích:

## Activity

User-facing / learning activity:

- Started Course.
- Completed Lesson.
- Submitted Test.
- Added Vocabulary.
- Received Review.
- Earned Certificate.

## Audit

Security / admin:

- Role changed.
- Course published.
- Test version published.
- Payment manually adjusted.
- Review revised after publish.
- Certificate revoked.

Audit log không bị sửa bởi normal application flow.

---

# 57. Testing Structure

## Frontend

```text
frontend/tests/
├── unit/
├── component/
└── e2e/
```

Feature-local test:

```text
features/courses/
└── __tests__/
    ├── course.utils.test.ts
    ├── course.api.test.ts
    └── course-card.test.tsx
```

## Backend

```text
backend/test/
├── unit/
├── integration/
└── e2e/
```

Module-local test:

```text
modules/tests/
└── __tests__/
    ├── submit-test-attempt.service.spec.ts
    ├── scoring-engine.spec.ts
    └── test.repository.spec.ts
```

---

# 58. Test Strategy

## Unit Test

Tập trung:

- Scoring rule.
- Progress calculation.
- Coupon validation.
- Course access policy.
- Learning path rule.
- Mapper.
- Utility.

## Integration Test

Tập trung:

- Repository + DB.
- Service + transaction.
- Payment webhook.
- Test submit.
- Review publish.
- Enrollment / access grant.

## E2E

Core flows:

```text
Register
→ Placement Test
→ Learning Path
→ Course
→ Lesson
→ Exercise
→ Test
→ Progress
```

và:

```text
Checkout
→ Payment
→ Access
```

---

# 59. Shared Code Rules

Chỉ đưa code vào `shared/` nếu Frontend và Backend thật sự cùng dùng.

Ví dụ phù hợp:

- Request / Response interface.
- API pagination contract.
- Error code enum nếu thống nhất.
- Primitive constants không chứa secret.

Không đưa:

- Prisma model.
- Repository.
- Backend service.
- NestJS decorator.
- React component.

---

# 60. Recommended Golden Structure

```text
language-learning-platform/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── config/
│   │   ├── constants/
│   │   └── types/
│   ├── public/
│   └── tests/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── common/
│   │   ├── config/
│   │   ├── database/
│   │   ├── integrations/
│   │   ├── events/
│   │   ├── jobs/
│   │   └── health/
│   └── test/
│
├── shared/
│   ├── api-contracts/
│   ├── constants/
│   └── types/
│
├── docs/
├── infrastructure/
├── scripts/
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

Đây là baseline chính thức nên dùng cho project.

---

# 61. Quy tắc phát triển Feature mới

Khi thêm feature mới:

```text
1. Xác định Domain
        ↓
2. Xác định Requirement / Use Case
        ↓
3. Thiết kế API Contract
        ↓
4. Backend DTO
        ↓
5. Backend Service / Use Case
        ↓
6. Repository
        ↓
7. Policy / Authorization
        ↓
8. Event / Notification nếu cần
        ↓
9. Frontend API
        ↓
10. Frontend Query / Mutation
        ↓
11. Frontend Hook
        ↓
12. Frontend Component
        ↓
13. Route Integration
        ↓
14. Unit Test
        ↓
15. Integration Test
        ↓
16. E2E Test
```

---

# 62. Quy tắc Review Pull Request

Trước khi merge:

```text
[ ] Code nằm đúng Frontend / Backend chưa?
[ ] Feature có đúng domain chưa?
[ ] Component có gọi API trực tiếp không?
[ ] Component có business logic lớn không?
[ ] Backend Controller có business logic không?
[ ] DTO có validation chưa?
[ ] Authorization kiểm tra ở Backend chưa?
[ ] Database access có qua repository/data layer chưa?
[ ] API contract đã rõ chưa?
[ ] Error code đã thống nhất chưa?
[ ] Idempotency có cần không?
[ ] Transaction có cần không?
[ ] Audit có cần không?
[ ] Notification có cần không?
[ ] Realtime event có cần không?
[ ] TestVersion / ExamVersion có bị hard-code không?
[ ] Có unit test không?
[ ] Có integration test cho flow quan trọng không?
[ ] Có E2E test cho user journey quan trọng không?
[ ] Có circular import không?
[ ] Có duplicate code không?
```

---

# 63. Những điều không được làm

```text
Frontend Component → Database
Frontend → Supabase DB cho business-critical data
Frontend → Payment secret
Frontend → LLM secret

Controller → SQL phức tạp
Controller → Business logic lớn

Service → React
Repository → Controller

Một file global types.ts chứa toàn hệ thống
Một file global utils.ts chứa mọi utility
Hard-code IELTS/HSK scoring ở UI
Hard-code Course Access ở UI
Trust payment redirect từ client
Emit realtime event trước DB commit
```

---

# 64. Kiến trúc mục tiêu

```text
                    PRESENTATION
                         │
             ┌───────────┴───────────┐
             │                       │
        FRONTEND                  BACKEND
         Next.js                   NestJS
             │                       │
             ▼                       ▼
      Pages / Components         Controllers
             │                       │
        Hooks / Queries            Services
             │                       │
          API Client              Policies
             │                       │
             └───────────┬───────────┘
                         │
                    API CONTRACTS
                         │
                         ▼
                  DOMAIN / DATA
                         │
        ┌────────────────┼─────────────────┐
        │                │                 │
   Supabase DB         Redis          Supabase Storage
        │                │                 │
        └────────────────┼─────────────────┘
                         │
                  External Services
                         │
            ┌────────────┼────────────┐
            │            │            │
           AI         Payment        Email
```

Mục tiêu không phải tạo thật nhiều thư mục.

Mục tiêu là:

```text
Mỗi layer
→ một trách nhiệm rõ ràng

Mỗi domain
→ một nơi sở hữu logic

Frontend
→ UI + Client Integration

Backend
→ Business + Security + Persistence
```

---

# 65. Kết luận

Cấu trúc này phù hợp cho Web Học Ngoại Ngữ có các domain:

```text
Authentication
Users
Languages
Exams
Exam Versions
Levels
Skills

Courses
Modules
Lessons
Learning Materials
Exercises
Question Bank
Tests

IELTS
HSK
Placement / Diagnostic Assessment

Learning Goals
Learning Paths
Study Plans
Progress

Vocabulary
Writing
Speaking
Submissions
Reviews

Packages
Orders
Payments
Coupons

CMS
Notifications
Certificates
Analytics
Search
Media
Realtime
Audit
AI
```

Developer có thể tìm code theo nguyên tắc:

```text
"What am I changing?"
        ↓
"Which domain owns it?"
        ↓
"Frontend feature or Backend module?"
        ↓
"Which API contract connects them?"
        ↓
"Which tests prove it works?"
```

Đây là cấu trúc baseline nên được thống nhất trước khi bắt đầu triển khai source code chính.
