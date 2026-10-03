# Web Học Ngoại Ngữ — Project Documentation

Hệ thống học ngoại ngữ trực tuyến tập trung vào:

- **Tiếng Anh theo IELTS**.
- **Tiếng Trung theo HSK**.

Dự án được tổ chức theo mô hình **Frontend / Backend tách biệt**:

```text
Frontend: Next.js
Backend:  NestJS
```

Frontend và Backend giao tiếp qua:

- REST API.
- WebSocket / Socket.IO khi cần realtime.

Frontend không truy cập trực tiếp database cho các nghiệp vụ chính.

---

## Documents

- [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) — Tổng quan sản phẩm, kiến trúc và công nghệ.
- [USE_CASES.md](./docs/USE_CASES.md) — Danh mục và đặc tả Use Case.
- [REQUIREMENTS.md](./docs/REQUIREMENTS.md) — Yêu cầu chức năng, phi chức năng và quy tắc nghiệp vụ.
- [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) — Design System Glassmorphism, component rules và color tokens.
- [CODEBASE_STRUCTURE.md](./docs/CODEBASE_STRUCTURE.md) — Quy tắc tổ chức source code Frontend / Backend.

---

# Tech Stack

## Frontend

- Next.js.
- React.
- TypeScript.
- TanStack Query.
- React Hook Form.
- Zod.
- Zustand khi cần client state dùng chung.
- Socket.IO Client.
- Tailwind CSS hoặc CSS token theo Design System.
- Playwright.

## Backend

- NestJS.
- TypeScript.
- REST API.
- Socket.IO Gateway.
- Prisma hoặc repository adapter tương ứng.
- PostgreSQL / Supabase.
- Redis.
- Object Storage / S3-compatible storage.
- Jest.

## External Services

- LLM API cho AI-assisted learning.
- Payment Provider.
- Email Provider.
- Object Storage / CDN.

---

# Repository Structure

Project **không** dùng:

```text
apps/web
apps/api
```

Project dùng:

```text
language-learning-platform/
│
├── frontend/                   # Next.js
├── backend/                    # NestJS
│
├── shared/
│   ├── api-contracts/
│   ├── constants/
│   └── types/
│
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── USE_CASES.md
│   ├── REQUIREMENTS.md
│   ├── DESIGN_SYSTEM.md
│   └── CODEBASE_STRUCTURE.md
│
├── infrastructure/
├── scripts/
│
├── docker-compose.yml
├── package.json
├── package-lock.json
├── turbo.json
└── README.md
```

---

# Frontend

Frontend nằm tại:

```text
frontend/
```

Vai trò:

- Public website.
- Student learning area.
- Admin dashboard.
- Reviewer workspace.
- Authentication UI.
- Course learning.
- Exercise / Test UI.
- Vocabulary.
- Writing / Speaking.
- Progress.
- Learning Path.
- Commerce UI.
- Notification.
- Analytics visualization.

Cấu trúc chính:

```text
frontend/src/
├── app/
├── features/
├── components/
├── hooks/
├── lib/
├── providers/
├── config/
├── constants/
└── types/
```

---

# Backend

Backend nằm tại:

```text
backend/
```

Vai trò:

- Authentication.
- Authorization.
- Business rules.
- Course access.
- Course / Lesson management.
- Question Bank.
- Test Engine.
- Assessment.
- Progress.
- Vocabulary.
- Submission / Review.
- Payment.
- Order.
- Coupon.
- Certificate.
- CMS.
- Notification.
- Realtime.
- Audit.
- AI orchestration.

Cấu trúc chính:

```text
backend/src/
├── modules/
├── common/
├── config/
├── database/
├── integrations/
├── events/
├── jobs/
└── health/
```

---

# Core Backend Modules

```text
auth
users
roles

languages
exams
levels
skills

courses
modules
lessons
learning-materials
enrollments

exercises
question-bank
tests
assessments

learning-goals
learning-paths
study-plans
progress

vocabulary

submissions
reviews

packages
orders
payments
coupons

certificates

cms
notifications
search
media
analytics
activity
audit
realtime
ai
```

---

# Core Learning Flow

```text
Visitor
→ Register / Login
→ Learning Goal
→ Placement / Diagnostic
→ Assessment Result
→ Learning Gap
→ Learning Path
→ Course
→ Lesson
→ Exercise / Practice
→ Quiz / Mock Test
→ Result
→ Progress
→ Weak Skill Analysis
→ Next Learning
→ Continue Learning
```

---

# IELTS

IELTS tập trung bốn skill:

```text
Listening
Reading
Writing
Speaking
```

Các nhóm Course chính:

- IELTS Foundation.
- IELTS Overall Progression.
- IELTS Listening.
- IELTS Reading.
- IELTS Writing.
- IELTS Speaking.
- IELTS Mock Tests.

Writing / Speaking sử dụng Submission + Review workflow.

---

# HSK

HSK được tổ chức dựa trên:

```text
Exam
ExamVersion
Level
Skill
Vocabulary
Course
Test
Progress
```

Vocabulary tiếng Trung có thể chứa:

```text
Hanzi
Pinyin
Meaning
Audio
Example
```

Không hard-code một format HSK duy nhất.

---

# Architecture Principles

1. Frontend không truy cập database trực tiếp cho nghiệp vụ chính.
2. Frontend giao tiếp với Backend qua API / WebSocket.
3. Backend kiểm tra authorization.
4. Controller không chứa business logic lớn.
5. Business logic nằm trong Service / Use Case.
6. Database access qua Repository / Data Access Layer.
7. API contract rõ giữa Frontend và Backend.
8. Result quan trọng được immutable hoặc versioned.
9. Mutation quan trọng hỗ trợ idempotency khi cần.
10. IELTS / HSK dùng configuration thay vì hard-code.
11. AI là optional layer.
12. Shared code chỉ chứa thứ Frontend và Backend thực sự cùng dùng.

---

# API

Base path:

```text
/api/v1
```

Ví dụ:

```text
/api/v1/auth
/api/v1/users
/api/v1/courses
/api/v1/lessons
/api/v1/questions
/api/v1/tests
/api/v1/assessments
/api/v1/progress
/api/v1/vocabulary
/api/v1/submissions
/api/v1/reviews
/api/v1/orders
/api/v1/payments
/api/v1/notifications
```

---

# Environment

## Frontend

```text
frontend/.env.local
```

Ví dụ:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

Không đặt secret Backend trong Frontend.

## Backend

```text
backend/.env
```

Ví dụ cấu hình cần có:

```text
DATABASE_URL
REDIS_URL
JWT_SECRET
STORAGE_*
EMAIL_*
PAYMENT_*
LLM_*
```

Giá trị thực tế không commit vào Git.

---

# Package Management

Project sử dụng:

```text
npm
npm workspaces
package-lock.json
```

Không sử dụng `pnpm` hoặc `pnpm-workspace.yaml`.

Root `package.json` quản lý các workspace:

```json
{
  "private": true,
  "workspaces": [
    "frontend",
    "backend",
    "shared/*"
  ]
}
```

---

# Local Development

Cài dependency:

```bash
npm install
```

Chạy toàn bộ project:

```bash
npm run dev
```

Hoặc chạy riêng:

```bash
npm run dev --workspace=frontend
npm run start:dev --workspace=backend
```

Ví dụ local ports:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:4000
API:      http://localhost:4000/api/v1
```

---

# Build

Frontend:

```bash
npm run build --workspace=frontend
```

Backend:

```bash
npm run build --workspace=backend
```

Toàn project:

```bash
npm run build
```

---

# Testing

Frontend:

```bash
npm run test --workspace=frontend
```

Backend:

```bash
npm run test --workspace=backend
```

E2E:

```bash
npm run test:e2e
```

Các flow quan trọng cần được test:

```text
Register / Login
Placement Test
Learning Path
Course Learning
Lesson Progress
Exercise / Test
Writing / Speaking Submission
Review
Checkout / Payment
Course Access
Certificate
```

---

# Development Rule

Khi thêm feature:

```text
Requirement / Use Case
→ API Contract
→ Backend DTO
→ Backend Service
→ Repository
→ Policy
→ API
→ Frontend API Layer
→ Query / Mutation
→ Hook
→ Component
→ Page
→ Test
```

Không làm:

```text
Component → Database
Component → Supabase business query
Controller → SQL phức tạp
Frontend → Payment secret
Frontend → LLM secret
UI → finalized scoring logic
```

---

# Documentation Rule

Khi thay đổi nghiệp vụ lớn, kiểm tra các file:

```text
PROJECT_OVERVIEW.md
USE_CASES.md
REQUIREMENTS.md
CODEBASE_STRUCTURE.md
```

Khi thay đổi UI / component / token:

```text
DESIGN_SYSTEM.md
```

Khi thay đổi API:

```text
CODEBASE_STRUCTURE.md
docs/api/
```

---

# Project Goal

Mục tiêu không chỉ là một website hiển thị bài học.

Hệ thống phải hỗ trợ vòng đời học tập thực tế:

```text
Đánh giá đầu vào
→ Xác định mục tiêu
→ Xây dựng lộ trình
→ Học
→ Luyện tập
→ Kiểm tra
→ Nhận phản hồi
→ Theo dõi tiến độ
→ Điều chỉnh lộ trình
```

Kiến trúc Frontend / Backend được tách riêng để:

- Dễ phát triển theo team.
- Dễ deploy độc lập.
- Dễ mở rộng.
- Dễ test.
- Dễ bảo trì.
- Giảm coupling.
- Bảo vệ business logic và dữ liệu.
