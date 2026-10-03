# Web Học Ngoại Ngữ — UI / UX Wireframes

> Low-fidelity wireframe specification cho Public, Student, Reviewer và Admin.
>
> Design System: Glassmorphism có kiểm soát.  
> Learning screen ưu tiên readability.  
> Test screen giảm blur/animation/decorative elements.

---

# 1. Information Architecture

```text
PUBLIC
├── /
├── /courses
├── /courses/:slug
├── /packages
├── /trial
├── /placement-test
├── /articles
├── /articles/:slug
├── /resources
├── /about
├── /contact
├── /login
└── /register

STUDENT
├── /dashboard
├── /my-courses
├── /learning/:courseId
├── /lesson/:lessonId
├── /practice
├── /exams
├── /test/:attemptId
├── /results
├── /progress
├── /vocabulary
├── /learning-path
├── /study-plan
├── /submissions
├── /orders
├── /certificates
├── /notifications
└── /profile

REVIEWER
├── /review/queue
└── /review/:submissionId

ADMIN
├── /admin
├── /admin/students
├── /admin/courses
├── /admin/question-bank
├── /admin/tests
├── /admin/vocabulary
├── /admin/submissions
├── /admin/articles
├── /admin/resources
├── /admin/packages
├── /admin/orders
├── /admin/coupons
├── /admin/certificates
├── /admin/analytics
├── /admin/audit
└── /admin/settings
```

---

# 2. Global Layout

## 2.1 Public Header

```text
┌────────────────────────────────────────────────────────────────────┐
│ LOGO   Khóa học   IELTS   HSK   Tài nguyên   Bài viết       🔍    │
│                                                   Đăng nhập [ĐK]   │
└────────────────────────────────────────────────────────────────────┘
```

Desktop max content width:

```text
1200–1280px
```

Mobile:

```text
Logo | Search | Menu
```

## 2.2 Student App Shell

```text
┌───────────────┬─────────────────────────────────────────────────────┐
│ LOGO          │ Topbar: Search | Notifications | Avatar            │
│               ├─────────────────────────────────────────────────────┤
│ Dashboard     │                                                     │
│ Khóa của tôi  │                                                     │
│ Lộ trình      │                 PAGE CONTENT                        │
│ Luyện tập     │                                                     │
│ Bài thi       │                                                     │
│ Từ vựng       │                                                     │
│ Tiến độ       │                                                     │
│               │                                                     │
│ Profile       │                                                     │
└───────────────┴─────────────────────────────────────────────────────┘
```

Sidebar desktop:

```text
240–272px
```

Mobile dùng bottom navigation hoặc drawer.

---

# 3. Homepage `/`

Mục tiêu:

```text
SEO
→ giải thích giá trị
→ chia IELTS / HSK
→ course discovery
→ placement/trial CTA
```

Wireframe:

```text
┌───────────────────────────────────────────────────────────────────┐
│ HEADER                                                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   Học IELTS & HSK theo lộ trình rõ ràng                          │
│   Đánh giá trình độ → học đúng phần còn yếu                      │
│                                                                   │
│   [Làm bài đánh giá]   [Xem khóa học]                             │
│                                                                   │
│                   [Hero Illustration]                              │
├───────────────────────────────────────────────────────────────────┤
│  IELTS                                  HSK                        │
│  [Listening] [Reading]                  [HSK 1] [HSK 2]            │
│  [Writing]   [Speaking]                 [HSK 3] [HSK 4...]         │
├───────────────────────────────────────────────────────────────────┤
│  Lộ trình hoạt động như thế nào?                                  │
│  1 Đánh giá → 2 Mục tiêu → 3 Học → 4 Luyện → 5 Theo dõi          │
├───────────────────────────────────────────────────────────────────┤
│  Khóa học nổi bật                                                 │
│  [Course Card] [Course Card] [Course Card]                        │
├───────────────────────────────────────────────────────────────────┤
│  Tài nguyên / Bài viết                                            │
│  [Article] [Article] [Resource]                                   │
├───────────────────────────────────────────────────────────────────┤
│  CTA: Chưa biết bắt đầu từ đâu? [Làm Placement Test]              │
├───────────────────────────────────────────────────────────────────┤
│ FOOTER                                                            │
└───────────────────────────────────────────────────────────────────┘
```

---

# 4. Course Catalog `/courses`

```text
┌──────────────────────────────────────────────────────────────────┐
│ Khóa học                                                         │
│ Tìm khóa học phù hợp với mục tiêu của bạn                        │
├──────────────────────────────────────────────────────────────────┤
│ Search [____________________]                                     │
│                                                                  │
│ Language [English ▼] Exam [IELTS ▼] Level [All ▼] Skill [All ▼] │
│ Type [All ▼]                                      Sort [Popular] │
├────────────────────┬─────────────────────────────────────────────┤
│ FILTER SIDEBAR     │ [Course Card] [Course Card] [Course Card]   │
│ - IELTS            │                                             │
│ - HSK              │ [Course Card] [Course Card] [Course Card]   │
│ - Skill            │                                             │
│ - Level            │                  Pagination                 │
└────────────────────┴─────────────────────────────────────────────┘
```

Course Card:

```text
┌──────────────────────────┐
│        Thumbnail         │
├──────────────────────────┤
│ IELTS • Reading          │
│ IELTS Reading Foundation │
│ Foundation → 5.5         │
│ ███████░ 8 modules       │
│ 499.000đ       [Chi tiết]│
└──────────────────────────┘
```

---

# 5. Course Detail `/courses/:slug`

```text
┌──────────────────────────────────────────────────────────────────┐
│ IELTS / Reading                                                  │
│                                                                  │
│ IELTS Reading Foundation                 ┌─────────────────────┐ │
│ Mô tả ngắn...                             │ Thumbnail / Preview │ │
│ metadata                                 │                     │ │
│                                          │ 499.000đ            │ │
│ [Học thử] [Mua khóa học]                 │ [Mua ngay]          │ │
│                                          └─────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ Bạn sẽ học được gì?                                              │
│ ✓ ...  ✓ ...  ✓ ...                                             │
├──────────────────────────────────────────────────────────────────┤
│ Nội dung khóa học                                                │
│ ▼ Module 1                                                      │
│   ○ Lesson 1 [Preview]                                           │
│   🔒 Lesson 2                                                    │
│ ▼ Module 2                                                      │
├──────────────────────────────────────────────────────────────────┤
│ Phù hợp với ai? | Yêu cầu đầu vào | FAQ                          │
└──────────────────────────────────────────────────────────────────┘
```

---

# 6. Login / Register

```text
┌──────────────────────────────────────────────────────────────────┐
│                     [Brand / Illustration]                       │
│                                                                  │
│                  ┌────────────────────────┐                      │
│                  │ Đăng nhập              │                      │
│                  │ Email                  │                      │
│                  │ [____________________] │                      │
│                  │ Password               │                      │
│                  │ [____________________] │                      │
│                  │ [ Đăng nhập ]          │                      │
│                  │ Quên mật khẩu?         │                      │
│                  │ Chưa có TK? Đăng ký    │                      │
│                  └────────────────────────┘                      │
└──────────────────────────────────────────────────────────────────┘
```

States:

- loading,
- invalid credentials,
- email not verified,
- account suspended,
- success redirect.

---

# 7. Student Dashboard `/dashboard`

Ưu tiên:

```text
Goal
Current Level
Target Level
Today Plan
Progress
Weak Skills
Next Learning
```

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xin chào, An 👋                                                  │
│ IELTS • Current 5.0 → Target 6.5 • 120 ngày                     │
├──────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────┐ ┌───────────────────────────────┐ │
│ │ TIẾN ĐỘ MỤC TIÊU           │ │ TIẾP TỤC HỌC                  │ │
│ │ 5.0 ───────●────── 6.5    │ │ Reading: Matching Headings    │ │
│ │ 42% roadmap               │ │ 18 phút                       │ │
│ │ [Xem lộ trình]             │ │ [Tiếp tục]                    │ │
│ └────────────────────────────┘ └───────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ HÔM NAY                                                           │
│ □ 20m Listening   □ 15m Vocabulary   □ 25m Reading              │
├──────────────────────────────────────────────────────────────────┤
│ KỸ NĂNG                                                           │
│ Listening  ███████░  5.5                                         │
│ Reading    ████████  6.0                                         │
│ Writing    █████░░░  4.5  ← cần cải thiện                       │
│ Speaking   ██████░░  5.0                                         │
├──────────────────────────────────────────────────────────────────┤
│ Khóa đang học                │ Kết quả gần đây                   │
│ [Course progress cards]      │ [Result list]                     │
└──────────────────────────────────────────────────────────────────┘
```

---

# 8. Placement Test — Intro

```text
┌──────────────────────────────────────────────────────────────────┐
│ Đánh giá trình độ IELTS                                         │
│                                                                  │
│ Thời gian dự kiến: 45 phút                                      │
│ Kỹ năng: Listening • Reading • ...                              │
│                                                                  │
│ Bài đánh giá giúp ước lượng trình độ để xây dựng lộ trình.      │
│ Kết quả không phải chứng chỉ IELTS chính thức.                  │
│                                                                  │
│ □ Tôi đã sẵn sàng                                                │
│                                                                  │
│                        [Bắt đầu]                                 │
└──────────────────────────────────────────────────────────────────┘
```

---

# 9. Placement / Test Taking Screen

**Test Mode: giảm Glassmorphism.**

```text
┌──────────────────────────────────────────────────────────────────┐
│ IELTS Placement   Section 1/4             ⏱ 32:14   [Submit]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ┌──────────────────────────────────────┐ ┌─────────────────────┐ │
│ │ Passage / Audio / Context           │ │ Câu 1               │ │
│ │                                      │ │ Prompt...            │ │
│ │                                      │ │ ○ A                  │ │
│ │                                      │ │ ○ B                  │ │
│ │                                      │ │ ○ C                  │ │
│ │                                      │ │ ○ D                  │ │
│ └──────────────────────────────────────┘ └─────────────────────┘ │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ 1 ● 2 ● 3 ○ 4 ○ 5 ⚑ ...                            [Next →]     │
└──────────────────────────────────────────────────────────────────┘
```

States:

```text
answered
unanswered
flagged
current
disabled/locked
```

---

# 10. Assessment Result

```text
┌──────────────────────────────────────────────────────────────────┐
│ Kết quả đánh giá                                                 │
│                                                                  │
│        Estimated Overall                                         │
│               5.0                                                │
│                                                                  │
│ Current 5.0                       Target 6.5                      │
├──────────────────────────────────────────────────────────────────┤
│ Listening  5.5  ███████░                                         │
│ Reading    6.0  ████████                                         │
│ Writing    4.5  █████░░░  Cần cải thiện                         │
│ Speaking   5.0  ██████░░                                         │
├──────────────────────────────────────────────────────────────────┤
│ Khoảng trống chính                                               │
│ • Writing coherence                                              │
│ • Academic vocabulary                                           │
│ • Listening form completion                                      │
├──────────────────────────────────────────────────────────────────┤
│ [Thiết lập mục tiêu]   [Tạo lộ trình học]                        │
└──────────────────────────────────────────────────────────────────┘
```

---

# 11. My Courses `/my-courses`

```text
┌──────────────────────────────────────────────────────────────────┐
│ Khóa học của tôi                                                 │
│ [Đang học] [Hoàn thành] [Tất cả]                                │
├──────────────────────────────────────────────────────────────────┤
│ IELTS Reading Foundation                                         │
│ ████████████░░ 72%                                               │
│ Bài tiếp theo: Matching Information                              │
│ [Tiếp tục học]                                                   │
├──────────────────────────────────────────────────────────────────┤
│ HSK 2                                                            │
│ █████░░░░░░░░ 34%                                                │
│ [Tiếp tục học]                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

# 12. Course Learning `/learning/:courseId`

```text
┌──────────────────────┬───────────────────────────────────────────┐
│ COURSE OUTLINE       │ IELTS Reading Foundation                 │
│                      │                                           │
│ ✓ Module 1           │ Progress 42%                             │
│   ✓ Lesson 1         │                                           │
│   ● Lesson 2         │ Tiếp tục: Matching Headings              │
│   ○ Lesson 3         │                                           │
│ 🔒 Module 2          │ [Tiếp tục học]                           │
│                      │                                           │
│                      │ Tổng quan Module                         │
└──────────────────────┴───────────────────────────────────────────┘
```

---

# 13. Lesson `/lesson/:lessonId`

```text
┌──────────────────────┬───────────────────────────────────────────┐
│ LESSON NAV           │ Lesson title                             │
│ ✓ Introduction       │ 25 phút • Reading                       │
│ ● Main lesson        │──────────────────────────────────────────│
│ ○ Practice           │                                           │
│ ○ Summary            │ [Video/Audio/Text Material]              │
│                      │                                           │
│                      │ Heading                                  │
│                      │ Long-form readable content...            │
│                      │                                           │
│                      │ [Vocabulary callout]                     │
│                      │                                           │
│                      │ [Practice block]                         │
│                      │                                           │
│                      │ [Hoàn thành & tiếp tục →]                │
└──────────────────────┴───────────────────────────────────────────┘
```

Reading content:

```text
16–18px
line-height ~1.7
solid/near-solid content surface
```

---

# 14. Writing Editor

```text
┌──────────────────────────────────────────────────────────────────┐
│ IELTS Writing Task 2                          Saved ✓            │
├──────────────────────────────────────────────────────────────────┤
│ Prompt                                                           │
│ Some people think...                                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ [ Large distraction-free editor ]                                │
│                                                                  │
│ Words: 248                                      Last saved 21:14│
├──────────────────────────────────────────────────────────────────┤
│ [Lưu nháp]                                    [Nộp bài]          │
└──────────────────────────────────────────────────────────────────┘
```

Submit phải có confirm vì Submission sẽ bị lock theo state rule.

---

# 15. Speaking Recorder

```text
┌──────────────────────────────────────────────────────────────────┐
│ IELTS Speaking Part 2                                           │
│ Cue card                                                         │
│ Describe a place...                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                       01:12                                      │
│                 ● RECORDING                                      │
│                                                                  │
│            [Pause]        [Stop]                                 │
│                                                                  │
│                  ~ waveform ~                                    │
├──────────────────────────────────────────────────────────────────┤
│ Sau khi dừng: [Play] [Record lại] [Upload & Nộp]                │
└──────────────────────────────────────────────────────────────────┘
```

States:

```text
IDLE
REQUESTING_PERMISSION
READY
RECORDING
PAUSED
RECORDED
UPLOADING
UPLOADED
ERROR
```

---

# 16. Test Result

```text
┌──────────────────────────────────────────────────────────────────┐
│ Kết quả Mock Test                                                │
│ Overall estimate: 5.5                                           │
├──────────────────────────────────────────────────────────────────┤
│ Listening  6.0   Reading 5.5   Writing Pending Review           │
├──────────────────────────────────────────────────────────────────┤
│ Accuracy                                                         │
│ Correct 28 / 40                                                  │
│                                                                  │
│ Performance by Question Type                                     │
│ Matching Headings       60%                                      │
│ T/F/NG                  80%                                      │
│ Completion              55%                                      │
├──────────────────────────────────────────────────────────────────┤
│ Cần cải thiện                                                    │
│ ...                                                              │
│                                                                  │
│ [Xem giải thích nếu policy cho phép] [Học tiếp]                  │
└──────────────────────────────────────────────────────────────────┘
```

---

# 17. Vocabulary `/vocabulary`

```text
┌──────────────────────────────────────────────────────────────────┐
│ Từ vựng của tôi                                                  │
│ [NEW 42] [LEARNING 31] [REVIEW 18] [MASTERED 120]              │
├──────────────────────────────────────────────────────────────────┤
│ Search...                     [English ▼] [State ▼]              │
├──────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────┐  ┌────────────────────────────┐   │
│ │ 学习                       │  │ environment                │   │
│ │ xuéxí                      │  │ /.../                      │   │
│ │ học tập                    │  │ môi trường                 │   │
│ │ 🔊                         │  │ 🔊                         │   │
│ │ LEARNING                   │  │ REVIEW                     │   │
│ └────────────────────────────┘  └────────────────────────────┘   │
│                                                                  │
│ [Bắt đầu ôn 18 từ]                                               │
└──────────────────────────────────────────────────────────────────┘
```

HSK toggles:

```text
Hanzi [ON]
Pinyin [ON]
Meaning [ON]
Audio [ON]
```

---

# 18. Learning Path `/learning-path`

```text
┌──────────────────────────────────────────────────────────────────┐
│ Lộ trình IELTS 5.0 → 6.5                                        │
│ Target: 30/04/2027 • 60 phút/ngày                               │
├──────────────────────────────────────────────────────────────────┤
│ ✓ 1. Foundation                                                   │
│    IELTS Foundation                         COMPLETED             │
│ │                                                                │
│ ● 2. Strengthen Writing                                           │
│    Writing Task 2 Foundation                CURRENT               │
│ │                                                                │
│ ○ 3. Reading Advanced                                             │
│    Matching / T-F-NG                         NEXT                 │
│ │                                                                │
│ 🔒 4. Full Mock Test                                              │
├──────────────────────────────────────────────────────────────────┤
│ [Xem kế hoạch hôm nay]                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

# 19. Study Plan

```text
┌──────────────────────────────────────────────────────────────────┐
│ Hôm nay                                                          │
├──────────────────────────────────────────────────────────────────┤
│ □ 20 phút — Review vocabulary                                    │
│ □ 25 phút — Reading lesson                                      │
│ □ 15 phút — Listening practice                                  │
│                                                                  │
│ Total: 60 phút                                                   │
├──────────────────────────────────────────────────────────────────┤
│ Tuần này                                                         │
│ Mon ✓ Tue ✓ Wed 45m Thu 30m Fri ● Sat ○ Sun ○                  │
└──────────────────────────────────────────────────────────────────┘
```

---

# 20. Checkout

```text
┌─────────────────────────────────────────┬────────────────────────┐
│ Thanh toán                              │ Tóm tắt                │
│                                         │ IELTS Roadmap          │
│ Email / account                         │ 999.000đ               │
│                                         │                        │
│ Mã giảm giá [________] [Áp dụng]       │ Discount -100.000đ    │
│                                         │ ───────────────────    │
│ Payment method                          │ Total 899.000đ         │
│ ○ Provider A                            │                        │
│                                         │                        │
│ [Tiếp tục thanh toán]                  │                        │
└─────────────────────────────────────────┴────────────────────────┘
```

Không active course access chỉ dựa vào redirect; chờ Backend payment state.

---

# 21. Admin Dashboard

```text
┌───────────────┬───────────────────────────────────────────────────┐
│ ADMIN NAV     │ Dashboard                                         │
│ Dashboard     │                                                   │
│ Students      │ [Students] [Active Learners] [Revenue] [Orders] │
│ Courses       │                                                   │
│ Questions     │ Learning Trend                                    │
│ Tests         │ [Chart]                                           │
│ Vocabulary    │                                                   │
│ CMS           │ Course Performance                                │
│ Orders        │ [Table]                                           │
│ Analytics     │                                                   │
└───────────────┴───────────────────────────────────────────────────┘
```

Admin Mode giảm blur, ưu tiên density/readability.

---

# 22. Admin Course Editor

```text
┌──────────────┬────────────────────────────────────────────────────┐
│ Course Nav   │ IELTS Reading Foundation             DRAFT         │
│ Overview     │ [Save] [Preview] [Publish]                         │
│ Curriculum   ├────────────────────────────────────────────────────┤
│ Pricing      │ Title [____________________________]                │
│ SEO          │ Slug  [____________________________]                │
│ Settings     │ Exam [IELTS] Version [...] Level [...]             │
│              │ Skills [Reading]                                   │
│              │ Description                                        │
│              │ [Rich content editor]                              │
└──────────────┴────────────────────────────────────────────────────┘
```

Curriculum:

```text
Module 1  ⋮
  Lesson 1  ⋮
  Lesson 2  ⋮
  + Add Lesson
+ Add Module
```

---

# 23. Admin Question Bank

```text
┌──────────────────────────────────────────────────────────────────┐
│ Question Bank                                    [+ Question]    │
├──────────────────────────────────────────────────────────────────┤
│ Search [________] Exam [IELTS] Skill [Reading] Type [All]       │
│ Level [All] Difficulty [All] Status [Published]                 │
├──────────────────────────────────────────────────────────────────┤
│ □ | Question               | Type     | Skill   | Level | Status │
│ □ | The passage states...  | T/F/NG   | Reading | 6.0   | Pub   │
│ □ | Choose the answer...   | MCQ      | Listen  | 5.0   | Draft │
├──────────────────────────────────────────────────────────────────┤
│ Pagination                                                       │
└──────────────────────────────────────────────────────────────────┘
```

Question Editor:

```text
Metadata
Prompt
Media
Answer options
Answer key
Explanation
Preview
```

---

# 24. Admin Test Builder

```text
┌──────────────────────┬────────────────────────────────────────────┐
│ TEST STRUCTURE       │ Section 1 — Reading                       │
│                      │                                            │
│ Section 1            │ 1 [Question preview] [1 point] ⋮           │
│  1 Q1                │ 2 [Question preview] [1 point] ⋮           │
│  2 Q2                │                                            │
│                      │ [+ Add from Question Bank]                │
│ Section 2            │                                            │
│                      │ [Validate Version] [Publish]               │
│ [+ Section]          │                                            │
└──────────────────────┴────────────────────────────────────────────┘
```

Publish phải validate trước.

---

# 25. Reviewer Workspace

```text
┌──────────────────────┬────────────────────────────────────────────┐
│ REVIEW QUEUE         │ Submission                                │
│ Writing (12)         │ Student: ...                              │
│ Speaking (8)         │ Task: IELTS Writing Task 2                │
│ Mine (4)             │                                            │
│                      │ [Student answer / audio]                   │
│ > Submission A       │                                            │
│   Submission B       │ Task Response        [ 6.0 ]               │
│                      │ Coherence            [ 5.5 ]               │
│                      │ Lexical Resource     [ 5.5 ]               │
│                      │ Grammar              [ 5.0 ]               │
│                      │ Feedback [________________________]        │
│                      │ [Save Draft] [Publish Review]              │
└──────────────────────┴────────────────────────────────────────────┘
```

---

# 26. Responsive Rules

## Desktop

```text
>= 1200px
```

- full sidebar,
- split reading/test,
- admin tables.

## Tablet

```text
768–1199px
```

- collapsible sidebar,
- two-column where safe.

## Mobile

```text
< 768px
```

- no persistent sidebar,
- single-column lesson,
- collapsible test navigator,
- tables become cards/horizontal scroll where needed,
- sticky primary action when useful.

---

# 27. Accessibility

Mandatory:

- keyboard navigation,
- visible focus,
- semantic headings,
- labels,
- errors not color-only,
- sufficient contrast,
- accessible audio controls,
- ~44px touch target,
- no essential info only in transparency.

---

# 28. Loading / Empty / Error

Mỗi screen có:

```text
Loading
Empty
Error
Permission denied
Retry
```

Dashboard empty:

```text
Bạn chưa có mục tiêu học tập.
[Làm Placement Test] [Tạo mục tiêu]
```

---

# 29. Wireframe Delivery Priority

## MVP Prototype

```text
1. Homepage
2. Course Catalog
3. Course Detail
4. Login/Register
5. Student Dashboard
6. Placement Test
7. Assessment Result
8. My Courses
9. Course Learning
10. Lesson
11. Test Taking
12. Test Result
13. Vocabulary
14. Learning Path
15. Admin Dashboard
16. Admin Course Editor
17. Question Bank
18. Test Builder
```

## Phase tiếp

```text
Writing
Speaking
Reviewer
Checkout
Orders
Certificates
CMS
Analytics detail
```

---

# 30. Figma Frame Naming

```text
PUB/Home/Desktop
PUB/Courses/Desktop
PUB/CourseDetail/Desktop

AUTH/Login/Desktop
AUTH/Register/Desktop

STU/Dashboard/Desktop
STU/Placement/Question/Desktop
STU/Placement/Result/Desktop
STU/Lesson/Desktop
STU/Test/Desktop
STU/Vocabulary/Desktop

ADM/Dashboard/Desktop
ADM/CourseEditor/Desktop
ADM/QuestionBank/Desktop
ADM/TestBuilder/Desktop

REV/Submission/Desktop
```

Mobile:

```text
STU/Dashboard/Mobile
```

---

# 31. UI Acceptance Checklist

```text
[ ] Matches DESIGN_SYSTEM.md tokens
[ ] Public / Student / Admin modes visually distinct
[ ] Test Mode minimizes distraction
[ ] Learning text readable
[ ] Primary CTA obvious
[ ] Locked/access states clear
[ ] Loading/empty/error included
[ ] Keyboard navigation planned
[ ] Mobile behavior specified
[ ] No answer key exposed in Student UI
[ ] Payment status uses Backend source of truth
[ ] Writing/Speaking submit confirmation exists
```
