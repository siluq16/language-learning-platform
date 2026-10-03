# Web Học Ngoại Ngữ — Database Schema Implementation Guide

> Tài liệu triển khai đi kèm `ERD.md`.
>
> Database: **Supabase PostgreSQL**  
> Media: **Supabase Storage**  
> Backend: **NestJS**  
> ORM baseline: **Prisma**  
> Package manager: **npm**

---

# 1. Source of Truth

Thứ tự ưu tiên:

```text
REQUIREMENTS.md
→ USE_CASES.md
→ ERD.md
→ DATABASE_SCHEMA.md
→ Prisma schema
→ Migration
```

Nếu Prisma schema thay đổi business relationship, cập nhật `ERD.md` trước.

---

# 2. Recommended Physical Structure

```text
backend/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
└── src/
    └── database/
        ├── database.module.ts
        ├── prisma.service.ts
        └── transaction.service.ts
```

---

# 3. Supabase Resources

Một project Supabase chứa:

```text
PostgreSQL
Auth
Storage
```

Khuyến nghị dùng cùng project cho development ban đầu.

Production nên tách môi trường:

```text
Development
Staging
Production
```

Không dùng chung database production cho local development.

---

# 4. Supabase Schemas

Supabase-managed:

```text
auth
storage
```

Application tables:

```text
public
```

Baseline đơn giản cho đồ án:

```text
public.users
public.courses
public.tests
...
```

Không sửa trực tiếp cấu trúc nội bộ `auth` và `storage` ngoài integration được Supabase hỗ trợ.

---

# 5. User Identity

Nếu dùng Supabase Auth:

```text
auth.users
```

là identity source.

Application:

```text
public.users
```

chứa domain profile.

Conceptual SQL:

```sql
create table public.users (
  id uuid primary key references auth.users(id),
  display_name varchar(120) not null,
  bio text,
  timezone varchar(64) not null default 'UTC',
  locale varchar(16) not null default 'vi-VN',
  status varchar(30) not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

Không thêm:

```text
password_hash
```

vào `public.users` khi Supabase Auth quản lý password.

---

# 6. UUID

Application entities dùng UUID.

Conceptual:

```sql
id uuid primary key default gen_random_uuid()
```

Lợi ích:

- Không lộ sequence.
- Tốt cho distributed/client-safe identifiers.
- Phù hợp Supabase Auth UUID.

---

# 7. Updated At

Có thể cập nhật `updated_at` qua:

- application service,
- hoặc database trigger.

Khuyến nghị baseline:

```text
Backend sets domain update
+
generic updated_at trigger nếu muốn consistency
```

Không đưa business rule phức tạp vào trigger.

---

# 8. Essential Seed

Seed đầu tiên phải tạo:

```text
roles
languages
exams
skills
exam_versions
levels
```

Không seed:

- production password,
- service key,
- payment secret.

---

# 9. Core Relations

```text
auth.users
  1 ── 1 users

users
  M ── N roles

language
  1 ── N exams

exam
  1 ── N exam_versions

exam_version
  1 ── N levels

course
  1 ── N course_modules

course_module
  1 ── N lessons

lesson
  1 ── N learning_materials

question
  M ── N exercises

question
  M ── N test_sections

test
  1 ── N test_versions

test_version
  1 ── N test_attempts

test_attempt
  1 ── N test_answers
  1 ── 1 test_result
```

---

# 10. Historical Data

Các bảng lịch sử không được cascade-delete:

```text
test_attempts
test_answers
test_results
assessment_results
orders
order_items
payments
payment_events
certificates
audit_logs
```

---

# 11. Content Data

Có thể archive/soft-delete:

```text
courses
course_modules
lessons
questions
tests
vocabulary_items
articles
packages
```

---

# 12. Storage Buckets

Create:

```text
avatars
public-content
lesson-media
speaking-submissions
resources
certificates
```

Classification:

| Bucket | Public? | Typical Access |
|---|---:|---|
| avatars | optional | user/public |
| public-content | YES | everyone |
| lesson-media | NO | entitled student |
| speaking-submissions | NO | owner/reviewer/admin |
| resources | mixed/private recommended | policy |
| certificates | NO | owner/admin |

---

# 13. Media Upload Strategy

Large media should not travel through NestJS body when avoidable.

Use:

```text
Create Upload Intent
→ Signed Upload URL
→ Direct Browser Upload
→ Confirm Upload
→ Save media_files metadata
```

NestJS vẫn kiểm soát quyền tạo upload intent.

---

# 14. Migration Rules

Mỗi thay đổi schema:

```text
Change Prisma schema
→ Generate migration
→ Review SQL
→ Apply development
→ Run tests
→ Apply staging
→ Apply production
```

Không:

```text
Edit Supabase Dashboard table manually
→ forget migration
```

---

# 15. Development Database Reset

Development workflow nên hỗ trợ:

```text
reset DB
→ apply migrations
→ essential seed
→ demo seed
```

Essential seed và demo seed nên tách logic.

---

# 16. Demo Seed Data

Demo:

```text
Student demo
Admin demo

English
Chinese

IELTS
HSK

IELTS Foundation Course
HSK Foundation Course

Vocabulary samples
Question samples
Test sample
```

Credential demo chỉ dùng development.

---

# 17. Index Checklist

Trước MVP test load:

```text
[ ] Course catalog indexes
[ ] Slug unique indexes
[ ] Test attempt indexes
[ ] User progress indexes
[ ] Vocabulary user/state index
[ ] Notification unread index
[ ] Order history index
[ ] Payment provider transaction unique
[ ] Audit lookup index
```

---

# 18. Query Patterns cần tối ưu

Student Dashboard:

```text
current goal
latest assessment
active path
today tasks
active courses
course progress
weak skills
latest results
```

Không chạy hàng chục query tuần tự nếu có thể batch/query composition.

---

Course page:

```text
course
modules
lessons
student access
student progress
```

---

Test result:

```text
attempt
result
skill results
answers
explanations
```

---

Admin Course Editor:

```text
course
modules
lessons
materials
status
```

---

# 19. Data Exposure Rules

Student API không được trả:

```text
question.answer_key
question_option.is_correct
payment provider secret metadata
audit internal metadata
other students' private data
review internal draft of other reviewers
```

---

# 20. Prisma & Supabase

Prisma dùng Supabase PostgreSQL như PostgreSQL bình thường.

Responsibility:

```text
Prisma
→ ORM
→ migrations
→ typed query

Supabase
→ PostgreSQL hosting
→ Auth
→ Storage
```

Không để Prisma quản lý Supabase Auth internal tables như application-owned tables.

`auth.users` có thể được tham chiếu bằng migration SQL/application pattern, trong khi Prisma app model tập trung `public.users`.

Nếu Prisma relation trực tiếp sang `auth.users` gây complexity, Backend có thể giữ `users.id` bằng Auth UUID và enforce profile bootstrap ở service/SQL migration thay vì model toàn bộ Supabase auth schema.

---

# 21. RLS + Backend

Vì Backend là business gateway:

```text
Browser
→ NestJS
→ DB
```

RLS là defense-in-depth cho exposed Supabase API/table.

Không nên thiết kế business permission chỉ bằng RLS rồi bỏ Backend policy.

Backend policy vẫn xử lý:

```text
Course entitlement
Reviewer scope
Admin permission
Payment state
Test attempt ownership
Certificate issuance
```

---

# 22. Service Role

Supabase service-role credential:

```text
Backend only
```

Không:

```text
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
```

Không commit key.

---

# 23. Production Readiness

Trước production:

```text
[ ] Separate production Supabase project
[ ] Production migration process
[ ] RLS reviewed
[ ] Storage bucket policies reviewed
[ ] Auth redirect URLs reviewed
[ ] Service key protected
[ ] Database connection pool configured
[ ] Backup understood
[ ] Storage recovery strategy defined
[ ] Monitoring enabled
[ ] Slow queries inspected
[ ] Indexes verified
```

---

# 24. Recommended Next Step

Sau tài liệu này:

```text
1. Tạo Supabase project
2. Chốt Supabase Auth
3. Tạo backend/prisma/schema.prisma
4. Tạo migration đầu
5. Tạo seed
6. Tạo Storage buckets
7. Implement Auth/Profile
8. Implement Catalog
9. Implement Course
```
