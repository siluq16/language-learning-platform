# Web Học Ngoại Ngữ — Functional, Non-Functional & Business Requirements

## 1. Phạm vi

Tài liệu này là baseline để Product, Design, Dev và QA thống nhất behavior của hệ thống **Web Học Ngoại Ngữ**, tập trung vào hai định hướng học chính:

- **Tiếng Anh theo IELTS**.
- **Tiếng Trung theo HSK**.

Hệ thống phục vụ toàn bộ vòng đời học tập:

```text
Visitor
→ Register / Login
→ Learning Goal
→ Placement / Diagnostic
→ Learning Gap
→ Learning Path
→ Course / Lesson
→ Practice / Test
→ Result / Feedback
→ Progress
→ Recommendation
→ Continue Learning
```

Phạm vi bao gồm:

- Website Public / Guest.
- Student Learning Area.
- Admin / Content / Reviewer Area.
- Course, Module, Lesson và Learning Material.
- Exercise, Quiz, Question Bank và Test Builder.
- IELTS Learning & Assessment.
- HSK Learning & Assessment.
- Placement Test / Diagnostic Test.
- Learning Goal / Learning Path / Study Plan.
- Vocabulary Learning.
- Writing / Speaking Submission và Review.
- Progress / Analytics.
- Commerce: Package, Order, Payment, Coupon.
- CMS / Articles / Resources.
- Notification, Media, Search, Audit.
- AI-assisted learning ở mức mở rộng.

> Các cấu trúc kỳ thi, thang điểm, level và quy tắc scoring phải được cấu hình qua `Exam`, `ExamVersion`, `Level`, `Skill` và metadata thay vì hard-code trực tiếp vào business logic.

---

# 2. Yêu cầu chức năng

## FR01 — Quản lý tài khoản

### Mục tiêu

Cho phép người dùng tạo và quản lý tài khoản an toàn.

### Chức năng

- Đăng ký.
- Xác minh email.
- Đăng nhập.
- Đăng xuất.
- Quên mật khẩu.
- Đặt lại mật khẩu.
- Quản lý session.
- Thu hồi session khi cần.

### Logic

```text
Register
→ Validate
→ Normalize Email
→ Check Duplicate
→ Hash Password
→ Create User
→ Create Verification Token
→ Send Verification
```

### Quy tắc

- Email là duy nhất trong phạm vi identity.
- Email được normalize trước khi so sánh.
- Password không được lưu plaintext.
- Verification / reset token phải có thời hạn.
- Reset token chỉ được dùng một lần.
- Backend phải kiểm tra trạng thái tài khoản trước khi cấp quyền truy cập.

### Requirement IDs

- `FR-AUTH-001` Register.
- `FR-AUTH-002` Verify Email.
- `FR-AUTH-003` Login.
- `FR-AUTH-004` Logout.
- `FR-AUTH-005` Forgot Password.
- `FR-AUTH-006` Reset Password.
- `FR-AUTH-007` Session Management.

---

## FR02 — Quản lý hồ sơ và tùy chọn học tập

Cho phép Student:

- Xem hồ sơ.
- Cập nhật tên hiển thị.
- Avatar.
- Bio.
- Timezone.
- UI language / locale.
- Notification preferences.
- Learning preferences.
- Privacy settings.
- Mục tiêu học hiện tại.

### Learning Preferences

Có thể bao gồm:

```text
preferred_language
target_exam
target_level
daily_study_minutes
preferred_study_time
preferred_skill_focus
audio_autoplay
show_pinyin
show_translation
```

### Quy tắc

- Preference chỉ ảnh hưởng trải nghiệm cá nhân, không làm thay đổi dữ liệu chuẩn của khóa học.
- Timezone được dùng khi hiển thị lịch học, deadline và notification.

---

## FR03 — Website Public

### Mục tiêu

Cho phép Visitor khám phá sản phẩm trước khi đăng ký hoặc mua khóa học.

### Chức năng

- Homepage.
- Course Catalog.
- Course Detail.
- Package Detail.
- Trial Content.
- Placement Test entry.
- Articles.
- Resources.
- About.
- Contact.
- Public Search.
- Register / Login CTA.

### Public Course Detail

Tối thiểu hiển thị:

- Tên khóa học.
- Ngôn ngữ.
- Exam / Level.
- Skill.
- Mục tiêu học.
- Nội dung chính.
- Số Module / Lesson.
- Instructor / Reviewer nếu có.
- Giá.
- Package liên quan.
- Trial lesson nếu được cấu hình.
- Trạng thái publish.

### Quy tắc

- Visitor chỉ thấy nội dung đã publish.
- Premium content không được lộ payload đầy đủ qua API public.
- Public page phải hỗ trợ SEO metadata.

---

## FR04 — Course Catalog và Course Access

### Chức năng

Student có thể:

- Duyệt Course Catalog.
- Filter theo Language.
- Filter theo Exam.
- Filter theo Level.
- Filter theo Skill.
- Tìm kiếm Course.
- Xem Course Detail.
- Xem trạng thái quyền truy cập.
- Bắt đầu hoặc tiếp tục học Course đã có quyền.

### Course Access có thể đến từ

```text
Direct Course Purchase
OR Package Purchase
OR Admin Grant
OR Trial Access
OR Promotional Access
```

### Quy tắc

- Backend là nguồn quyết định quyền truy cập.
- Frontend không được dùng trạng thái UI để thay cho authorization.
- Hết quyền truy cập phải chặn premium lesson ở API.

---

## FR05 — Quản lý Course

### Actor

- Admin.
- Content Manager.

### Chức năng

- Create.
- View.
- Update.
- Publish.
- Unpublish.
- Archive.
- Restore.
- Delete theo policy.
- Clone / duplicate nếu triển khai.
- Cấu hình thumbnail / cover.
- Cấu hình price.
- Cấu hình trial.
- Cấu hình prerequisites.
- Cấu hình Language / Exam / ExamVersion / Level / Skill.

### Course fields tối thiểu

```text
title
slug
short_description
description
language_id
exam_id
exam_version_id
level_id
skill_id
thumbnail
price
status
is_trial_enabled
published_at
```

### Quy tắc

- Course chưa publish không xuất hiện trong catalog public.
- Course đã có Enrollment / Order không được hard-delete tùy tiện.
- Thứ tự Module là canonical ở server.

---

## FR06 — Module, Lesson và Learning Material

### Module

Cho phép:

- Create.
- Edit.
- Reorder.
- Archive.
- Restore.
- Delete theo policy.

### Lesson

Cho phép:

- Create.
- Edit.
- Publish.
- Unpublish.
- Archive.
- Restore.
- Reorder.
- Preview.

### Lesson có thể chứa nhiều loại material

```text
VIDEO
AUDIO
RICH_TEXT
VOCABULARY
GRAMMAR
LISTENING
READING
WRITING
SPEAKING
PRACTICE
QUIZ
SUMMARY
DOWNLOADABLE_RESOURCE
```

### Quy tắc

- Lesson chỉ hoàn thành khi đáp ứng completion policy.
- Completion policy có thể dựa trên:
  - mở lesson,
  - xem đủ nội dung,
  - hoàn thành material bắt buộc,
  - đạt quiz tối thiểu.
- Material private phải kiểm tra Course Access.

---

## FR07 — Exercise và Quiz

### Chức năng Student

- Mở Exercise.
- Trả lời câu hỏi.
- Submit.
- Xem kết quả.
- Xem explanation nếu policy cho phép.
- Retry nếu policy cho phép.
- Xem lịch sử làm bài.

### Chức năng Admin / Content Manager

- Create Exercise.
- Edit Exercise.
- Gắn Question.
- Cấu hình pass score.
- Cấu hình attempts.
- Publish / unpublish.

### Logic

```text
Start Exercise
→ Create Attempt
→ Load Questions
→ Save Answers
→ Submit
→ Score Auto-gradable Questions
→ Persist Result
→ Update Progress
→ Emit Learning Event
```

### Quy tắc

- Một lần submit phải idempotent.
- Result đã finalize không được thay đổi tùy tiện.
- Explanation có thể bị ẩn cho tới khi submit.

---

## FR08 — Question Bank

### Mục tiêu

Tạo kho câu hỏi tái sử dụng cho Lesson, Exercise, Quiz, Placement Test, Diagnostic Test và Mock Test.

### Chức năng

- Create Question.
- Edit Question.
- Archive.
- Restore.
- Search.
- Filter.
- Preview.
- Import.
- Export.
- Reuse.
- Version metadata khi cần.

### Question types baseline

- Multiple Choice.
- Multiple Select.
- True / False / Not Given.
- Matching Headings.
- Matching Information.
- Matching.
- Form Completion.
- Note Completion.
- Sentence Completion.
- Summary Completion.
- Fill in the Blank.
- Short Answer.
- Ordering.
- Listening-based Question.

### Metadata

```text
question_type
language
exam
exam_version
level
skill
difficulty
target_score_band
content
audio_url
image_url
explanation
answer_key
status
```

### Quy tắc

- Câu hỏi đã được dùng trong finalized result không nên sửa theo cách làm thay đổi lịch sử.
- Nếu nội dung scoring thay đổi đáng kể, tạo version mới hoặc snapshot vào TestVersion.
- Không đưa đáp án đúng vào payload trước khi policy cho phép.

---

## FR09 — Test Builder và Exam Engine

### Chức năng Admin

- Create Test.
- Edit Test.
- Create Section.
- Add / remove Question.
- Reorder Question.
- Cấu hình duration.
- Cấu hình scoring.
- Cấu hình attempt limit.
- Preview.
- Publish.
- Version.
- Archive.

### Chức năng Student

- Start Test.
- Resume Test nếu được phép.
- Save Answer.
- Submit Test.
- Auto-submit khi hết giờ nếu policy bật.
- View Result.
- View History.

### Test types

```text
PLACEMENT
DIAGNOSTIC
PRACTICE
QUIZ
MOCK_TEST
IELTS_LISTENING
IELTS_READING
IELTS_WRITING
IELTS_SPEAKING
HSK_PRACTICE
HSK_MOCK_TEST
```

### Quy tắc

- Test đã publish phải có version.
- Attempt lưu tham chiếu tới version cụ thể.
- Timer phải dùng thời gian server làm nguồn chuẩn.
- Submit phải transaction-safe.
- Auto-graded và manually-reviewed result phải phân biệt rõ trạng thái.

---

## FR10 — IELTS Learning

### Phạm vi

Hỗ trợ học theo bốn skill:

- Listening.
- Reading.
- Writing.
- Speaking.

### Course taxonomy

- IELTS Foundation.
- IELTS Overall Progression.
- IELTS Listening.
- IELTS Reading.
- IELTS Writing.
- IELTS Speaking.
- IELTS Mock Tests.

### Listening / Reading

Student có thể:

- Làm bài theo section.
- Nghe audio đối với Listening.
- Trả lời các question type phù hợp.
- Xem raw result.
- Xem estimated skill result nếu có scoring config.
- Xem explanation khi policy cho phép.

### Writing

Hỗ trợ:

- Task 1.
- Task 2.
- Draft.
- Submit.
- Human Review.
- Feedback.
- Score / criteria breakdown theo cấu hình.

### Speaking

Hỗ trợ:

- Part 1.
- Part 2.
- Part 3.
- Cue card.
- Audio recording.
- Submit.
- Human Review.
- Feedback.
- Score / criteria breakdown theo cấu hình.

### Quy tắc

- `exam_type` / `test_type` phải hỗ trợ phân biệt biến thể khi cần.
- Scoring conversion không hard-code trong UI.
- AI feedback là bổ sung, không tự động thay thế human review ở MVP.

---

## FR11 — HSK Learning

### Phạm vi

Hỗ trợ học HSK theo Level và ExamVersion cấu hình trong hệ thống.

### Chức năng

- Chọn HSK Level.
- Học Vocabulary.
- Listening Practice.
- Reading Practice.
- Writing Practice.
- Speaking Practice nếu roadmap / exam configuration yêu cầu.
- Practice Test.
- Mock Test.
- Xem Result.
- Xem Progress.

### Vocabulary tiếng Trung

Mỗi từ có thể chứa:

```text
hanzi
pinyin
meaning
audio
example
example_pinyin
example_meaning
level
tags
```

### Hiển thị

Student có thể bật / tắt:

- Hanzi.
- Pinyin.
- Meaning.
- Audio.
- Example translation.

### Quy tắc

- Không hard-code một format HSK duy nhất.
- Nội dung và scoring phải tham chiếu `ExamVersion`.
- Pinyin / Meaning visibility là preference của user, không sửa nội dung gốc.

---

## FR12 — Placement Test và Diagnostic Assessment

### Mục tiêu

Xác định điểm xuất phát, learning gap và đề xuất lộ trình học phù hợp.

### Chức năng

- Start Placement Test.
- Save answers.
- Submit.
- Calculate Result.
- View Result.
- Create Learning Gap.
- Retake theo policy.
- Diagnostic theo skill.
- Lưu assessment history.

### Assessment Result có thể gồm

```text
estimated_level
skill_scores
estimated_overall
strengths
weak_skills
learning_gaps
recommended_course_ids
recommended_path
```

### Quy tắc

- Estimated result phải được gắn nhãn là ước lượng nếu không phải kết quả kỳ thi chính thức.
- Conversion logic phải được version hóa / cấu hình.
- Retake policy có thể giới hạn theo thời gian hoặc số lần.

---

## FR13 — Learning Goal, Learning Path và Study Plan

### Learning Goal

Student có thể cấu hình:

- Ngôn ngữ.
- Exam.
- Target Level / Target Score.
- Target Date.
- Skill focus.
- Daily study minutes.

### Learning Path

Hệ thống có thể tạo path dựa trên:

```text
Current Assessment
+
Target Goal
+
Course Prerequisites
+
Learning Gap
+
Available Courses
```

### Study Plan

- Weekly plan.
- Daily tasks.
- Suggested lesson.
- Suggested practice.
- Suggested vocabulary.
- Suggested mock test.
- Completion state.

### Quy tắc

- Student có thể xem và điều chỉnh mục tiêu.
- Path có thể được regenerate nhưng phải bảo toàn history cần thiết.
- Recommendation không được làm mất quyền tự chọn khóa học của Student.

---

## FR14 — Learning Progress và Dashboard

### Dashboard Student

Tối thiểu hiển thị:

- Learning Goal.
- Current Level / Estimated Score.
- Target Level / Target Score.
- Course Progress.
- Skill Progress.
- Weak Skills.
- Today’s Plan.
- Recent Activity.
- Next Learning.
- Vocabulary Progress.
- Test / Assessment Summary.

### Progress tracking

Ghi nhận:

- Lesson Progress.
- Material Progress.
- Exercise Progress.
- Quiz Progress.
- Test Progress.
- Course Progress.
- Module Progress.
- Skill Progress.

### Quy tắc

- Progress update phải idempotent.
- Course Progress phải được tính từ nguồn dữ liệu chuẩn.
- Không tăng progress do retry event.
- Completed state phải có timestamp.

---

## FR15 — Vocabulary Learning

### Global Vocabulary Library

Cho phép:

- Search.
- Filter theo Language.
- Filter theo Level.
- Filter theo Topic.
- Filter theo Course.
- Xem chi tiết từ.

### My Vocabulary

Student có thể:

- Add.
- Remove.
- Đổi state.
- Practice.
- Xem progress.

### Vocabulary states

```text
NEW
LEARNING
REVIEW
MASTERED
```

### Practice modes

- Flashcard.
- Quiz.
- Listening.
- Matching.
- Fill in the Blank.

### Quy tắc

- Một vocabulary item có thể dùng ở nhiều Course.
- User state được lưu riêng với vocabulary master data.
- Spaced repetition là extension, không bắt buộc cho MVP.

---

## FR16 — Writing / Speaking Submission

### Writing Submission

Flow:

```text
Create Draft
→ Edit
→ Submit
→ Queue for Review
→ Reviewer Assigned
→ Review
→ Publish Feedback
→ Student Views Result
```

### Speaking Submission

Flow:

```text
Record Audio
→ Validate Media
→ Upload
→ Create Submission
→ Submit
→ Reviewer Assigned
→ Review
→ Publish Feedback
```

### Trạng thái

```text
DRAFT
SUBMITTED
UNDER_REVIEW
REVIEWED
PUBLISHED
RETURNED
```

### Quy tắc

- Student không sửa nội dung đã submit trừ khi reviewer trả lại.
- File audio phải có ownership / access control.
- Review history phải truy vết được.

---

## FR17 — Review và Feedback

### Actor

- Teacher / Reviewer.
- Admin nếu được cấp quyền.

### Chức năng

- Xem review queue.
- Claim / assign Submission.
- Xem Submission.
- Nhập score.
- Nhập feedback.
- Nhập criteria breakdown.
- Save draft review.
- Publish review.
- Xem review history.

### Quy tắc

- Reviewer chỉ truy cập submission trong scope được cấp.
- Published review không được silently overwrite.
- Sửa review sau publish phải có audit trail.
- Student chỉ thấy feedback khi trạng thái cho phép.

---

## FR18 — Notification

### Notification triggers

- Email verification.
- Password reset.
- Course enrollment.
- Payment success / failure.
- Assessment result ready.
- Review published.
- Study reminder.
- Due study task.
- Certificate issued.
- Admin announcement.

### Channels

- In-app.
- Email.
- Push-ready architecture.

### Chức năng

- View notifications.
- Mark as read.
- Mark all as read.
- Notification preferences.

### Quy tắc

- Retry không được tạo duplicate notification.
- Notification quan trọng phải tham chiếu entity nguồn nếu có.
- Không gửi nội dung nhạy cảm qua channel không phù hợp.

---

## FR19 — Package và Order

### Package

Package có thể chứa nhiều Course.

Các dạng gợi ý:

- Individual Course.
- Skill Package.
- Band / Level Package.
- Full Roadmap.

### Chức năng

- Xem Package.
- Xem Package Detail.
- Create Package.
- Edit Package.
- Publish / unpublish.
- Add / remove Course.
- Cấu hình giá.
- Cấu hình thời hạn access nếu có.

### Order

- Create Order.
- Apply Coupon.
- Calculate Total.
- Select Payment Method.
- Create Payment.
- View Order History.

### Quy tắc

- Giá tại thời điểm Order phải được snapshot.
- Thay đổi giá Package sau này không sửa lịch sử Order.

---

## FR20 — Payment và Coupon

### Payment

Hỗ trợ kiến trúc tích hợp payment provider bên ngoài.

Flow:

```text
Create Order
→ Create Payment Intent / Transaction
→ Redirect or Collect Payment
→ Provider Callback / Webhook
→ Verify
→ Update Payment
→ Update Order
→ Grant Access
→ Notify User
```

### Coupon

- Code.
- Discount type.
- Discount value.
- Start / end time.
- Usage limit.
- Per-user limit.
- Eligible Product / Package.
- Active state.

### Quy tắc

- Webhook phải verify authenticity theo provider.
- Payment callback phải idempotent.
- Không grant access chỉ dựa trên redirect từ client.
- Coupon phải được validate lại ở server khi checkout.

---

## FR21 — Certificate

### Chức năng

- Issue Certificate.
- View Certificate.
- Download / share certificate nếu triển khai.
- Public verification code / URL nếu được cấu hình.
- Revoke Certificate khi cần.

### Quy tắc

- Chỉ issue khi đạt completion criteria.
- Certificate ID / verification code phải duy nhất.
- Certificate đã revoke phải thể hiện trạng thái rõ ràng.

---

## FR22 — CMS: Article và Resource

### Article

- Create.
- Edit.
- Draft.
- Preview.
- Publish.
- Unpublish.
- Archive.
- Category.
- Tags.
- Thumbnail.
- SEO title.
- SEO description.
- Slug.

### Content Hub gợi ý

English:

- Vocabulary.
- Grammar.
- Communication.
- IELTS Tips.
- Exam Preparation.

Chinese:

- HSK.
- Vocabulary.
- Grammar.
- Culture.
- Learning Tips.

### Quy tắc

- Draft không xuất hiện public.
- Slug phải duy nhất trong namespace tương ứng.
- Nội dung public phải có metadata SEO tối thiểu.

---

## FR23 — Search và Filter

### Public Search

Search:

- Courses.
- Packages.
- Articles.
- Resources.

### Student Search

Search:

- My Courses.
- Lessons.
- Vocabulary.
- Practice.
- Tests.

### Admin Search

Search:

- Users.
- Courses.
- Lessons.
- Questions.
- Tests.
- Orders.
- Articles.

### Quy tắc

- Search không được trả resource ngoài permission scope.
- Có thể kết hợp nhiều filter.
- Search index nếu có chỉ là read model; database / service permission vẫn là nguồn xác thực access.

---

## FR24 — Admin Dashboard và Analytics

### Admin Dashboard

Tối thiểu:

- Student count.
- Active learners.
- Course enrollment.
- Course completion.
- Assessment activity.
- Test attempts.
- Revenue summary.
- Recent orders.
- Review queue.
- Content status.

### Learning Analytics

- Course progress distribution.
- Completion rate.
- Weak skill distribution.
- Exercise accuracy.
- Question performance.
- Test performance.
- Vocabulary engagement.
- Assessment → Enrollment conversion.
- Learning streak / retention nếu triển khai.

### Quy tắc

- Analytics không được làm lộ dữ liệu ngoài role scope.
- Metric definition phải thống nhất và có nguồn tính rõ ràng.
- Dashboard không được dùng dữ liệu ước lượng mà không gắn nhãn.

---

## FR25 — Admin User Management

### Chức năng

- Xem danh sách user.
- Search / filter.
- Xem profile quản trị.
- Xem Enrollment.
- Xem Order.
- Grant / revoke Course Access theo quyền.
- Khóa / mở khóa tài khoản theo policy.
- Gán role.
- Xem Activity / Audit liên quan.

### Quy tắc

- Role change là thao tác nhạy cảm.
- Không cho user tự nâng quyền.
- Tất cả thay đổi role / access quan trọng phải audit.

---

## FR26 — Media / File

### Loại file

- Course thumbnail.
- Article thumbnail.
- Video.
- Audio.
- Speaking recording.
- Image.
- PDF / downloadable resources.

### Upload behavior

```text
Validate
→ Authorize
→ Upload Storage
→ Save Metadata
→ Attach to Entity
→ Return Safe URL / Access Token
```

### Validation

- Size.
- MIME type.
- Extension / content consistency.
- Ownership.
- Storage result.

### Quy tắc

- Private media không được public URL vĩnh viễn nếu policy yêu cầu bảo vệ.
- Delete metadata và object storage phải có recovery / reconciliation strategy.
- Download / stream phải kiểm tra access khi resource private.

---

## FR27 — Realtime

### Phạm vi

Realtime không bắt buộc cho mọi màn hình.

Có thể dùng cho:

- Notification.
- Review status.
- Payment status.
- Long-running processing status.
- Admin monitoring.
- Live test state nếu cần.

### Nguyên tắc

```text
DB Commit
→ Domain Event
→ Realtime Event
```

Không broadcast trạng thái mutation chưa commit.

---

## FR28 — Activity và Audit Log

### Activity

Ghi các hành động có giá trị cho trải nghiệm:

- Started Course.
- Completed Lesson.
- Submitted Test.
- Added Vocabulary.
- Received Feedback.
- Earned Certificate.

### Audit

Dành cho thao tác nhạy cảm:

- Role changes.
- Access grants / revokes.
- Course publish / archive.
- Test publish / version.
- Payment override.
- Review edit after publish.
- Certificate revoke.
- Security actions.

### Dữ liệu tối thiểu

```text
actor_id
action
entity_type
entity_id
timestamp
request_id
metadata
```

### Quy tắc

- Audit log không được sửa/xóa bởi normal application flow.
- Metadata không lưu secret / password / token.

---

## FR29 — AI-assisted Learning

### Vai trò

AI là lớp hỗ trợ, không phải dependency bắt buộc của core learning flow.

### Chức năng mở rộng

- Giải thích đáp án.
- Gợi ý bài luyện.
- Tạo practice từ vocabulary đã học.
- Phân tích Writing.
- Phản hồi Speaking.
- Gợi ý Study Plan.
- Next Learning recommendation.
- AI Tutor.
- Natural Language Command cho một số tác vụ.

### Quy tắc

- AI output phải được gắn nhãn phù hợp.
- AI không tự động sửa finalized score chính thức nếu không có workflow được duyệt.
- Action ảnh hưởng lớn đến dữ liệu / quyền / thanh toán phải có confirmation.
- Prompt / response không được chứa secret không cần thiết.
- Hệ thống phải hoạt động được khi AI service unavailable.

---

# 3. Yêu cầu phi chức năng

## NFR01 — Hiệu năng

Mục tiêu baseline production:

- Read API p95 ≤ 300–500ms cho endpoint thông thường ở tải bình thường.
- Mutation API p95 ≤ 500ms, không tính async side effects.
- Trang public quan trọng phải tối ưu tải ban đầu.
- Media lớn được phục vụ qua object storage / CDN.

Các endpoint analytics, export hoặc AI có thể có SLA riêng.

---

## NFR02 — Khả năng chịu tải

Hệ thống phải hỗ trợ nhiều user cùng:

- Học lesson.
- Làm exercise.
- Submit test.
- Xem media.
- Thanh toán.
- Nhận notification.

Phải đảm bảo:

- Không mất answer.
- Không duplicate attempt.
- Không double grant access.
- Không double charge do retry.
- Không overwrite result finalized ngoài ý muốn.

---

## NFR03 — Tính sẵn sàng và phục hồi

Hệ thống phải:

- Phục hồi sau lỗi tạm thời.
- Có retry cho async job phù hợp.
- Có health check.
- Có timeout khi gọi external service.
- Có circuit-breaker / fallback ở integration quan trọng nếu cần.
- Không để lỗi AI làm gián đoạn core learning.

---

## NFR04 — Bảo mật xác thực

- Password hash bằng adaptive hashing algorithm.
- Token / session được bảo vệ.
- Reset token có expiry và one-time use.
- Không trả secret, password hash, access token trong API response không cần thiết.
- Rate limit endpoint nhạy cảm.
- Có chống credential stuffing / brute force ở mức phù hợp.

---

## NFR05 — Authorization

- Authorization phải được kiểm tra ở backend.
- Mọi child resource phải xác minh ancestor access khi cần.
- Direct URL không được bypass permission.
- Admin scope và Reviewer scope phải tách rõ.
- Premium media phải gắn với access policy.

---

## NFR06 — Data Integrity

Các operation quan trọng phải transaction-safe:

- Test submission.
- Payment update.
- Order completion.
- Access grant.
- Review publish.
- Certificate issue.
- Course publish nếu có nhiều child validation.

Dữ liệu finalized cần bất biến hoặc versioned.

---

## NFR07 — Idempotency

Áp dụng tối thiểu cho:

- Payment webhook.
- Order completion.
- Test submission.
- Progress event.
- Notification generation.
- Certificate issue.
- Async callback.

Retry không được tạo duplicate side effect.

---

## NFR08 — Khả năng sử dụng

- Giao diện học phải dễ hiểu với người dùng không chuyên kỹ thuật.
- Luồng “Continue Learning” phải rõ.
- Trạng thái đang học / hoàn thành / khóa / premium phải phân biệt.
- Error message phải có hướng xử lý.
- Test UI phải ưu tiên tập trung và giảm distraction.
- HSK vocabulary phải hỗ trợ Hanzi / Pinyin / Meaning theo preference.

---

## NFR09 — Accessibility

Baseline:

- Keyboard navigation.
- Focus visible.
- Semantic HTML.
- Label cho form control.
- `aria-label` cho icon-only actions.
- Không chỉ dùng màu để biểu diễn trạng thái.
- Contrast đủ đọc.
- Audio control có trạng thái rõ.
- Transcript / caption hỗ trợ khi nội dung có sẵn.

Mục tiêu khuyến nghị: bám các nguyên tắc WCAG 2.1/2.2 AA phù hợp phạm vi dự án.

---

## NFR10 — Browser Compatibility

Baseline:

- Chrome.
- Edge.
- Firefox.
- Safari bản hiện đại.

Không yêu cầu hỗ trợ browser legacy ngoài phạm vi được thống nhất.

---

## NFR11 — Responsive

Hỗ trợ:

- Desktop.
- Tablet.
- Mobile.

Ưu tiên:

- Student learning phải sử dụng tốt trên mobile.
- Admin / Test Builder tối ưu desktop nhưng vẫn responsive.
- Speaking recording phải kiểm tra khả năng microphone trên thiết bị.

---

## NFR12 — Error Handling

API dùng error schema thống nhất.

Ví dụ:

```json
{
  "error": {
    "code": "COURSE_ACCESS_DENIED",
    "message": "You do not have access to this course.",
    "requestId": "req_..."
  }
}
```

Không trả:

- Stack trace.
- SQL.
- Secrets.
- Internal implementation details.
- Answer key trước thời điểm được phép.

---

## NFR13 — Logging và Observability

Các mức:

- INFO.
- WARN.
- ERROR.

Mỗi request nên có:

- Request ID.
- Correlation ID nếu qua nhiều service / job.
- Actor ID khi hợp lệ.
- Route.
- Latency.
- Result status.

Không log:

- Password.
- Reset token.
- Payment secret.
- Full sensitive payload không cần thiết.

---

## NFR14 — Backup / Recovery

- Database backup định kỳ.
- Có restore procedure.
- Backup phải được kiểm tra định kỳ.
- Object storage quan trọng có lifecycle / recovery policy.
- Có RPO / RTO mục tiêu khi triển khai production thực tế.

---

## NFR15 — API Documentation

REST API:

- Base path `/api/v1`.
- OpenAPI / Swagger.
- Validation.
- Pagination.
- Consistent error schema.
- Authorization description.
- Example request / response cho endpoint quan trọng.

---

## NFR16 — Maintainability

- Kiến trúc modular monolith ở baseline.
- Domain module rõ ràng.
- Không hard-code IELTS / HSK logic xuyên nhiều module.
- ExamVersion / scoring config tập trung.
- Shared validation có test.
- Migration có version.
- API backward compatibility được xem xét trước breaking change.

---

## NFR17 — Scalability

Thiết kế cho phép scale:

- API instance.
- Background workers.
- Redis / queue.
- Media CDN.
- Search service.
- Analytics read model.

Không yêu cầu microservices cho MVP.

---

## NFR18 — Auditability

Các thao tác nhạy cảm phải truy vết được:

- Authentication security event.
- Role / permission.
- Publish content.
- Test version.
- Review publish.
- Payment.
- Access control.
- Certificate.
- Admin data changes.

---

## NFR19 — SEO và Public Performance

Áp dụng cho public site:

- Semantic metadata.
- Unique title / description.
- Canonical URL khi cần.
- Sitemap.
- Robots policy.
- Open Graph metadata.
- Tối ưu image.
- Không render nội dung premium nhạy cảm vào HTML public.

---

## NFR20 — Privacy và Data Retention

- Thu thập dữ liệu tối thiểu cần cho chức năng.
- Có policy retention cho audit, submission, media, payment metadata.
- Student có thể xem privacy settings trong phạm vi sản phẩm.
- Xóa tài khoản phải xử lý dữ liệu liên quan theo policy và nghĩa vụ lưu trữ.
- Payment secret / raw card data không được lưu nếu provider không yêu cầu và pháp lý không cho phép.

---

# 4. Quy tắc nghiệp vụ

## BR01 — Unique Email

Email không phân biệt hoa thường sau normalize.

---

## BR02 — Published Content

Visitor / Student chỉ nhìn thấy content public khi:

```text
status = PUBLISHED
AND published_at <= now
```

trừ các trường hợp preview có quyền.

---

## BR03 — Course Access

Student được truy cập premium Course khi có ít nhất một access grant hợp lệ:

```text
Direct Enrollment
OR Package Entitlement
OR Admin Grant
OR Trial Grant
```

và grant chưa hết hạn / chưa revoke.

---

## BR04 — Child Resource Access

Có quyền Lesson / Material phải có Course Access phù hợp:

```text
Material
→ Lesson
→ Module
→ Course
→ Entitlement
```

Direct URL vẫn phải kiểm tra permission.

---

## BR05 — Package Access

Mua Package thành công tạo entitlement cho các Course thuộc snapshot / policy của Package.

Thay đổi Package về sau không được âm thầm thu hồi quyền đã cấp trừ khi business policy quy định rõ.

---

## BR06 — Result Immutability

Test Result đã finalized:

- Không được update tùy ý.
- Nếu cần correction phải có workflow riêng.
- Correction phải audit.
- Attempt phải giữ TestVersion gốc.

---

## BR07 — Test Versioning

Test đã publish và có attempt phải giữ version lịch sử.

Thay đổi:

- Question.
- Order.
- Scoring.
- Duration.
- Section.

có thể yêu cầu TestVersion mới.

---

## BR08 — Question Reuse

Question có thể được dùng ở nhiều Exercise / Test.

Việc archive Question không làm hỏng historical attempt đã có.

---

## BR09 — Progress Idempotency

Cùng logical completion event không được cộng progress nhiều lần do retry.

---

## BR10 — Payment Idempotency

Cùng provider transaction / webhook event không được:

- tạo nhiều Payment,
- complete Order nhiều lần,
- grant access nhiều lần.

---

## BR11 — Review Audit

Review sau khi publish nếu sửa phải ghi:

- người sửa,
- thời gian,
- lý do / metadata,
- giá trị trước / sau nếu policy yêu cầu.

---

## BR12 — Exam Configuration

Exam structure, Level, Skill và scoring conversion phải lấy từ config / data model.

Không hard-code toàn bộ logic vào frontend.

---

## BR13 — Assessment Labeling

Placement / Diagnostic result là đánh giá nội bộ.

Nếu không phải kết quả chính thức, UI phải dùng từ ngữ như:

- Estimated.
- Diagnostic.
- Placement.
- Recommended level.

---

## BR14 — Learning Goal

Một Student có thể có history nhiều Learning Goal, nhưng chỉ một goal chính active cho một context nếu policy quy định.

---

## BR15 — Learning Path

Learning Path phải tham chiếu Goal / Assessment làm nguồn.

Regenerate path không được xóa lịch sử completion đã đạt.

---

## BR16 — Vocabulary State

State thuộc về quan hệ `UserVocabulary`, không phải Vocabulary master.

---

## BR17 — Submission Lock

Submission ở trạng thái `SUBMITTED` hoặc `UNDER_REVIEW` không được Student sửa trực tiếp.

---

## BR18 — Reviewer Scope

Reviewer chỉ được chấm Submission:

- được assign,
- hoặc nằm trong queue / course scope được cấp.

---

## BR19 — Certificate Verification

Certificate public verification chỉ trả dữ liệu tối thiểu cần để xác minh.

Không lộ thông tin cá nhân dư thừa.

---

## BR20 — Soft Delete

Ưu tiên:

```text
ACTIVE
→ ARCHIVED
→ DELETED / PURGED
```

đối với entity có history quan trọng.

---

## BR21 — Timezone

Persist timestamp theo UTC.

Hiển thị cho user theo timezone cấu hình.

Scheduled study reminder dùng timezone của Student.

---

## BR22 — Notification Deduplication

Cùng logical event / user / channel không tạo duplicate do retry.

---

## BR23 — Event After Commit

Chỉ phát event sau khi database mutation commit thành công.

---

## BR24 — File Authorization

Mọi private upload / stream / download phải kiểm tra access hoặc dùng signed URL có thời hạn.

---

## BR25 — Search Security

Search không được trả resource ngoài scope của user.

---

## BR26 — Coupon Validation

Coupon chỉ hợp lệ khi thỏa:

- active,
- thời gian hiệu lực,
- usage limit,
- per-user limit,
- product eligibility,
- minimum order nếu có.

Server là nguồn canonical.

---

## BR27 — Order Price Snapshot

Order item phải lưu giá / discount / total tại thời điểm checkout.

Không tính lại lịch sử order theo giá hiện tại.

---

## BR28 — Payment Access Grant

Chỉ grant access sau payment state đáng tin cậy theo provider integration.

Client redirect không đủ để xác nhận thanh toán.

---

## BR29 — AI Confirmation

AI action có tác động lớn phải có confirmation.

Ví dụ:

- thay đổi Study Plan hàng loạt,
- publish content,
- thay đổi score,
- thao tác commerce,
- thay đổi quyền.

---

## BR30 — AI Optional

Core flows sau phải hoạt động không phụ thuộc AI:

- Register / Login.
- Course Learning.
- Exercise.
- Test.
- Progress.
- Payment.
- Review.
- Certificate.

---

## BR31 — Content Rights

Nội dung IELTS / HSK trong hệ thống phải là:

- tự biên soạn,
- được cấp phép,
- hoặc thuộc nguồn cho phép sử dụng.

Không lưu / phân phối nội dung có bản quyền trái phép.

---

## BR32 — State Transition

Không cho phép chuyển trạng thái tùy ý ngoài state machine đã định nghĩa.

---

# 5. State Rules

## User

```text
PENDING_VERIFICATION
→ ACTIVE
→ SUSPENDED
→ ACTIVE

ACTIVE
→ DEACTIVATED
```

---

## Course / Lesson / Article

```text
DRAFT
→ PUBLISHED
→ UNPUBLISHED

DRAFT / UNPUBLISHED
→ ARCHIVED
→ RESTORED
```

---

## Test

```text
DRAFT
→ PUBLISHED
→ ARCHIVED
```

Khi Test published thay đổi cấu trúc đáng kể:

```text
Version N
→ Create Version N+1
```

---

## Test Attempt

```text
IN_PROGRESS
→ SUBMITTED
→ SCORING
→ FINALIZED
```

Trường hợp hết giờ:

```text
IN_PROGRESS
→ AUTO_SUBMITTED
→ SCORING
→ FINALIZED
```

---

## Assessment

```text
IN_PROGRESS
→ SUBMITTED
→ CALCULATED
→ FINALIZED
```

---

## Writing / Speaking Submission

```text
DRAFT
→ SUBMITTED
→ UNDER_REVIEW
→ REVIEWED
→ PUBLISHED
```

Có thể:

```text
UNDER_REVIEW
→ RETURNED
→ DRAFT
```

---

## Vocabulary Progress

```text
NEW
→ LEARNING
→ REVIEW
→ MASTERED
```

Có thể lùi state nếu learning policy yêu cầu.

---

## Order

```text
PENDING
→ AWAITING_PAYMENT
→ PAID
→ COMPLETED
```

Nhánh khác:

```text
PENDING / AWAITING_PAYMENT
→ CANCELED

PAID / COMPLETED
→ REFUND_PENDING
→ REFUNDED
```

---

## Payment

```text
CREATED
→ PENDING
→ SUCCEEDED
```

hoặc:

```text
PENDING
→ FAILED
```

---

## Certificate

```text
ISSUED
→ REVOKED
```

---

# 6. Permission Matrix

| Action | Visitor | Student | Reviewer | Content Manager | Admin |
|---|---:|---:|---:|---:|---:|
| Xem Public Content | ✓ | ✓ | ✓ | ✓ | ✓ |
| Đăng ký / Login | ✓ | ✓ | ✓ | ✓ | ✓ |
| Học Course có access | ✗ | ✓ | Scope | Scope | ✓ |
| Làm Exercise / Test | ✗/Trial | ✓ | Optional | Preview | ✓ |
| Xem Progress cá nhân | ✗ | ✓ | ✗ | ✗ | Scoped |
| Quản lý My Vocabulary | ✗ | ✓ | ✗ | ✗ | Scoped |
| Submit Writing / Speaking | ✗ | ✓ | ✗ | Preview | ✓ |
| Review Submission | ✗ | ✗ | ✓ | Optional | ✓ |
| Tạo / sửa Course | ✗ | ✗ | ✗ | ✓ | ✓ |
| Publish Course | ✗ | ✗ | ✗ | Policy | ✓ |
| Quản lý Question Bank | ✗ | ✗ | Scoped | ✓ | ✓ |
| Tạo / publish Test | ✗ | ✗ | Optional | Policy | ✓ |
| Quản lý Article / Resource | ✗ | ✗ | ✗ | ✓ | ✓ |
| Xem Order cá nhân | ✗ | ✓ | ✗ | ✗ | Scoped |
| Quản lý Package / Coupon | ✗ | ✗ | ✗ | Policy | ✓ |
| Quản lý Payment | ✗ | ✗ | ✗ | ✗ | ✓ |
| Xem Learning Analytics | ✗ | Personal | Scoped | Content Scope | ✓ |
| Quản lý Role / Access | ✗ | ✗ | ✗ | ✗ | ✓ |
| Xem Audit Log | ✗ | ✗ | ✗ | ✗ | ✓ |

**Lưu ý:** Matrix là policy mặc định. Backend vẫn phải kiểm tra resource scope cụ thể, ownership, entitlement và trạng thái entity.

---

# 7. Dữ liệu chính

```text
User
Role
UserRole
UserPreference

Language
Exam
ExamVersion
Level
Skill

LearningGoal
Assessment
AssessmentAttempt
AssessmentResult
LearningGap

LearningPath
PathItem
StudyPlan
StudyTask

Course
Module
Lesson
LearningMaterial
Enrollment
CourseAccess

Exercise
ExerciseQuestion
Quiz

Question
QuestionOption
QuestionTag

Test
TestVersion
TestSection
TestQuestion
TestAttempt
TestAnswer
TestResult

Vocabulary
VocabularyExample
UserVocabulary
VocabularyPracticeResult

WritingSubmission
SpeakingSubmission
Review
ReviewCriterion

Package
PackageCourse
Order
OrderItem
Payment
Coupon
CouponRedemption

Article
ArticleCategory
Tag
Resource

Notification
Activity
AuditLog

Certificate

MediaFile
FileAttachment
```

---

# 8. API conventions

## Base URL

```http
/api/v1
```

## Request

```http
POST /api/v1/tests/{testId}/attempts
```

## Success Response

```json
{
  "data": {},
  "requestId": "req_..."
}
```

## Error Response

```json
{
  "error": {
    "code": "TEST_NOT_AVAILABLE",
    "message": "This test is not available.",
    "requestId": "req_..."
  }
}
```

## Pagination

Cursor pagination khuyến nghị cho:

- Notifications.
- Activity.
- Audit.
- Test history.
- Submission history.
- Large question collections.

Offset pagination có thể dùng cho admin table nhỏ nếu phù hợp.

## Conflict

Ví dụ optimistic concurrency:

```http
409 Conflict
```

```json
{
  "error": {
    "code": "RESOURCE_VERSION_CONFLICT",
    "message": "The resource was modified by another operation.",
    "details": {
      "expectedVersion": 5,
      "currentVersion": 6
    },
    "requestId": "req_..."
  }
}
```

## Idempotency

Endpoint nhạy cảm có thể nhận:

```http
Idempotency-Key: <client-generated-key>
```

Áp dụng cho payment, submit hoặc create operation theo thiết kế cụ thể.

---

# 9. Acceptance Criteria mức hệ thống

## MVP — Foundation

- Register / Login / Verify Email.
- Profile.
- Public Homepage.
- Course Catalog.
- Course Detail.
- Trial Content.
- Admin authentication.
- Role / permission baseline.

## MVP — Core Learning

- Course / Module / Lesson.
- Video / Audio / Rich Text.
- Exercise.
- Quiz.
- Question Bank.
- Progress.
- Student Dashboard.
- My Courses.

## MVP — IELTS

- IELTS Listening.
- IELTS Reading.
- Writing submission.
- Speaking recording.
- Human review.
- IELTS practice / mock test baseline.
- Skill result.

## MVP — HSK

- HSK Course theo Level / ExamVersion.
- Vocabulary Hanzi / Pinyin / Meaning / Audio.
- Listening.
- Reading.
- Writing practice.
- Practice / Mock Test.
- Result.

## MVP — Assessment

- Placement Test.
- Diagnostic Test.
- Assessment Result.
- Learning Gap.
- Learning Goal.
- Learning Path.
- Today’s Plan / Next Learning baseline.

## MVP — Commerce

- Package.
- Order.
- Coupon.
- Payment integration.
- Payment webhook verification.
- Access grant.
- Order history.

## MVP — Content & Admin

- Course CRUD.
- Module / Lesson CRUD.
- Question Bank.
- Test Builder.
- Vocabulary.
- CMS Article.
- Package / Order admin.
- Analytics baseline.

## MVP — Student Completion

- Progress.
- Results.
- Submission history.
- Review feedback.
- Certificate baseline.

## Collaboration / Experience

- Notification.
- Email notification.
- Realtime status nơi cần thiết.
- Responsive learning UI.
- Search / filter.
- Media management.

## Advanced / V2

- Spaced repetition.
- Streak / XP / Badges.
- Wishlist.
- Reviews.
- AI Writing feedback.
- AI Speaking feedback.
- AI Tutor.
- Personalized recommendation.
- Mobile App.
- Live Class.
- Teacher Management.
- Community.

---

# 10. Traceability

Mỗi requirement quan trọng nên map được tới:

```text
Requirement
→ Use Case
→ API
→ Data Entity
→ UI Screen
→ Test Case
→ Acceptance Criteria
```

Ví dụ:

```text
FR-TEST-012 Submit Test Attempt
→ UC-TEST-012
→ POST /api/v1/test-attempts/{id}/submit
→ TestAttempt + TestAnswer + TestResult
→ Test Taking Screen
→ Integration Test + E2E Test
→ Result finalized exactly once
```

---

# 11. Definition of Done cho Requirement

Một requirement được xem là triển khai hoàn chỉnh khi:

- Business rule đã được xác định.
- Permission đã được kiểm tra ở backend.
- Validation đã có.
- Happy path hoạt động.
- Error / edge case chính đã xử lý.
- Transaction / idempotency được áp dụng nếu cần.
- Audit / activity được ghi nếu cần.
- API documented.
- UI có loading / empty / error / success state.
- Test tự động phù hợp đã có.
- QA có acceptance criteria để kiểm thử.
- Không phá vỡ requirement khác đã finalized.
