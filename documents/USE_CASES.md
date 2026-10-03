# Web Học Ngoại Ngữ — Use Case Specification

## 1. Actor Catalogue

| Mã | Actor | Vai trò |
|---|---|---|
| ACT-01 | Visitor | Người chưa đăng nhập, truy cập website public |
| ACT-02 | Student | Người học đã đăng nhập |
| ACT-03 | Admin | Quản trị toàn bộ hệ thống |
| ACT-04 | Content Manager | Quản lý nội dung khóa học và học liệu |
| ACT-05 | Teacher / Reviewer | Đánh giá Writing và Speaking |
| ACT-06 | Payment Provider | Hệ thống thanh toán bên thứ ba |
| ACT-07 | Storage Provider | Hệ thống lưu trữ media/file |
| ACT-08 | Email Provider | Hệ thống gửi email |
| ACT-09 | AI Service | Dịch vụ LLM/AI bên thứ ba |
| ACT-10 | System Worker | Tác vụ nền của hệ thống |
| ACT-11 | Realtime Gateway | Thành phần phục vụ realtime notification/event |
| ACT-12 | Analytics Service | Thành phần tổng hợp/phân tích dữ liệu |

---

## 2. Use Case Diagram cấp hệ thống

```text
                         WEB HỌC NGOẠI NGỮ
                                  |
       ┌──────────────────────────┼──────────────────────────┐
       |                          |                          |
    Account                  Discovery                  Learning
       |                          |                          |
 Register/Login              Home/Courses              Dashboard
 Profile                     Course Detail              My Courses
 Security                    Articles/Resources          Lesson
       |                     Trial Content              Practice
       |                          |                      Vocabulary
       └──────────────────────────┼──────────────────────────┘
                                  |
                         Assessment / Exam
                                  |
                    Placement / Diagnostic Test
                    IELTS / HSK / Mock Test
                    Question Bank / Test Builder
                                  |
                    ┌─────────────┴─────────────┐
                    |                           |
               Progress                    Submission
                    |                           |
              Learning Path              Writing / Speaking
              Study Plan                  Review / Feedback
              Skill Analysis
                    |
                    └─────────────┬─────────────┘
                                  |
                             Commerce
                                  |
                 Package / Order / Payment / Coupon
                                  |
                         ┌────────┴────────┐
                         |                 |
                        CMS             Analytics
                         |                 |
                  Articles / Course     Learning
                  Vocabulary / Tests    Assessment
                  Resources             Commerce
                         |
                         └────────┬────────┘
                                  |
                              AI Services
                                  |
                    AI Practice / Tutor / Feedback
```

---

## 3. Nhóm UC-AUTH — Tài khoản

### UC-AUTH-001 — Đăng ký

**Actor:** Visitor

**Mục tiêu:** Tạo tài khoản Student.

**Tiền điều kiện:** Người dùng chưa đăng nhập.

**Luồng chính:**
1. Người dùng mở trang đăng ký.
2. Nhập email, mật khẩu và thông tin bắt buộc.
3. Hệ thống validate dữ liệu.
4. Kiểm tra email đã tồn tại.
5. Hash mật khẩu.
6. Tạo User.
7. Gán role Student mặc định.
8. Gửi email xác minh nếu được bật.
9. Chuyển người dùng sang trạng thái xác minh/đăng nhập.

**Ngoại lệ:**
- Email đã tồn tại.
- Email không hợp lệ.
- Password không đạt policy.
- Hệ thống không thể gửi email.

---

### UC-AUTH-002 — Xác minh Email

**Actor:** Visitor / Student

**Luồng chính:**
1. User mở verification link.
2. Hệ thống kiểm tra token.
3. Kiểm tra hạn sử dụng.
4. Kiểm tra token đã sử dụng hay chưa.
5. Kích hoạt trạng thái verified.
6. Cho phép đăng nhập.

**Ngoại lệ:**
- Token không hợp lệ.
- Token hết hạn.
- Token đã sử dụng.

---

### UC-AUTH-003 — Đăng nhập

1. User nhập email/password.
2. Hệ thống xác thực.
3. Kiểm tra trạng thái account.
4. Kiểm tra MFA nếu được triển khai.
5. Tạo session/token.
6. Chuyển tới Dashboard hoặc trang trước đó.

---

### UC-AUTH-004 — Đăng xuất

Hủy session/token hiện tại.

---

### UC-AUTH-005 — Quên mật khẩu

1. User nhập email.
2. Hệ thống tạo reset token dùng một lần.
3. Gửi email.
4. User mở reset link.
5. Đặt password mới.
6. Hệ thống vô hiệu hóa token cũ.

---

### UC-AUTH-006 — Quản lý Session

Student/Admin có thể:
- Xem session đang hoạt động.
- Revoke session.
- Logout các session khác.

---

## 4. Nhóm UC-USER — Hồ sơ và tùy chọn

### UC-USER-001 — Xem hồ sơ

Hiển thị:
- Avatar.
- Họ tên.
- Email.
- Ngôn ngữ.
- Learning preferences.
- Mục tiêu học tập.

### UC-USER-002 — Cập nhật hồ sơ

### UC-USER-003 — Đổi Avatar

### UC-USER-004 — Đổi Timezone

### UC-USER-005 — Đổi Language / UI Locale

### UC-USER-006 — Cấu hình Notification

### UC-USER-007 — Cấu hình Learning Preferences

Ví dụ:
- Mục tiêu IELTS/HSK.
- Thời gian học mỗi ngày.
- Kỹ năng ưu tiên.
- Ngày mục tiêu.

### UC-USER-008 — Quản lý Privacy

---

## 5. Nhóm UC-PUBLIC — Website Public

### UC-PUB-001 — Xem Homepage

**Actor:** Visitor

Hiển thị:
- Giới thiệu sản phẩm.
- IELTS.
- HSK.
- Course highlights.
- Trial content.
- Placement Test.
- Articles.
- CTA đăng ký.

### UC-PUB-002 — Xem Course Catalog

1. Visitor mở danh sách khóa học.
2. Hệ thống tải course đã publish.
3. Có thể lọc theo:
   - Language.
   - Exam.
   - Level.
   - Skill.
   - Course type.

### UC-PUB-003 — Xem Course Detail

Hiển thị:
- Course description.
- Level.
- Skill.
- Learning objectives.
- Modules.
- Lessons.
- Duration.
- Price.
- Package liên quan.
- Điều kiện truy cập.

### UC-PUB-004 — Xem Trial Content

Visitor có thể xem nội dung được đánh dấu public/trial.

### UC-PUB-005 — Xem Article

### UC-PUB-006 — Xem Resource

### UC-PUB-007 — Tìm kiếm nội dung Public

Tìm kiếm:
- Course.
- Article.
- Resource.
- Vocabulary/public learning content nếu được publish.

---

## 6. Nhóm UC-COURSE — Khóa học

### UC-COURSE-001 — Tạo Course

**Actor:** Admin / Content Manager

**Luồng:**
1. Chọn Create Course.
2. Nhập tên và thông tin.
3. Chọn Language.
4. Chọn Exam nếu có.
5. Chọn Level/Skill.
6. Thiết lập giá và access policy.
7. Lưu Draft.
8. Tạo Course.

### UC-COURSE-002 — Xem Course

### UC-COURSE-003 — Sửa Course

### UC-COURSE-004 — Publish Course

1. Kiểm tra required fields.
2. Kiểm tra module/lesson.
3. Kiểm tra content dependency.
4. Publish.
5. Course trở thành public theo visibility policy.

### UC-COURSE-005 — Unpublish Course

### UC-COURSE-006 — Archive Course

### UC-COURSE-007 — Restore Course

### UC-COURSE-008 — Delete Course

Course đã có dữ liệu học tập không nên hard-delete nếu ảnh hưởng lịch sử enrollment/result.

### UC-COURSE-009 — Quản lý Course Access

Kiểm tra quyền truy cập dựa trên:
- Enrollment.
- Package.
- Admin grant.
- Course visibility.

---

## 7. Nhóm UC-MODULE — Module và Lesson

### UC-MOD-001 — Tạo Module

### UC-MOD-002 — Sửa Module

### UC-MOD-003 — Xóa Module

### UC-MOD-004 — Sắp xếp Module

### UC-LES-001 — Tạo Lesson

### UC-LES-002 — Sửa Lesson

### UC-LES-003 — Publish Lesson

### UC-LES-004 — Archive Lesson

### UC-LES-005 — Sắp xếp Lesson

### UC-LES-006 — Xem Lesson

Lesson có thể chứa:

```text
Video
Vocabulary
Grammar
Listening
Reading
Writing
Speaking
Practice
Summary
```

### UC-LES-007 — Hoàn thành Lesson

1. Student mở lesson.
2. Hệ thống tải materials.
3. Student học nội dung.
4. Student hoàn thành activity/required items.
5. Hệ thống ghi progress.
6. Nếu đủ điều kiện → Lesson Completed.

---

## 8. Nhóm UC-MATERIAL — Learning Material

### UC-MAT-001 — Tạo Learning Material

### UC-MAT-002 — Sửa Learning Material

### UC-MAT-003 — Xóa Learning Material

### UC-MAT-004 — Upload Video

### UC-MAT-005 — Upload Audio

### UC-MAT-006 — Thêm Text / Rich Content

### UC-MAT-007 — Preview Material

### UC-MAT-008 — Publish Material

---

## 9. Nhóm UC-PRACTICE — Luyện tập

### UC-PRAC-001 — Mở Exercise

### UC-PRAC-002 — Làm Exercise

**Luồng:**

```text
Student
→ Open Exercise
→ Load Questions
→ Answer
→ Validate Input
→ Submit
→ Calculate Score
→ Save Result
→ Update Progress
→ Show Explanation
```

**Ngoại lệ:**
- Exercise unavailable.
- User không có quyền.
- Attempt expired.
- Submission duplicate.

### UC-PRAC-003 — Làm Quiz

### UC-PRAC-004 — Xem Explanation

### UC-PRAC-005 — Làm lại Exercise

### UC-PRAC-006 — Xem Practice History

### UC-PRAC-007 — Tạo Exercise

**Actor:** Admin / Content Manager

### UC-PRAC-008 — Publish Exercise

---

## 10. Nhóm UC-QB — Question Bank

### UC-QB-001 — Tạo Question

**Actor:** Admin / Content Manager

Question metadata có thể gồm:

```text
type
content
options
answer
explanation
difficulty
skill
language
exam
examVersion
level
targetBand
audio
image
```

### UC-QB-002 — Sửa Question

### UC-QB-003 — Xóa / Archive Question

### UC-QB-004 — Tìm kiếm Question

### UC-QB-005 — Filter Question

Theo:
- Exam.
- Exam Version.
- Skill.
- Level.
- Difficulty.
- Question Type.

### UC-QB-006 — Preview Question

### UC-QB-007 — Import Question

### UC-QB-008 — Export Question

### UC-QB-009 — Reuse Question

Một Question có thể được sử dụng trong nhiều Exercise/Test nếu policy cho phép.

---

## 11. Nhóm UC-TEST — Test Builder và Exam

### UC-TEST-001 — Tạo Test

**Actor:** Admin / Content Manager

**Luồng:**
1. Tạo Test.
2. Chọn Exam.
3. Chọn Exam Version.
4. Tạo Section.
5. Chọn Question.
6. Cấu hình thứ tự.
7. Cấu hình scoring.
8. Validate.
9. Save Draft.

### UC-TEST-002 — Sửa Test

### UC-TEST-003 — Tạo Test Section

### UC-TEST-004 — Thêm Question vào Test

### UC-TEST-005 — Sắp xếp Question

### UC-TEST-006 — Cấu hình Scoring

### UC-TEST-007 — Publish Test

### UC-TEST-008 — Version Test

Khi test đã được sử dụng, thay đổi cấu trúc có ảnh hưởng kết quả phải tạo version mới.

### UC-TEST-009 — Archive Test

### UC-TEST-010 — Preview Test

### UC-TEST-011 — Start Test Attempt

**Actor:** Student

1. Student chọn Test.
2. Hệ thống kiểm tra access.
3. Tạo Test Attempt.
4. Ghi start time.
5. Load Test Version.
6. Student bắt đầu làm bài.

### UC-TEST-012 — Submit Test Attempt

```text
Student
→ Submit
→ Validate Attempt
→ Check Time / Status
→ Calculate Score
→ Create Test Result
→ Update Progress
→ Create Assessment/Learning Event
→ Commit
→ Show Result
```

### UC-TEST-013 — Resume Test Attempt

Chỉ cho phép nếu Test policy hỗ trợ resume.

### UC-TEST-014 — Xem Test Result

### UC-TEST-015 — Xem Test History

---

## 12. Nhóm UC-IELTS — IELTS

### UC-IELTS-001 — Làm IELTS Listening

Hỗ trợ các question type được cấu hình cho test version, ví dụ:
- Multiple Choice.
- Form Completion.
- Note Completion.
- Sentence Completion.
- Matching.

### UC-IELTS-002 — Làm IELTS Reading

Có thể hỗ trợ:
- Multiple Choice.
- True / False / Not Given.
- Matching Headings.
- Matching Information.
- Matching.
- Summary Completion.
- Short Answer.

### UC-IELTS-003 — Làm IELTS Writing Task 1

1. Student mở task.
2. Xem prompt.
3. Nhập bài viết.
4. Submit.
5. Tạo Writing Submission.
6. Chuyển sang review.

### UC-IELTS-004 — Làm IELTS Writing Task 2

Tương tự Task 1 nhưng dùng cấu hình Task 2.

### UC-IELTS-005 — Ghi âm IELTS Speaking

```text
Student
→ Open Speaking Task
→ Start Recording
→ Stop Recording
→ Preview
→ Submit
→ Upload Audio
→ Create Submission
```

### UC-IELTS-006 — Xem IELTS Skill Result

Hiển thị kết quả theo:
- Listening.
- Reading.
- Writing.
- Speaking.

### UC-IELTS-007 — Xem Estimated Overall Result

Hệ thống sử dụng scoring configuration đã được định nghĩa cho assessment/test version.

---

## 13. Nhóm UC-HSK — HSK

### UC-HSK-001 — Học HSK theo Level

### UC-HSK-002 — Luyện HSK Listening

### UC-HSK-003 — Luyện HSK Reading

### UC-HSK-004 — Luyện HSK Writing

### UC-HSK-005 — Luyện HSK Speaking

### UC-HSK-006 — Làm HSK Practice Test

### UC-HSK-007 — Làm HSK Mock Test

### UC-HSK-008 — Xem HSK Result

### UC-HSK-009 — Chọn Exam Version

HSK content/test phải gắn với `ExamVersion` để hỗ trợ nhiều cấu hình format trong tương lai.

---

## 14. Nhóm UC-ASMT — Placement và Diagnostic

### UC-ASMT-001 — Start Placement Test

**Actor:** Student / Visitor theo policy.

**Luồng:**
1. Chọn language/exam.
2. Chọn mục tiêu nếu đã biết.
3. Hệ thống chọn assessment version.
4. Tạo attempt.
5. User làm test.
6. Submit.
7. Chấm điểm.
8. Tạo Assessment Result.

### UC-ASMT-002 — Submit Placement Test

### UC-ASMT-003 — Calculate Assessment Result

Kết quả có thể gồm:

```text
Current Level
Skill Estimates
Estimated Overall
Target Level
Gap
```

### UC-ASMT-004 — Xem Assessment Result

### UC-ASMT-005 — Làm Diagnostic Test

### UC-ASMT-006 — Tạo Learning Gap

Hệ thống xác định khoảng cách giữa:

```text
Current Level
      ↓
Target Level
```

theo skill và assessment result.

### UC-ASMT-007 — Retake Assessment

Cho phép retake theo policy.

---

## 15. Nhóm UC-PATH — Learning Goal và Learning Path

### UC-PATH-001 — Tạo Learning Goal

Ví dụ:

```text
English
IELTS
Current: 5.0
Target: 6.5
Target Date: ...
```

### UC-PATH-002 — Cập nhật Learning Goal

### UC-PATH-003 — Xem Learning Goal

### UC-PATH-004 — Tạo Learning Path

```text
Learning Goal
+ Assessment Result
+ Course Catalog
+ Skill Gap
        ↓
Learning Path
```

### UC-PATH-005 — Xem Learning Path

### UC-PATH-006 — Cập nhật Learning Path

### UC-PATH-007 — Tạo Study Plan

### UC-PATH-008 — Xem Daily Study Plan

### UC-PATH-009 — Hoàn thành Study Task

### UC-PATH-010 — Đề xuất Next Learning

Dựa trên:
- Progress.
- Result.
- Weak skill.
- Course completion.
- Learning goal.

---

## 16. Nhóm UC-LEARN — Learning Progress

### UC-LEARN-001 — Ghi nhận Lesson Progress

### UC-LEARN-002 — Ghi nhận Exercise Progress

### UC-LEARN-003 — Ghi nhận Test Progress

### UC-LEARN-004 — Tính Course Progress

### UC-LEARN-005 — Tính Module Progress

### UC-LEARN-006 — Tính Skill Progress

### UC-LEARN-007 — Xem Learning Dashboard

Dashboard có thể hiển thị:

- Current level.
- Target level.
- Overall progress.
- Skill progress.
- Weak skills.
- Today's plan.
- Recent results.
- Recommended next learning.

### UC-LEARN-008 — Xem Progress History

### UC-LEARN-009 — Xem Weak Skills

---

## 17. Nhóm UC-VOC — Vocabulary

### UC-VOC-001 — Xem Vocabulary Library

### UC-VOC-002 — Tìm Vocabulary

### UC-VOC-003 — Thêm vào My Vocabulary

### UC-VOC-004 — Xóa khỏi My Vocabulary

### UC-VOC-005 — Đổi Vocabulary State

Các trạng thái:

```text
NEW
LEARNING
REVIEW
MASTERED
```

### UC-VOC-006 — Flashcard Practice

### UC-VOC-007 — Vocabulary Quiz

### UC-VOC-008 — Listening Vocabulary

### UC-VOC-009 — Matching Vocabulary

### UC-VOC-010 — Xem Vocabulary Progress

Đối với tiếng Trung có thể hiển thị:

```text
Hanzi
Pinyin
Meaning
Audio
Example
```

Student có thể bật/tắt Hanzi/Pinyin/Meaning/Audio.

---

## 18. Nhóm UC-SUB — Writing / Speaking Submission

### UC-SUB-001 — Tạo Writing Submission

### UC-SUB-002 — Sửa Draft Writing

### UC-SUB-003 — Submit Writing

### UC-SUB-004 — Gán Reviewer

**Actor:** Admin / Teacher

### UC-SUB-005 — Review Writing

Reviewer có thể:
- Nhập score.
- Nhập feedback.
- Lưu review.

### UC-SUB-006 — Publish Writing Result

### UC-SUB-007 — Tạo Speaking Submission

### UC-SUB-008 — Review Speaking

### UC-SUB-009 — Publish Speaking Result

### UC-SUB-010 — Xem Submission History

---

## 19. Nhóm UC-REVIEW — Chấm và phản hồi

### UC-REV-001 — Nhận Submission

### UC-REV-002 — Chấm Submission

### UC-REV-003 — Nhập Feedback

### UC-REV-004 — Sửa Review trước khi Publish

### UC-REV-005 — Publish Review

### UC-REV-006 — Xem Review History

Review phải lưu:
- Reviewer.
- Timestamp.
- Score.
- Feedback.
- Status.

---

## 20. Nhóm UC-NOTIF — Notification

### UC-NOTIF-001 — Tạo Notification

Nguồn có thể gồm:
- Course enrollment.
- Test result.
- Writing/Speaking review.
- Learning reminder.
- Order/payment.
- Certificate.
- System announcement.

### UC-NOTIF-002 — Xem Notification

### UC-NOTIF-003 — Mark as Read

### UC-NOTIF-004 — Mark All as Read

### UC-NOTIF-005 — Email Notification

### UC-NOTIF-006 — Notification Preferences

---

## 21. Nhóm UC-COM — Commerce

### UC-COM-001 — Xem Package

### UC-COM-002 — Xem Package Detail

Package có thể gồm:

```text
Course
Skill Package
Band/Level Package
Full Roadmap
```

### UC-COM-003 — Tạo Order

**Actor:** Student

```text
Student
→ Select Course/Package
→ Check Availability
→ Calculate Price
→ Apply Coupon
→ Create Order
→ Payment
```

### UC-COM-004 — Áp dụng Coupon

### UC-COM-005 — Thanh toán

```text
Student
→ Create Payment
→ Payment Provider
→ Payment Result
→ Verify Callback/Webhook
→ Update Payment
→ Update Order
→ Grant Access
```

### UC-COM-006 — Xử lý Payment Webhook

**Actor:** Payment Provider / System Worker

Phải có idempotency để tránh cấp quyền nhiều lần.

### UC-COM-007 — Xem Order History

### UC-COM-008 — Hủy Order

Theo policy.

### UC-COM-009 — Refund

Theo payment/business policy.

### UC-COM-010 — Quản lý Package

**Actor:** Admin

### UC-COM-011 — Quản lý Coupon

**Actor:** Admin

---

## 22. Nhóm UC-CERT — Certificate

### UC-CERT-001 — Tạo Certificate

Có thể dựa trên:
- Course completion.
- Assessment criteria.
- Admin approval.

### UC-CERT-002 — Xem Certificate

### UC-CERT-003 — Download Certificate

### UC-CERT-004 — Verify Certificate

Public verification dựa trên verification code.

### UC-CERT-005 — Revoke Certificate

**Actor:** Admin

---

## 23. Nhóm UC-CMS — Content Management

### UC-CMS-001 — Tạo Article

### UC-CMS-002 — Sửa Article

### UC-CMS-003 — Publish Article

### UC-CMS-004 — Unpublish Article

### UC-CMS-005 — Archive Article

### UC-CMS-006 — Quản lý Category

### UC-CMS-007 — Quản lý Tag

### UC-CMS-008 — Quản lý Resource

### UC-CMS-009 — Quản lý SEO Metadata

Các trường có thể gồm:

```text
SEO Title
SEO Description
Slug
Canonical
Thumbnail
```

---

## 24. Nhóm UC-ADMIN — Quản trị hệ thống

### UC-ADM-001 — Xem Admin Dashboard

Hiển thị:
- Total students.
- Active students.
- Course enrollments.
- Assessment activity.
- Learning activity.
- Orders.
- Revenue.
- Content status.

### UC-ADM-002 — Quản lý Student

- Xem.
- Tìm kiếm.
- Filter.
- Xem learning history.
- Xem enrollment.
- Khóa/mở tài khoản theo policy.

### UC-ADM-003 — Quản lý Admin

### UC-ADM-004 — Quản lý Role

### UC-ADM-005 — Quản lý Course

### UC-ADM-006 — Quản lý Lesson

### UC-ADM-007 — Quản lý Question Bank

### UC-ADM-008 — Quản lý Test

### UC-ADM-009 — Quản lý Vocabulary

### UC-ADM-010 — Quản lý CMS

### UC-ADM-011 — Quản lý Package

### UC-ADM-012 — Quản lý Order

### UC-ADM-013 — Quản lý Coupon

### UC-ADM-014 — Xem Audit Log

---

## 25. Nhóm UC-ANALYTICS — Analytics

### UC-ANA-001 — Xem Student Analytics

Các chỉ số có thể gồm:
- Active learners.
- Course completion.
- Assessment attempts.
- Average progress.
- Retention.

### UC-ANA-002 — Xem Course Analytics

### UC-ANA-003 — Xem Lesson Analytics

### UC-ANA-004 — Xem Assessment Analytics

### UC-ANA-005 — Xem Skill Analytics

### UC-ANA-006 — Xem Commerce Analytics

### UC-ANA-007 — Export Analytics

---

## 26. Nhóm UC-AI — AI Learning

### UC-AI-001 — AI giải thích câu hỏi

```text
Student
→ Request Explanation
→ Authenticate
→ Authorize Question/Content
→ Build Context
→ Call LLM
→ Validate Response
→ Return Explanation
```

### UC-AI-002 — AI tạo bài luyện tập

### UC-AI-003 — AI tạo Vocabulary Practice

### UC-AI-004 — AI phân tích Writing

### UC-AI-005 — AI hỗ trợ Speaking Feedback

### UC-AI-006 — AI tạo Study Plan

### UC-AI-007 — AI đề xuất Next Learning

### UC-AI-008 — AI Tutor

### UC-AI-009 — Natural Language Learning Command

### UC-AI-010 — Xác nhận AI Action

AI action có ảnh hưởng tới dữ liệu hoặc learning plan phải được xác nhận nếu policy chưa cho phép tự động.

---

## 27. Nhóm UC-REALTIME — Realtime

### UC-RT-001 — Kết nối Realtime

### UC-RT-002 — Nhận Notification Event

### UC-RT-003 — Nhận Learning Event

### UC-RT-004 — Nhận Assessment Processing Event

### UC-RT-005 — Reconnect

Khi reconnect:

1. Client xác định trạng thái hiện tại.
2. Kiểm tra event/version nếu hệ thống hỗ trợ.
3. Nếu không thể reconcile → refetch resource.
4. Áp dụng dữ liệu canonical từ server.

---

## 28. Nhóm UC-FILE — Media và File

### UC-FILE-001 — Upload Media

```text
Request Upload
→ Authorization
→ Validate Size/Type
→ Upload Storage
→ Save Metadata
→ Optional Scan/Processing
→ Available
```

### UC-FILE-002 — Preview Media

### UC-FILE-003 — Download File

Phải kiểm tra authorization.

### UC-FILE-004 — Delete File

Metadata có thể soft-delete; physical deletion có thể chạy nền.

### UC-FILE-005 — Upload Speaking Recording

### UC-FILE-006 — Upload Course Audio/Video

---

## 29. Nhóm UC-SEARCH — Search

### UC-SRCH-001 — Global Search

Tìm:
- Course.
- Lesson.
- Article.
- Vocabulary.
- Question.
- Resource.

### UC-SRCH-002 — Course Search

### UC-SRCH-003 — Question Bank Search

### UC-SRCH-004 — Filter

Điều kiện:
- Language.
- Exam.
- Level.
- Skill.
- Difficulty.
- Content type.

### UC-SRCH-005 — Sort

---

## 30. Nhóm UC-AUD — Audit

### UC-AUD-001 — Ghi Activity

### UC-AUD-002 — Xem Learning Activity

### UC-AUD-003 — Xem Admin Audit Log

### UC-AUD-004 — Filter Audit Log

Các trường tối thiểu:

```text
Actor
Action
Target
Timestamp
Before
After
Request ID
```

Các operation quan trọng:
- Publish content.
- Change score.
- Grant course access.
- Payment adjustment.
- Refund.
- Certificate issue/revoke.
- Permission change.

---

## 31. Nhóm UC-SYS — System Worker

### UC-SYS-001 — Process Notification Queue

### UC-SYS-002 — Process Payment Event

### UC-SYS-003 — Process Media Job

### UC-SYS-004 — Process Assessment Job

### UC-SYS-005 — Process Analytics Aggregation

### UC-SYS-006 — Process AI Job

### UC-SYS-007 — Cleanup Temporary Data

### UC-SYS-008 — Backup Database

### UC-SYS-009 — Cleanup Expired Tokens

---

## 32. Quy tắc dùng chung

Mọi protected use case:

```text
Authenticate
  ↓
Authorize
  ↓
Validate
  ↓
Execute
  ↓
Persist
  ↓
Activity / Event
  ↓
Async Side Effects
```

Mọi mutation có khả năng retry:

- Phải idempotent khi phù hợp.
- Không tạo duplicate result.
- Không tạo duplicate payment access.
- Không tạo duplicate notification.
- Không tạo duplicate certificate.

Mọi resource con phải kiểm tra quyền theo resource scope.

Ví dụ:

```text
Student
  ↓
Lesson
  ↓
Course
  ↓
Enrollment / Package Access
```

Không được giả định rằng biết `lesson_id` là đủ quyền truy cập lesson.

---

## 33. Core Learning Loop

Use Case chính của sản phẩm được kết nối thành:

```text
Visitor
  ↓
Register / Login
  ↓
Learning Goal
  ↓
Placement / Diagnostic
  ↓
Assessment Result
  ↓
Learning Gap
  ↓
Learning Path
  ↓
Course Enrollment
  ↓
Lesson
  ↓
Exercise / Practice
  ↓
Quiz / Mock Test
  ↓
Result
  ↓
Progress
  ↓
Weak Skill Analysis
  ↓
Next Learning Recommendation
  ↓
Continue Learning
```

Đây là workflow trung tâm liên kết các domain Learning, Assessment, Progress và Recommendation.

---

## 34. Use Case ID → Module

| Use Case | Module |
|---|---|
| UC-AUTH-* | Auth |
| UC-USER-* | Users |
| UC-PUB-* | Public |
| UC-COURSE-* | Courses |
| UC-MOD-* | Modules |
| UC-LES-* | Lessons |
| UC-MAT-* | Learning Materials |
| UC-PRAC-* | Practice |
| UC-QB-* | Question Bank |
| UC-TEST-* | Tests / Assessments |
| UC-IELTS-* | IELTS |
| UC-HSK-* | HSK |
| UC-ASMT-* | Assessment |
| UC-PATH-* | Learning Path |
| UC-LEARN-* | Learning / Progress |
| UC-VOC-* | Vocabulary |
| UC-SUB-* | Submissions |
| UC-REV-* | Review |
| UC-NOTIF-* | Notification |
| UC-COM-* | Commerce |
| UC-CERT-* | Certificates |
| UC-CMS-* | CMS |
| UC-ADM-* | Administration |
| UC-ANA-* | Analytics |
| UC-AI-* | AI |
| UC-RT-* | Realtime |
| UC-FILE-* | Media / File |
| UC-SRCH-* | Search |
| UC-AUD-* | Audit |
| UC-SYS-* | System Worker |

---

## 35. Quy ước đặc tả Use Case

Các Use Case chi tiết phải sử dụng cấu trúc thống nhất:

```text
Use Case ID
Name
Actor
Goal
Preconditions
Trigger
Main Flow
Alternative Flow
Exception Flow
Postconditions
Business Rules
Permissions
Related Entities
Related APIs
```

Đối với Use Case có ảnh hưởng tới dữ liệu quan trọng, cần mô tả thêm:

```text
Transaction Boundary
Idempotency
Audit Requirement
Realtime Event
Async Side Effects
```

Đối với Assessment/Test:

```text
Exam
ExamVersion
Level
Skill
Question Set
Scoring Rule
Attempt Policy
Result Policy
```

Đối với Commerce:

```text
Order
Payment
Payment Provider
Webhook
Idempotency
Access Grant
Refund Policy
```

Đối với AI:

```text
AI Context
Authorization Scope
Prompt/Input
Output Validation
User Confirmation
Audit
Fallback
```
