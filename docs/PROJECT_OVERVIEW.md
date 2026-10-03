# Web Học Ngoại Ngữ — Project Overview

## 1. Thông tin dự án

**Tên dự án:** Web Học Ngoại Ngữ — Nền tảng học và luyện thi IELTS + HSK  
**Loại sản phẩm:** Web Application / Online Language Learning & Exam Preparation Platform

Hệ thống được xây dựng nhằm cung cấp một nền tảng học ngoại ngữ tập trung cho người học tiếng Anh và tiếng Trung, định hướng chính theo **IELTS** và **HSK**.

Sản phẩm kết hợp giữa học theo khóa, luyện tập theo kỹ năng, kiểm tra đánh giá, quản lý từ vựng, theo dõi tiến độ và thương mại điện tử.

Mô hình dữ liệu và kiến trúc được thiết kế đủ mở để có thể mở rộng thêm các kỳ thi/ngôn ngữ khác như JLPT, TOPIK hoặc các chương trình học riêng trong tương lai.

Cấu trúc học tập chính:

```text
User
  └── Learning Goal
        └── Assessment / Placement Test
              └── Learning Path
                    └── Course
                          └── Module
                                └── Lesson
                                      ├── Learning Materials
                                      ├── Exercises
                                      ├── Vocabulary
                                      └── Quiz / Test
                                            └── Result / Progress
```

Hệ thống có 3 khu vực chính:

```text
Public / Guest Website
        │
        ├── Courses
        ├── Trial
        ├── Placement Test
        ├── Articles
        └── Resources
                │
                ▼
        Student Learning Area
                │
                ├── Dashboard
                ├── My Courses
                ├── Lessons
                ├── Practice
                ├── Exams
                ├── Vocabulary
                └── Progress
                │
                ▼
        Admin Dashboard
                │
                ├── Content
                ├── Question Bank
                ├── Tests
                ├── Students
                ├── Orders
                └── Analytics
```

Sản phẩm ưu tiên mô hình học tập có lộ trình:

```text
Goal
  → Current Level
  → Target Level
  → Gap Analysis
  → Learning Path
  → Daily Study Plan
  → Course / Lesson
  → Practice
  → Assessment
  → Progress
  → Recommendation
```

Kiến trúc không hard-code toàn bộ nghiệp vụ vào IELTS hoặc HSK. Các khái niệm như `Language`, `Exam`, `ExamVersion`, `Level`, `Skill`, `QuestionType` và `Assessment` được thiết kế để có thể tái sử dụng.

---

## 2. Mục tiêu sản phẩm

### 2.1 Mục tiêu nghiệp vụ

- Cung cấp một nền tảng học tiếng Anh và tiếng Trung tập trung.
- Hỗ trợ người học xác định trình độ hiện tại thông qua placement/diagnostic test.
- Cho phép người học xác định mục tiêu học tập và cấp độ mục tiêu.
- Xây dựng lộ trình học phù hợp với mục tiêu.
- Cung cấp khóa học IELTS theo kỹ năng và mục tiêu band.
- Cung cấp khóa học và nội dung HSK theo cấp độ.
- Hỗ trợ học Listening, Reading, Writing, Speaking và Vocabulary.
- Theo dõi tiến độ học tập và kết quả kiểm tra.
- Phát hiện kỹ năng còn yếu dựa trên kết quả học tập.
- Hỗ trợ người học luyện tập thường xuyên thông qua Exercise, Quiz và Mock Test.
- Cho phép bán khóa học, gói khóa học và roadmap.
- Cung cấp CMS để quản trị nội dung public.
- Cung cấp Dashboard và Analytics cho Admin.
- Tạo nền tảng đủ mở để bổ sung AI Tutor, AI Writing/Speaking Feedback và Recommendation Engine trong tương lai.

### 2.2 Mục tiêu kỹ thuật

- Xây dựng web application full-stack.
- Tách rõ frontend, backend và persistence layer.
- API-first.
- Authorization được thực hiện ở backend, không phụ thuộc UI.
- Thiết kế domain theo module.
- Hỗ trợ REST API.
- Hỗ trợ realtime cho notification và các sự kiện cần thiết.
- Có cache và queue khi cần mở rộng.
- Hỗ trợ object storage cho video, audio, hình ảnh và file học tập.
- Có testing tự động bằng unit/integration test và E2E test.
- Thiết kế Question Bank và Test Builder có thể tái sử dụng.
- Thiết kế IELTS/HSK theo cấu hình thay vì hard-code.
- AI là module mở rộng, không trở thành dependency bắt buộc của core learning workflow.

---

## 3. Đối tượng sử dụng

### 3.1 Guest / Visitor

Người dùng chưa đăng nhập.

Quyền:

- Xem trang giới thiệu.
- Xem danh sách khóa học.
- Xem chi tiết khóa học.
- Xem bài viết và tài nguyên public.
- Đăng ký.
- Đăng nhập.
- Truy cập Trial Content nếu được phép.
- Thực hiện Placement/Diagnostic Test nếu chính sách sản phẩm cho phép.

### 3.2 Student

Người học đã đăng nhập.

Quyền:

- Quản lý hồ sơ.
- Thiết lập Learning Goal.
- Làm Placement Test.
- Xem Learning Path.
- Tham gia khóa học đã được cấp quyền.
- Học Lesson.
- Làm Exercise và Quiz.
- Làm Mock Test.
- Xem kết quả và tiến độ.
- Quản lý từ vựng cá nhân.
- Nộp Writing.
- Ghi âm Speaking.
- Nhận notification.
- Xem đơn hàng và quyền truy cập khóa học.
- Xem/chứng thực Certificate nếu đủ điều kiện.

### 3.3 Admin

Quản trị toàn bộ hệ thống.

Quyền:

- Quản lý người dùng.
- Quản lý khóa học.
- Quản lý module và lesson.
- Quản lý learning material.
- Quản lý exercise.
- Quản lý question bank.
- Xây dựng test.
- Quản lý vocabulary.
- Quản lý bài viết và resources.
- Quản lý package.
- Quản lý order/payment/coupon.
- Xem analytics.
- Quản lý notification.
- Quản lý cấu hình hệ thống.

### 3.4 Content Manager

Quản lý nội dung học tập theo phạm vi được cấp.

Quyền có thể bao gồm:

- Course.
- Module.
- Lesson.
- Exercise.
- Question.
- Vocabulary.
- Test.
- Article.
- Resource.

### 3.5 Teacher / Reviewer

Vai trò mở rộng dành cho việc đánh giá bài Writing/Speaking.

Quyền:

- Xem submission được phân công.
- Chấm Writing.
- Nhận xét Writing.
- Chấm Speaking.
- Nhận xét Speaking.
- Cập nhật kết quả review.
- Không có quyền thay đổi các cấu hình hệ thống ngoài phạm vi được cấp.

---

## 4. Công nghệ sử dụng

### Frontend

```text
Next.js
React
TypeScript
```

Vai trò:

- Render giao diện web.
- Quản lý UI state.
- Gọi REST API.
- Quản lý authentication state.
- Hiển thị learning dashboard.
- Hiển thị course/lesson.
- Xử lý audio/video.
- Xử lý quiz và test.
- Xử lý recording Speaking.
- Hỗ trợ responsive UI.
- Tối ưu trải nghiệm học tập.

Frontend được tổ chức theo domain thay vì chỉ theo loại component.

Ví dụ:

```text
web/
├── auth
├── dashboard
├── courses
├── lessons
├── practice
├── exams
├── vocabulary
├── progress
├── orders
└── profile
```

### Backend

```text
NestJS
TypeScript
REST API
WebSocket Gateway
```

Backend chịu trách nhiệm:

- Authentication.
- Authorization.
- Business logic.
- Validation.
- Transaction.
- Course access control.
- Assessment scoring.
- Progress calculation.
- Learning path.
- Question Bank.
- Test Builder.
- Commerce.
- Notification.
- Event publishing.
- Realtime.
- AI orchestration ở các phase mở rộng.

### Database

```text
Supabase PostgreSQL
```

Supabase PostgreSQL là nguồn dữ liệu quan hệ chính của hệ thống.

Kiến trúc truy cập:

```text
Next.js Frontend
→ NestJS Backend
→ Prisma / Repository
→ Supabase PostgreSQL
```

Frontend không truy cập trực tiếp các bảng nghiệp vụ quan trọng.

Supabase được sử dụng như nền tảng PostgreSQL hosting; business logic, authorization, transaction, scoring và access control vẫn do NestJS kiểm soát.

Các nhóm dữ liệu chính:

- User.
- Role.
- Language.
- Exam.
- Exam Version.
- Level.
- Skill.
- Course.
- Module.
- Lesson.
- Learning Material.
- Exercise.
- Question.
- Question Option.
- Test.
- Test Section.
- Test Question.
- Test Attempt.
- Test Result.
- Learning Goal.
- Assessment.
- Assessment Result.
- Learning Path.
- Path Item.
- Study Plan.
- Study Task.
- Progress.
- Vocabulary.
- User Vocabulary.
- Writing Submission.
- Speaking Submission.
- Package.
- Order.
- Payment.
- Coupon.
- Certificate.
- Article.
- Article Category.
- Notification.
- Audit Log.

Quyết định baseline của dự án:

```text
Database        → Supabase PostgreSQL
Authentication  → Supabase Auth
File Storage    → Supabase Storage
```

Supabase Auth quản lý identity, email/password, verification, reset password và session/JWT. Application profile và dữ liệu học tập vẫn nằm trong schema nghiệp vụ của hệ thống.

### Authentication Platform

```text
Supabase Auth
```

Supabase Auth chịu trách nhiệm:

- Email/password authentication.
- Email verification.
- Password reset.
- Session/JWT.
- Identity provider nếu mở rộng sau này.

Application vẫn có bảng:

```text
public.users
```

để lưu:

- Profile.
- Avatar reference.
- Timezone.
- Locale.
- Learning preferences.
- Account/application status.

Quan hệ identity:

```text
auth.users.id
    ↓
public.users.id
```

NestJS xác thực JWT và tiếp tục kiểm tra role/permission/business policy.

Không dùng Supabase Auth thay thế authorization nghiệp vụ của Backend.

### File / Media Storage

```text
Supabase Storage
```

Dùng cho:

- Course thumbnail.
- Lesson image.
- Video.
- Audio.
- Speaking recording.
- Tài liệu học tập.
- User attachment.
- Certificate asset.

Media không nên lưu trực tiếp dưới dạng binary trong database. Database chỉ lưu metadata và object reference.

Storage bucket baseline:

```text
avatars
public-content
lesson-media
speaking-submissions
resources
certificates
```

Private media như lesson premium hoặc Speaking recording được truy cập thông qua Backend authorization + signed URL.

Luồng đề xuất:

```text
Frontend
→ NestJS
→ Check permission / course access
→ Generate signed URL
→ Supabase Storage
```

Với upload file lớn, Frontend có thể upload trực tiếp lên Supabase Storage bằng signed upload URL do Backend cấp, để tránh đẩy file lớn xuyên qua NestJS.

### Cache / Queue

```text
Redis
```

Dùng cho:

- Cache dữ liệu truy vấn phổ biến.
- Rate limiting.
- Temporary state.
- Queue support.
- Background jobs.
- Pub/Sub khi hệ thống realtime cần scale.

Không dùng Redis làm nguồn dữ liệu chính cho domain data.

### Realtime

```text
Socket.IO
```

Dùng cho các trường hợp như:

- Notification.
- Assessment processing status.
- Learning event nếu cần.
- Admin/content update event.
- Realtime status của các tác vụ background.

Luồng tổng quát:

```text
Client
  ↓
NestJS API
  ↓
Database
  ↓
Domain Event
  ↓
Socket.IO
  ↓
Student / Admin Client
```

Realtime không thay thế database. Database vẫn là nguồn sự thật chính.

### AI

```text
LLM API
```

AI được thiết kế như một module mở rộng.

Các use case dự kiến:

- AI giải thích câu hỏi.
- AI tạo bài luyện tập từ nội dung được phép sử dụng.
- AI tạo vocabulary practice.
- AI hỗ trợ phân tích Writing.
- AI hỗ trợ Speaking feedback.
- AI đề xuất learning task.
- AI tạo study plan.
- AI Tutor.
- Natural Language Learning Command.

Nguyên tắc:

- AI chỉ nhận dữ liệu mà user có quyền truy cập.
- AI không được truy cập trực tiếp database.
- AI gọi service/action do backend kiểm soát.
- Các AI action có tác động thay đổi dữ liệu phải có validation.
- Các kết quả AI quan trọng phải có khả năng audit.
- AI không phải dependency bắt buộc của core learning workflow.

### Testing

```text
Jest
Playwright
```

**Jest**

- Unit test.
- Service test.
- Business logic test.
- API/integration test.
- Scoring test.
- Permission test.
- Progress calculation test.

**Playwright**

- E2E.
- Browser workflow.
- Register/Login.
- Placement Test.
- Course enrollment.
- Lesson learning.
- Exercise.
- Quiz.
- Mock Test.
- Vocabulary.
- Order/payment flow.
- Admin content workflow.
- Permission behavior.

---

## 5. Kiến trúc logic

```text
┌──────────────────────────────────────────────────────┐
│                  Next.js Web                         │
│                                                      │
│ UI / State / API Client / Media / Quiz / Dashboard │
└────────────────────────┬─────────────────────────────┘
                         │ HTTPS / WebSocket
                         ▼
┌──────────────────────────────────────────────────────┐
│                 NestJS Backend                       │
│                                                      │
│ Auth                                                 │
│ Users                                                │
│ Courses                                              │
│ Learning                                             │
│ Assessments                                          │
│ Question Bank                                        │
│ Tests                                                │
│ Vocabulary                                           │
│ Progress                                             │
│ Submissions                                          │
│ Commerce                                             │
│ CMS                                                  │
│ Notifications                                        │
│ Certificates                                         │
│ Analytics                                            │
│ AI                                                   │
└───────────────┬───────────────────┬──────────────────┘
                │                   │
                ▼                   ▼
       ┌────────────────┐   ┌────────────────┐
       │ Supabase       │   │     Redis      │
       │ PostgreSQL     │   │ Cache / Queue  │
       │  Truth         │   │                │
       └───────┬────────┘   └────────────────┘
               │
               ▼
       ┌────────────────┐
       │ Object Storage │
       │ Video / Audio  │
       │ Files / Media  │
       └────────────────┘

                +
       ┌────────────────┐
       │    LLM API     │
       │ AI Services    │
       └────────────────┘
```

---

## 6. Nguyên tắc kiến trúc

### 6.1 Single Source of Truth

Database là nguồn sự thật chính.

Các màn hình:

- Course catalog.
- Student Dashboard.
- Course detail.
- Learning Path.
- Progress.
- Admin Analytics.

đều sử dụng dữ liệu domain thống nhất.

Không tạo các bản sao dữ liệu nghiệp vụ chỉ để phục vụ một màn hình nếu không cần thiết.

### 6.2 Domain-driven modularity

Core system được chia thành các domain module:

```text
Auth
Users
Learning
Courses
Assessments
Question Bank
Vocabulary
Progress
Submissions
Commerce
CMS
Notifications
Certificates
Analytics
```

Các module có trách nhiệm rõ ràng và giao tiếp thông qua service/API/event thay vì truy cập chéo database một cách tùy tiện.

### 6.3 Authorization-first

Mọi protected request phải:

```text
Authenticate
  ↓
Authorize
  ↓
Validate
  ↓
Execute
```

Không được chỉ ẩn nút trên frontend.

Ví dụ:

```text
Student
  ↓
GET /courses/{courseId}
  ↓
Authenticate
  ↓
Check Course Access
  ↓
Return Course
```

### 6.4 Transaction

Các mutation ảnh hưởng nhiều record phải được xử lý transaction khi cần.

Ví dụ hoàn thành một test:

```text
Submit Test
  ↓
Validate Attempt
  ↓
Calculate Score
  ↓
Create Test Result
  ↓
Update Progress
  ↓
Create Learning Event
  ↓
Commit
```

### 6.5 Result immutability

Kết quả đã hoàn thành của Test/Assessment không nên bị thay đổi tùy tiện.

Nếu cần điều chỉnh:

- tạo revision,
- lưu audit log,
- hoặc tạo correction record.

### 6.6 Idempotency

Các operation có thể retry phải có cơ chế chống duplicate effect.

Đặc biệt:

- Payment callback.
- Test submission.
- Progress update.
- Certificate issuance.
- Background job.

### 6.7 Configuration over hard-code

Các thông tin có khả năng thay đổi theo kỳ thi phải được cấu hình:

```text
Exam
ExamVersion
Level
Skill
QuestionType
TestSection
ScoringRule
```

Không nên hard-code toàn bộ logic IELTS hoặc HSK vào frontend.

### 6.8 AI optional

Core workflow phải hoạt động ngay cả khi AI không khả dụng.

```text
Core Learning
      │
      ├── Course
      ├── Lesson
      ├── Exercise
      ├── Test
      └── Progress
             │
             └── AI Enhancement
```

### 6.9 Supabase as infrastructure, NestJS as business gateway

Supabase cung cấp:

```text
PostgreSQL
Auth
Storage
```

NestJS vẫn là business gateway:

```text
Frontend
→ NestJS
→ Supabase
```

NestJS chịu trách nhiệm:

- Authorization nghiệp vụ.
- Course entitlement.
- Assessment/Test scoring.
- Progress rules.
- Payment state.
- Review workflow.
- Certificate issuance.
- Admin permission.

Không dùng:

```text
Frontend
→ Supabase Database
```

cho các nghiệp vụ quan trọng.

### 6.10 Supabase security

Nguyên tắc:

- `SUPABASE_SERVICE_ROLE_KEY` chỉ tồn tại ở Backend.
- Không đặt service role key trong biến `NEXT_PUBLIC_*`.
- RLS được bật cho table/storage có khả năng expose qua Supabase API.
- Public content chỉ được read khi đã publish.
- Private storage sử dụng policy hoặc signed URL.
- Payment webhook, scoring và answer key chỉ đi qua Backend.


---

## 7. Core modules

Cấu trúc project định hướng:

```text
apps/
├── web/
│   ├── auth/
│   ├── public/
│   ├── dashboard/
│   ├── courses/
│   ├── lessons/
│   ├── practice/
│   ├── exams/
│   ├── vocabulary/
│   ├── progress/
│   ├── orders/
│   ├── profile/
│   └── admin/
│
├── api/
│   ├── auth/
│   ├── users/
│   ├── courses/
│   ├── learning/
│   ├── assessments/
│   ├── question-bank/
│   ├── tests/
│   ├── vocabulary/
│   ├── submissions/
│   ├── progress/
│   ├── commerce/
│   ├── cms/
│   ├── notifications/
│   ├── certificates/
│   ├── analytics/
│   └── ai/
│
└── shared/
    ├── types/
    ├── validation/
    ├── constants/
    └── utils/
```

### Core domain modules

#### Auth

- Register.
- Login.
- Logout.
- Session.
- Password management.
- Email verification nếu triển khai.
- Role/permission.

#### Users

- Profile.
- Preferences.
- Learning preferences.
- Account settings.

#### Courses

- Course.
- Module.
- Lesson.
- Material.
- Enrollment.
- Course access.

#### Learning

- Lesson progress.
- Study task.
- Study plan.
- Learning path.
- Learning event.

#### Assessments

- Placement Test.
- Diagnostic Test.
- Test.
- Test Section.
- Test Attempt.
- Test Result.
- Scoring.

#### Question Bank

- Question.
- Question Option.
- Question Type.
- Skill.
- Difficulty.
- Target Level/Band.
- Explanation.
- Media.

#### Vocabulary

- Vocabulary item.
- User Vocabulary.
- Learning state.
- Review.
- Flashcard.
- Vocabulary quiz.

#### Submissions

- Writing Submission.
- Speaking Submission.
- Reviewer.
- Feedback.
- Score.

#### Progress

- Course progress.
- Lesson progress.
- Skill progress.
- Assessment history.
- Weak-skill analysis.

#### Commerce

- Package.
- Package Course.
- Order.
- Payment.
- Coupon.
- Access Grant.

#### CMS

- Article.
- Category.
- Tag.
- Resource.
- SEO metadata.

#### Notifications

- In-app notification.
- Email notification nếu triển khai.
- Notification preference.

#### Certificates

- Certificate.
- Verification code.
- Issuance rule.
- Verification endpoint.

#### Analytics

- Student analytics.
- Course analytics.
- Learning analytics.
- Assessment analytics.
- Commerce analytics.

---

## 8. Core domain

### User

Tài khoản người dùng của hệ thống.

### Learning Goal

Mục tiêu học tập của user.

Ví dụ:

```text
Language: English
Exam: IELTS
Current Level: 5.0
Target Level: 6.5
Target Date: ...
```

hoặc:

```text
Language: Chinese
Exam: HSK
Current Level: HSK3
Target Level: HSK5
Target Date: ...
```

### Assessment

Bài đánh giá trình độ hoặc kết quả học tập.

Các loại:

- Placement.
- Diagnostic.
- Practice.
- Mock Test.
- Course Assessment.

### Learning Path

Lộ trình học được tạo dựa trên:

- Goal.
- Current Level.
- Target Level.
- Skill.
- Assessment Result.
- Course availability.

### Course

Đơn vị khóa học có thể bán hoặc cấp quyền.

Ví dụ IELTS:

```text
IELTS Foundation
IELTS 4.0 → 5.0
IELTS 5.0 → 6.0
IELTS 6.0 → 7.0
IELTS Listening
IELTS Reading
IELTS Writing
IELTS Speaking
IELTS Mock Test
```

Ví dụ HSK:

```text
HSK Foundation
HSK1
HSK2
HSK3
HSK4
HSK5
HSK6
```

### Module

Nhóm lesson trong Course.

### Lesson

Đơn vị học tập.

Lesson có thể chứa:

- Video.
- Vocabulary.
- Grammar.
- Listening.
- Reading.
- Writing.
- Speaking.
- Practice.
- Summary.

### Exercise

Bài luyện tập nhỏ trong lesson hoặc practice area.

### Question

Đơn vị câu hỏi có thể tái sử dụng trong Exercise/Test.

### Test

Một bài kiểm tra gồm nhiều section/question.

### Progress

Trạng thái hoàn thành và kết quả học tập.

### Vocabulary

Đơn vị từ vựng dùng chung cho nhiều course/lesson.

Đối với tiếng Trung có thể lưu:

```text
Hanzi
Pinyin
Meaning
Audio
Example
```

### Submission

Bài nộp của student cho Writing hoặc Speaking.

---

## 9. Kiến trúc IELTS

IELTS được tổ chức theo bốn kỹ năng:

```text
IELTS
├── Listening
├── Reading
├── Writing
└── Speaking
```

Các loại course chính:

```text
IELTS Foundation
IELTS Progression
IELTS Skill
IELTS Mock Test
```

Question Bank hỗ trợ các dạng câu hỏi như:

```text
Multiple Choice
True / False / Not Given
Matching Headings
Matching Information
Matching
Form Completion
Note Completion
Sentence Completion
Summary Completion
Short Answer
```

Question metadata:

```text
type
content
audio
image
explanation
difficulty
skill
targetBand
examType
examVersion
```

Writing:

```text
Task 1
Task 2
```

MVP hỗ trợ:

- Text submission.
- Submission history.
- Human/teacher/admin review.
- Feedback.
- Score.

Speaking:

```text
Part 1
Part 2
Part 3
```

MVP hỗ trợ:

- Audio recording.
- Submission.
- Human/teacher/admin review.
- Feedback.
- Score.

AI Writing/Speaking feedback thuộc phạm vi mở rộng.

---

## 10. Kiến trúc HSK

HSK được tổ chức theo level và exam version.

```text
HSK
├── Foundation
├── HSK1
├── HSK2
├── HSK3
├── HSK4
├── HSK5
└── HSK6
```

Các nhóm kỹ năng:

```text
Listening
Speaking
Reading
Writing
Vocabulary
Grammar
```

Vocabulary item có thể chứa:

```text
Hanzi
Pinyin
Meaning
Audio
Example
```

Student có thể bật/tắt:

```text
Hanzi
Pinyin
Meaning
Audio
```

Các bài luyện có thể gồm:

- Vocabulary Quiz.
- Audio Recognition.
- Matching.
- Fill in the blank.
- Reading practice.
- Listening practice.
- Writing practice.

Hệ thống sử dụng `ExamVersion` để tránh hard-code một format HSK duy nhất.

---

## 11. Các luồng xuyên hệ thống quan trọng

### Register / Login

```text
User
→ Register/Login
→ Validate
→ Authenticate
→ Create Session
→ Load Profile
→ Student Dashboard
```

### Placement Test

```text
Student
→ Start Placement Test
→ Load Test Version
→ Answer Questions
→ Submit
→ Calculate Result
→ Estimate Skill Levels
→ Calculate Overall / Level
→ Store Assessment Result
→ Generate Learning Gap
→ Recommend Learning Path
```

### Enroll Course

```text
Student
→ Select Course
→ Check Price / Package
→ Create Order
→ Payment
→ Verify Payment
→ Grant Course Access
→ Create Enrollment
→ Notification
```

### Learn Lesson

```text
Student
→ Open Course
→ Open Module
→ Open Lesson
→ Load Materials
→ Study
→ Complete Activity
→ Submit Exercise
→ Update Progress
→ Generate Learning Event
→ Update Dashboard
```

### Submit Exercise

```text
Student
→ Open Exercise
→ Load Questions
→ Answer
→ Submit
→ Validate Attempt
→ Calculate Score
→ Save Result
→ Update Progress
→ Show Explanation
```

### Mock Test

```text
Student
→ Select Mock Test
→ Start Attempt
→ Answer Sections
→ Submit
→ Calculate Score
→ Save Test Result
→ Update Skill Progress
→ Show Result
→ Recommend Next Learning
```

### Writing Submission

```text
Student
→ Open Writing Task
→ Write Answer
→ Submit
→ Create Submission
→ Assign Reviewer / Queue
→ Review
→ Score + Feedback
→ Publish Result
→ Update Progress
```

### Speaking Submission

```text
Student
→ Open Speaking Task
→ Record Audio
→ Submit
→ Store Audio
→ Create Submission
→ Assign Reviewer / Queue
→ Review
→ Score + Feedback
→ Publish Result
```

### AI Learning Assistance

```text
Student
→ Request AI Assistance
→ Authenticate
→ Authorize Resource
→ Build Safe Context
→ Call LLM API
→ Validate Response
→ Return Suggestion
→ Optional User Confirmation
```

### Admin Create Test

```text
Admin
→ Create Test
→ Select Exam / Version
→ Create Sections
→ Select Questions
→ Configure Order / Scoring
→ Validate Test
→ Publish Version
```

---

## 12. Quy ước phát triển

### Branch

```text
main
develop
feature/*
fix/*
hotfix/*
```

### Commit

Khuyến nghị Conventional Commits:

```text
feat: add placement test
feat: add IELTS question bank
fix: prevent duplicate test submission
refactor: extract scoring service
test: add course access tests
docs: update project overview
```

### API

Version:

```text
/api/v1
```

Ví dụ:

```text
GET    /api/v1/courses
GET    /api/v1/courses/{id}
POST   /api/v1/enrollments
POST   /api/v1/tests/{id}/attempts
POST   /api/v1/attempts/{id}/submit
GET    /api/v1/progress
GET    /api/v1/vocabulary
```

Lỗi có cấu trúc:

```json
{
  "error": {
    "code": "TEST_ATTEMPT_ALREADY_SUBMITTED",
    "message": "This test attempt has already been submitted.",
    "details": {},
    "requestId": "..."
  }
}
```

### Naming

- Database table: `snake_case`.
- API resource: plural nouns.
- TypeScript: `PascalCase` cho type/class.
- Variable/function: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` khi phù hợp.
- Domain terms phải nhất quán với SRS.

---

## 13. Development phases

### Phase 0 — Foundation

- Repository.
- Next.js.
- NestJS.
- Supabase PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- Redis.
- CI/CD.
- Environment configuration.
- Authentication foundation.
- Shared types/validation.

### Phase 1 — Public Platform

- Home.
- Course catalog.
- Course detail.
- Articles.
- Resources.
- Register.
- Login.
- Trial content.

### Phase 2 — Core Learning

- Student Dashboard.
- Course enrollment.
- Course.
- Module.
- Lesson.
- Learning materials.
- Exercise.
- Quiz.
- Progress.

### Phase 3 — IELTS + HSK

- IELTS course structure.
- HSK course structure.
- Question Bank.
- IELTS question types.
- HSK vocabulary.
- Listening.
- Reading.
- Writing.
- Speaking.
- Mock Test.

### Phase 4 — Assessment

- Placement Test.
- Diagnostic Test.
- Test Builder.
- Test Attempt.
- Scoring.
- Assessment Result.
- Learning Gap.
- Learning Path.

### Phase 5 — Commerce

- Package.
- Order.
- Payment.
- Coupon.
- Course access.
- Invoice/transaction history.

### Phase 6 — Admin & Analytics

- Admin Dashboard.
- Student management.
- Content management.
- Question Bank management.
- Test Builder.
- Vocabulary management.
- CMS.
- Order management.
- Analytics.

### Phase 7 — Intelligence

- AI Writing Feedback.
- AI Speaking Feedback.
- AI Tutor.
- AI-generated practice.
- Advanced Recommendation.
- Study Plan optimization.
- Spaced Repetition.
- Personalized learning.

---

## 14. Source of product decisions

Các quyết định chức năng phải ưu tiên theo thứ tự:

```text
1. Project report / approved requirements
2. FRS
3. SRS
4. Product Owner decision
5. Implementation convention
```

Không tự thêm behavior làm thay đổi nghiệp vụ mà chưa được thống nhất.

Các yêu cầu chi tiết của hệ thống được mô tả trong SRS và các tài liệu đặc tả liên quan.

---

## 15. Definition of Done

Một feature được xem là hoàn thành khi:

```text
Requirement understood
      ↓
Design agreed
      ↓
Implementation completed
      ↓
Validation added
      ↓
Authorization verified
      ↓
Unit / integration tests passed
      ↓
E2E workflow passed where applicable
      ↓
Error handling completed
      ↓
Audit / logging considered
      ↓
Documentation updated
      ↓
Code review passed
```

Đối với feature có ảnh hưởng đến learning result, payment hoặc access control, phải kiểm tra thêm:

- Idempotency.
- Transaction.
- Permission.
- Data consistency.
- Auditability.

---

## 16. Tài liệu liên quan

Các tài liệu chính của dự án:

```text
PROJECT_OVERVIEW.md
SRS.md
FRS.md
ERD.md
API_SPEC.md
UI_SPEC.md
TEST_PLAN.md
DEPLOYMENT.md
```

Trong đó:

- `PROJECT_OVERVIEW.md`: tổng quan hệ thống, kiến trúc và công nghệ.
- `SRS.md`: yêu cầu phần mềm chi tiết.
- `FRS.md`: đặc tả chức năng.
- `ERD.md`: mô hình dữ liệu.
- `API_SPEC.md`: đặc tả API.
- `UI_SPEC.md`: đặc tả giao diện.
- `TEST_PLAN.md`: chiến lược kiểm thử.
- `DEPLOYMENT.md`: hướng dẫn triển khai.

