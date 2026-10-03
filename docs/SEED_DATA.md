# Web Học Ngoại Ngữ — Seed Data Specification

> Seed baseline cho Supabase PostgreSQL + Prisma.
>
> Mục tiêu:
>
> - tạo catalog bắt buộc,
> - tạo dữ liệu demo cho Frontend/Backend,
> - không đưa secret hoặc production credential vào repository,
> - không sử dụng nội dung đề thi IELTS/HSK có bản quyền.

---

# 1. Seed Levels

Seed chia thành:

```text
ESSENTIAL
DEVELOPMENT_DEMO
TEST_FIXTURE
```

## ESSENTIAL

Cần ở mọi environment:

- roles,
- languages,
- skills,
- exams,
- internal exam versions,
- levels/config baseline.

## DEVELOPMENT_DEMO

Dev/staging:

- demo courses,
- modules,
- lessons,
- vocabulary,
- questions,
- test,
- package,
- coupon.

## TEST_FIXTURE

Tạo riêng trong automated test.

Không phụ thuộc demo seed mutable cho test cần isolation.

---

# 2. Roles

| Code | Name |
|---|---|
| STUDENT | Student |
| ADMIN | Administrator |
| CONTENT_MANAGER | Content Manager |
| REVIEWER | Teacher / Reviewer |

---

# 3. Languages

| Code | Name | Native Name |
|---|---|---|
| en | English | English |
| zh | Chinese | 中文 |

---

# 4. Skills

```text
LISTENING
READING
WRITING
SPEAKING
VOCABULARY
GRAMMAR
```

Skill catalog là generic; `exam_skills` quyết định skill thuộc ExamVersion.

---

# 5. Exams

| Code | Language | Name |
|---|---|---|
| IELTS | en | IELTS |
| HSK | zh | HSK |

---

# 6. Development Exam Versions

Đây là internal development config, **không tuyên bố official exam specification**:

```text
IELTS_INTERNAL_V1
HSK_INTERNAL_V1
```

Trước production content phải xác minh/chốt exam configuration mục tiêu.

---

# 7. IELTS Development Levels

```text
FOUNDATION
4.0
4.5
5.0
5.5
6.0
6.5
7.0
7.5_PLUS
```

Các level trên phục vụ catalog/course targeting.

Scoring conversion production phải cấu hình riêng sau khi được chốt.

---

# 8. HSK Development Levels

Theo phạm vi sản phẩm hiện tại:

```text
FOUNDATION
HSK1
HSK2
HSK3
HSK4
HSK5
HSK6
```

`HSK_INTERNAL_V1` là development placeholder.

---

# 9. Exam Skills

## IELTS

```text
LISTENING
READING
WRITING
SPEAKING
```

## HSK

```text
LISTENING
READING
WRITING
SPEAKING
VOCABULARY
GRAMMAR
```

---

# 10. Demo Courses

## English / IELTS

```text
IELTS Foundation
IELTS Listening Foundation
IELTS Reading Foundation
IELTS Writing Foundation
IELTS Speaking Foundation
IELTS Mock Test Starter
```

## Chinese / HSK

```text
HSK Foundation
HSK 1 Starter
HSK 2 Starter
```

---

# 11. Demo Course — IELTS Foundation

```text
Course:
IELTS Foundation

Module 1 — Getting Started
├── Lesson 1: Understanding the IELTS Learning Roadmap
├── Lesson 2: Core Academic Vocabulary
└── Lesson 3: Diagnostic Practice

Module 2 — Listening Foundations
├── Lesson 1: Listening for Names and Numbers
├── Lesson 2: Form Completion Basics
└── Lesson 3: Listening Practice

Module 3 — Reading Foundations
├── Lesson 1: Skimming and Scanning
├── Lesson 2: Identifying Keywords
└── Lesson 3: Reading Practice
```

Toàn bộ content demo phải tự viết.

---

# 12. Demo Course — HSK Foundation

```text
Module 1 — Pinyin & Sound
├── Pinyin basics
├── Tone awareness
└── Audio recognition

Module 2 — Basic Vocabulary
├── Greetings
├── Numbers
└── Everyday actions

Module 3 — Character Awareness
├── Hanzi recognition
├── Meaning matching
└── Vocabulary practice
```

---

# 13. Demo Vocabulary — English

```text
environment
increase
significant
approach
evidence
factor
maintain
require
```

Fields:

```text
term
meaning
partOfSpeech
example
audio optional
```

---

# 14. Demo Vocabulary — Chinese

```text
你好
学习
学生
老师
学校
今天
明天
喜欢
```

Example:

```text
学习
Pinyin: xuéxí
Meaning: học tập

Example:
我每天学习中文。
Wǒ měitiān xuéxí Zhōngwén.
Tôi học tiếng Trung mỗi ngày.
```

---

# 15. Demo Question Types

Tạo ít nhất:

```text
MULTIPLE_CHOICE
TRUE_FALSE_NOT_GIVEN
MATCHING
COMPLETION
SHORT_ANSWER
```

Không copy official IELTS/HSK question.

---

# 16. Original Demo Question — Multiple Choice

```text
Prompt:
A student wants to improve concentration while studying.
Which action is most likely to reduce interruptions?

A. Keep several chat applications open.
B. Put the phone in another room.
C. Change study topics every two minutes.
D. Play multiple videos at once.

Correct:
B

Explanation:
Removing a frequent source of notifications can reduce interruptions.
```

---

# 17. Original Demo Reading Context

```text
Many students divide a long study session into shorter periods.
A short break between focused periods may help them return to a task
with renewed attention. The best schedule varies between learners,
so students should observe which routine helps them stay consistent.
```

Có thể dùng để tạo:

- True/False/Not Given.
- Short Answer.
- Matching statement.

---

# 18. Original Demo HSK-like Vocabulary Question

Development only:

```text
Choose the meaning of 学习.

A. ăn
B. học tập
C. ngủ
D. đi bộ
```

Không gắn là câu hỏi official HSK.

---

# 19. Demo Test

```text
Title:
Development Diagnostic Test

Type:
DIAGNOSTIC

Sections:
1. Listening sample
2. Reading sample

Question count:
5–10 development questions
```

Không dùng kết quả demo để tuyên bố IELTS band/HSK official level.

---

# 20. Demo Package

```text
IELTS Starter Roadmap
```

Includes:

```text
IELTS Foundation
IELTS Listening Foundation
IELTS Reading Foundation
```

Development price:

```text
999000 VND
```

Giá chỉ là demo.

---

# 21. Demo Coupon

```text
Code: DEV10
Type: PERCENTAGE
Value: 10
Environment: development/staging only
```

Không seed production coupon tự động.

---

# 22. Demo Users

Không tạo Supabase Auth production user bằng Prisma seed.

Development user creation dùng script riêng:

```text
scripts/create-dev-users.ts
```

Ví dụ account aliases:

```text
student.demo@example.local
reviewer.demo@example.local
content.demo@example.local
admin.demo@example.local
```

Password lấy từ local environment:

```env
DEV_SEED_PASSWORD=
```

Nếu không có biến, script bỏ qua tạo Auth users.

---

# 23. Seed Idempotency

Seed phải chạy nhiều lần an toàn.

Dùng:

```text
upsert
unique code
unique slug
```

Không dùng blind `create` cho essential catalog.

---

# 24. Suggested Seed Order

```text
1. roles
2. languages
3. skills
4. exams
5. exam_versions
6. levels
7. exam_skills
8. courses
9. course_skills
10. course_modules
11. lessons
12. learning_materials
13. vocabulary
14. questions
15. exercises
16. tests
17. packages
18. coupons
```

---

# 25. Environment Rules

## Development

```text
Essential + Demo
```

## Staging

```text
Essential + controlled demo
```

## Production

```text
Essential only
```

Production learning content đi qua controlled content workflow.

---

# 26. Seed Command

Root:

```bash
npm run db:seed --workspace=backend
```

Backend `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

---

# 27. Seed Validation

```text
[ ] 4 roles
[ ] 2 languages
[ ] IELTS + HSK exams
[ ] Exam versions exist
[ ] Levels exist
[ ] Skills mapped
[ ] Course slugs unique
[ ] Demo questions contain answer keys
[ ] Student API cannot expose answer keys
[ ] Demo test relationships valid
[ ] Demo package references valid courses
```

---

# 28. Content Rights Rule

Seed chỉ chứa:

- original content,
- generic examples,
- internally authored questions,
- licensed content nếu có bằng chứng.

Không seed:

- official copyrighted IELTS passages,
- copyrighted audio,
- paid course material từ nền tảng khác,
- leaked exam content.

---

# 29. Seed Definition of Done

```text
[ ] Idempotent
[ ] Runs after fresh migration
[ ] No production secrets
[ ] No copyrighted exam content
[ ] Essential/demo separation clear
[ ] Foreign keys valid
[ ] Slugs/codes unique
[ ] Test data usable by Frontend
[ ] CI can run essential seed
```
