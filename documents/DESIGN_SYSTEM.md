# Web Học Ngoại Ngữ — Design System & UI Style Guide

## 1. Design Direction

Web Học Ngoại Ngữ sử dụng phong cách:

> **Glassmorphism — Modern Learning Platform**

Mục tiêu cảm giác thị giác:

- Trong suốt.
- Nhẹ.
- Hiện đại.
- Tập trung.
- Thân thiện với việc học dài phiên.
- Có chiều sâu nhưng không gây rối.
- Có khác biệt rõ giữa Learning, Assessment, Commerce và Admin.

Glassmorphism không được biến toàn bộ giao diện thành các khối blur nặng.

Nguyên tắc:

```text
Learning Clarity
+
Visual Hierarchy
+
Controlled Glass
+
Readable Content
+
Calm Motion
```

Ưu tiên cuối cùng luôn là **khả năng đọc, khả năng học và khả năng làm bài**.

---

# 2. Brand Palette

## Primary — Sky Glass

```text
#A6D1FD
```

Vai trò:

- Primary accent.
- Active state.
- Selected state.
- Link emphasis.
- Learning progress highlight.
- Soft background glow.

---

## Brand Dark — Deep Purple

```text
#2B1572
```

Vai trò:

- Brand anchor.
- Primary text trên nền sáng.
- Sidebar / deep surface.
- Heading.
- Strong contrast.
- Navigation active text.

---

## White

```text
#FFFFFF
```

Vai trò:

- Base foreground.
- Glass surface.
- Border transparency.
- Modal / card content layer.

---

## AI — Magenta

```text
#A000C8
```

Vai trò:

- AI feature.
- Smart suggestion.
- AI Tutor.
- AI-generated practice.
- Experimental / assisted status.

AI color không dùng cho action thông thường để tránh mất ý nghĩa.

---

## Success

```text
#358200
```

Vai trò:

- Correct.
- Completed.
- Passed.
- Payment success.
- Valid.
- Mastered vocabulary.

---

## Error / Critical

```text
#C40000
```

Vai trò:

- Error.
- Incorrect critical feedback.
- Destructive action.
- Payment failure.
- Recording / upload failure.

Không dùng đỏ làm màu trang trí.

---

## Warning

```text
#A35A00
```

Vai trò:

- Warning.
- Time running low.
- Due study task.
- Needs review.
- Partial completion.

---

## Exam Accent — IELTS

```text
#2D6FA8
```

Vai trò:

- IELTS category accent.
- IELTS badge.
- IELTS chart / skill marker.

Không dùng thay cho primary action nếu không cần.

---

## Exam Accent — HSK

```text
#B85C00
```

Vai trò:

- HSK category accent.
- HSK badge.
- Chinese-learning visual marker.

Không dùng HSK accent làm error / warning semantic color.

---

# 3. Extended Color Scale

## Sky / Blue

```text
#EAF5FF
#D9EDFF
#C4E3FF
#A6D1FD
#7CB8EE
#4F91CF
#2D6FA8
```

## Purple

```text
#F1EDFF
#DDD5FF
#C4B8FF
#9D8BE8
#634EB0
#2B1572
#1D0F4E
```

## Green

```text
#F0FAEB
#D8F0CB
#B7DDA4
#83B95D
#358200
#276300
```

## Red

```text
#FFF1F1
#FFDCDC
#FFB5B5
#E87878
#C40000
#970000
```

## Magenta

```text
#FFF0FF
#FBD8FF
#EFB0FA
#D66DE4
#A000C8
#780096
```

## Amber / HSK Accent

```text
#FFF6E8
#FFE8C2
#FFD08A
#EFA34A
#B85C00
#7C3D00
```

---

# 4. Semantic Color Mapping

Không dùng màu chỉ theo “đẹp”; mỗi màu cần vai trò ổn định.

| Semantic | Token | Dùng cho |
|---|---|---|
| Primary | `--color-primary` | CTA, selection, focus |
| Brand | `--color-brand` | Heading, navigation, identity |
| Success | `--color-success` | Correct, completed, passed |
| Warning | `--color-warning` | Cảnh báo, time low, attention |
| Danger | `--color-danger` | Error, destructive |
| AI | `--color-ai` | AI feature |
| IELTS | `--color-ielts` | IELTS category |
| HSK | `--color-hsk` | HSK category |
| Info | `--color-info` | Neutral informational state |

Không chỉ dùng màu để truyền trạng thái; luôn kết hợp:

- Text.
- Icon.
- Badge label.
- Shape / border khi cần.

---

# 5. Glassmorphism Rules

## 5.1 Glass Surface

Dùng cho:

- Dashboard cards.
- Course cards.
- Learning side panels.
- Navigation.
- Summary widgets.

```css
background: rgba(255, 255, 255, 0.55);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.35);
box-shadow: 0 8px 32px rgba(43, 21, 114, 0.10);
```

---

## 5.2 Strong Glass

Dùng cho:

- Modal.
- Command palette.
- Checkout summary.
- Result summary.
- Important dialog.
- Navigation panel.

```css
background: rgba(255, 255, 255, 0.70);
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.44);
```

---

## 5.3 Weak Glass

Dùng cho:

- Secondary panel.
- Decorative layer.
- Course metadata area.
- Filter background.

```css
background: rgba(255, 255, 255, 0.32);
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
border: 1px solid rgba(255, 255, 255, 0.24);
```

---

## 5.4 Dark Glass

Dùng hạn chế cho:

- Sidebar.
- Hero overlays.
- Test mode secondary navigation.

```css
background: rgba(43, 21, 114, 0.48);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.14);
```

Không dùng nhiều dark glass panel cạnh nhau.

---

# 6. Background

Glassmorphism cần background có chiều sâu nhưng phải yên tĩnh.

### App Background

```css
background:
  radial-gradient(
    circle at 15% 15%,
    rgba(166, 209, 253, 0.50),
    transparent 34%
  ),
  radial-gradient(
    circle at 82% 12%,
    rgba(160, 0, 200, 0.14),
    transparent 30%
  ),
  radial-gradient(
    circle at 75% 82%,
    rgba(43, 21, 114, 0.14),
    transparent 35%
  ),
  #F5F9FF;
```

### Learning Screen

Giảm glow so với marketing page:

```css
background:
  radial-gradient(
    circle at 10% 10%,
    rgba(166, 209, 253, 0.24),
    transparent 32%
  ),
  #F7FAFF;
```

### Test Taking Screen

Ưu tiên concentration:

```text
Minimal gradient
+
Low visual noise
+
No decorative floating blobs near question content
```

---

# 7. Transparency Rule

Mức opacity khuyến nghị:

```text
0.25 → 0.72
```

Không dùng background trong suốt nếu làm giảm khả năng đọc.

Các component có thể dùng surface đặc hơn:

- Input.
- Textarea.
- Test question body.
- Writing editor.
- Payment form container.
- Destructive confirmation.
- Long reading passage.

Glass là layer style, không phải bắt buộc cho mọi component.

---

# 8. Typography

## Font

Khuyến nghị:

```text
Inter
```

Fallback:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Đối với Chinese content, fallback phải hỗ trợ CJK tốt:

```css
font-family:
  Inter,
  "Noto Sans SC",
  "Microsoft YaHei",
  "PingFang SC",
  sans-serif;
```

---

## Type Scale

```text
Display       36–44 px
H1            30–36 px
H2            24–28 px
H3            20–22 px
H4            17–18 px
Body Large    17–18 px
Body          14–16 px
Small         12–13 px
Caption       11–12 px
```

## Weight

```text
Regular       400
Medium        500
Semibold      600
Bold          700
```

Không dùng quá nhiều Bold trong lesson content.

---

## Learning Reading Width

Đối với bài đọc dài:

```text
max readable width: 680–760px
line-height: 1.6–1.8
```

Không kéo paragraph dài full width màn hình desktop.

---

# 9. Text Colors

## Primary Text

```text
rgba(43, 21, 114, 0.95)
```

## Secondary Text

```text
rgba(43, 21, 114, 0.68)
```

## Muted Text

```text
rgba(43, 21, 114, 0.48)
```

## Disabled Text

```text
rgba(43, 21, 114, 0.32)
```

## Text on Dark Glass

```text
rgba(255, 255, 255, 0.96)
rgba(255, 255, 255, 0.74)
```

## Long-form Learning Text

Ưu tiên màu gần brand-dark, không dùng pure black nếu không cần:

```text
#241750
```

---

# 10. Border

## Glass Border

```css
border: 1px solid rgba(255, 255, 255, 0.35);
```

## Neutral Border

```css
border: 1px solid rgba(43, 21, 114, 0.10);
```

## Focus Border

```css
border-color: #7CB8EE;
```

## Error Border

```css
border-color: rgba(196, 0, 0, 0.55);
```

Không dùng border đen đặc.

---

# 11. Shadow

Shadow phải mềm.

## Small

```css
box-shadow: 0 4px 16px rgba(43, 21, 114, 0.08);
```

## Medium

```css
box-shadow: 0 8px 32px rgba(43, 21, 114, 0.10);
```

## Floating

```css
box-shadow: 0 18px 50px rgba(43, 21, 114, 0.15);
```

## Focus Glow

```css
box-shadow:
  0 0 0 3px rgba(166, 209, 253, 0.30);
```

Không dùng shadow quá đậm cho Question Card.

---

# 12. Radius

```text
Small control      10px
Input              12px
Button             12px
Card               16px
Learning panel     18px
Dashboard card     20px
Modal              24px
Pill / Badge       999px
```

---

# 13. Spacing

Dùng spacing scale 4px:

```text
4
8
12
16
20
24
32
40
48
64
80
```

Rule:

- Component internal spacing: 8–24px.
- Card padding: 16–24px.
- Major section gap: 32–64px.
- Reading content không nhồi quá nhiều control cạnh paragraph.

---

# 14. Layout Grid

## Desktop

```text
12-column grid
max content width: 1200–1440px
gutter: 24–32px
```

## Student Learning

Gợi ý:

```text
Left Navigation
+
Main Learning Content
+
Optional Right Utility Panel
```

Không buộc right panel nếu làm giảm reading width.

## Admin

Gợi ý:

```text
Sidebar
+
Top Bar
+
Content Area
```

---

# 15. Buttons

## Primary

```text
Background: #A6D1FD
Text:       #2B1572
```

Hover:

```text
#8FC5F5
```

Glass variant:

```css
background: rgba(166, 209, 253, 0.52);
backdrop-filter: blur(14px);
border: 1px solid rgba(255, 255, 255, 0.40);
```

---

## Secondary

```css
background: rgba(255, 255, 255, 0.55);
border: 1px solid rgba(43, 21, 114, 0.10);
color: #2B1572;
```

---

## Ghost

Dùng cho action phụ:

```css
background: transparent;
color: #2B1572;
```

Hover:

```css
background: rgba(166, 209, 253, 0.14);
```

---

## AI Button

```css
background:
  linear-gradient(
    135deg,
    rgba(160, 0, 200, 0.88),
    rgba(43, 21, 114, 0.90)
  );
color: #FFFFFF;
```

---

## Danger

```text
Background: #C40000
Text:       #FFFFFF
```

Chỉ dùng cho:

- Delete.
- Revoke.
- Cancel destructive flow.

---

## Button Sizes

```text
sm  32px
md  40px
lg  48px
```

Touch target trên mobile nên đạt tối thiểu khoảng 44px khi có thể.

---

# 16. Badge / Status

## Success

```css
background: rgba(53, 130, 0, 0.12);
color: #358200;
```

## Error

```css
background: rgba(196, 0, 0, 0.10);
color: #C40000;
```

## Warning

```css
background: rgba(163, 90, 0, 0.12);
color: #A35A00;
```

## AI

```css
background: rgba(160, 0, 200, 0.10);
color: #A000C8;
```

## IELTS

```css
background: rgba(45, 111, 168, 0.12);
color: #2D6FA8;
```

## HSK

```css
background: rgba(184, 92, 0, 0.12);
color: #B85C00;
```

## Locked

```css
background: rgba(43, 21, 114, 0.08);
color: rgba(43, 21, 114, 0.58);
```

---

# 17. App Shell

## Components

```text
AppShell
PublicHeader
StudentSidebar
AdminSidebar
TopBar
Breadcrumbs
PageHeader
ContentContainer
MobileBottomNav
```

### Student Sidebar

Có thể gồm:

- Dashboard.
- My Courses.
- Practice.
- Exams.
- Progress.
- Vocabulary.
- Results.
- Orders.
- Profile.

### Rule

Sidebar phải:

- Collapse được trên tablet.
- Trở thành drawer / bottom navigation phù hợp trên mobile.
- Giữ active state rõ ràng.

---

# 18. Public Course Card

Course Card dùng glass vừa phải:

```css
background: rgba(255, 255, 255, 0.60);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.40);
border-radius: 18px;
```

Tối thiểu có:

- Thumbnail.
- Language / Exam badge.
- Title.
- Level.
- Skill.
- Short description.
- Price / access state.
- CTA.

Không nhồi toàn bộ syllabus vào card.

---

# 19. Student Dashboard

Dashboard ưu tiên:

```text
Goal
→ Progress
→ Today’s Plan
→ Weak Skills
→ Continue Learning
```

### Dashboard Card

```css
background: rgba(255, 255, 255, 0.54);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.36);
border-radius: 20px;
```

### Hero Progress Card

Có thể dùng Strong Glass.

Nội dung:

- Current estimate.
- Target.
- Progress bar.
- Target date.
- Continue button.

---

# 20. Course Learning Screen

## Layout

```text
Course Navigation
+
Lesson Content
+
Progress / Utility
```

Lesson content có thể gồm:

- Video.
- Rich text.
- Audio.
- Vocabulary.
- Grammar.
- Reading.
- Practice.
- Summary.

### Rule

Không bọc từng paragraph thành glass card.

Nên dùng:

- Glass cho navigation / utility.
- Surface rõ cho nội dung học.
- Whitespace để tạo hierarchy.

---

# 21. Lesson Navigation

Lesson item có state:

```text
LOCKED
AVAILABLE
IN_PROGRESS
COMPLETED
```

### Completed

- Check icon.
- Success accent.
- Không tô toàn bộ item màu xanh.

### Locked

- Lock icon.
- Muted.
- Tooltip / reason nếu phù hợp.

### Current

- Primary border.
- Primary background tint.

---

# 22. Progress Components

## Progress Bar

```css
height: 8px;
border-radius: 999px;
background: rgba(43, 21, 114, 0.08);
```

Fill dùng:

```text
Primary → normal learning
Success → completed
AI → AI-assisted recommendation only, not progress
```

## Circular Progress

Dùng cho:

- Course completion.
- Vocabulary mastery.
- Study plan completion.

Không dùng quá nhiều circular charts trên cùng màn hình.

---

# 23. Exercise / Quiz UI

Question UI phải ưu tiên readability hơn glass effect.

### Question Container

```css
background: rgba(255, 255, 255, 0.78);
border: 1px solid rgba(43, 21, 114, 0.08);
border-radius: 18px;
```

### Answer Option

Default:

```css
background: rgba(255, 255, 255, 0.62);
border: 1px solid rgba(43, 21, 114, 0.10);
```

Selected:

```css
background: rgba(166, 209, 253, 0.20);
border-color: #7CB8EE;
```

Correct sau submit:

```css
background: rgba(53, 130, 0, 0.10);
border-color: rgba(53, 130, 0, 0.35);
```

Incorrect sau submit:

```css
background: rgba(196, 0, 0, 0.08);
border-color: rgba(196, 0, 0, 0.30);
```

Không reveal correct answer trước submit nếu test policy không cho phép.

---

# 24. Test Taking Mode

Test mode phải giảm distraction.

### Header

Hiển thị:

- Test title.
- Section.
- Progress.
- Timer.
- Submit.

### Timer States

Normal:

```text
Brand / neutral
```

Warning:

```text
Warning
```

Critical:

```text
Danger
```

Không làm timer nhấp nháy liên tục.

### Question Navigator

State:

- Unanswered.
- Answered.
- Flagged.
- Current.

Không dùng màu là tín hiệu duy nhất.

---

# 25. Reading Passage

Reading passage nên dùng surface gần solid:

```css
background: rgba(255, 255, 255, 0.84);
border: 1px solid rgba(43, 21, 114, 0.07);
```

Typography:

```text
16–18px
line-height 1.7
```

Desktop có thể split:

```text
Passage | Questions
```

Mobile ưu tiên single-column hoặc tab chuyển giữa passage / questions.

---

# 26. Listening Player

Audio player phải có:

- Play / pause.
- Current time.
- Duration.
- Seek nếu policy cho phép.
- Volume.
- Playback speed nếu policy cho phép.
- Replay state nếu test giới hạn số lần nghe.

Không ẩn constraint của Listening Test.

---

# 27. Writing Editor

Writing editor ưu tiên surface đặc và dài phiên.

```css
background: rgba(255, 255, 255, 0.88);
border: 1px solid rgba(43, 21, 114, 0.10);
border-radius: 16px;
```

Hiển thị:

- Prompt.
- Word count.
- Save state.
- Submit action.
- Timer nếu là test mode.

Không để decorative gradient phía sau textarea gây khó đọc.

---

# 28. Speaking Recorder

Recorder có các state:

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

### Recording State

Dùng red vừa phải:

- Recording dot.
- Timer.
- Text “Recording”.

Không tô toàn bộ recorder màu đỏ.

### Uploading

- Progress indicator.
- Disable submit đến khi upload hoàn tất.

---

# 29. IELTS UI

IELTS sử dụng accent:

```text
#2D6FA8
```

Skill badges:

- Listening.
- Reading.
- Writing.
- Speaking.

Skill card không cần mỗi skill một màu mạnh khác nhau; dùng cùng IELTS family và icon / label để phân biệt.

### IELTS Result

Có thể hiển thị:

- Skill results.
- Estimated overall.
- Goal.
- Gap.
- Recommended next step.

Nếu là estimated result, phải có badge / note rõ.

---

# 30. HSK UI

HSK sử dụng accent:

```text
#B85C00
```

Không biến toàn UI thành màu cam / đỏ.

### HSK Vocabulary Card

Tối thiểu hỗ trợ:

- Hanzi.
- Pinyin.
- Meaning.
- Audio.
- Example.

Hierarchy gợi ý:

```text
汉字
Pinyin
Meaning
Example
```

Hanzi có thể lớn hơn Body text rõ rệt.

---

# 31. Vocabulary Card

```css
background: rgba(255, 255, 255, 0.60);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.38);
border-radius: 18px;
```

State indicator:

- NEW.
- LEARNING.
- REVIEW.
- MASTERED.

Không dùng 4 màu quá mạnh; semantic state nên nhẹ.

### Flashcard

Front:

- Word / Hanzi.
- Audio action.

Back:

- Meaning.
- Pinyin / phonetic.
- Example.
- Notes.

Flip animation ngắn, không quá 280ms.

---

# 32. Assessment Result

Result summary có thể dùng Strong Glass.

Hiển thị:

- Estimated level / score.
- Skill breakdown.
- Strengths.
- Weak skills.
- Learning gap.
- Recommended learning path.

Không trình bày estimated result như chứng chỉ chính thức.

---

# 33. Learning Path

Path visualization nên rõ hơn decorative.

Gợi ý:

```text
Current
→ Foundation
→ Skill Improvement
→ Practice
→ Mock Test
→ Target
```

Mỗi Path Item có:

- Status.
- Course / Task.
- Estimated effort.
- CTA.

State:

- Locked.
- Available.
- In Progress.
- Completed.

---

# 34. Study Plan / Today’s Plan

Today’s Plan item:

- Task type.
- Duration.
- Course / skill.
- State.
- CTA.

### Completed

```css
opacity: 0.72;
```

Kèm check icon.

Không gạch ngang toàn bộ nội dung nếu làm khó đọc.

---

# 35. Result / Feedback UI

## Auto-graded Result

Hiển thị:

- Score.
- Correct / incorrect count.
- Accuracy.
- Explanation.
- Retry action nếu có.

## Human-reviewed Result

Hiển thị:

- Overall feedback.
- Criteria.
- Score.
- Strengths.
- Improvements.
- Reviewer status.

Feedback phải có hierarchy, không biến thành một paragraph rất dài.

---

# 36. Reviewer UI

Review Workspace tối ưu desktop.

Layout:

```text
Submission
+
Criteria / Score
+
Feedback Panel
```

Action:

- Save Draft.
- Return.
- Publish Review.

Publish phải là action rõ và có confirmation nếu irreversible.

---

# 37. Notification

Notification item:

```css
background: rgba(255, 255, 255, 0.44);
```

Unread:

```css
background: rgba(166, 209, 253, 0.16);
```

Critical:

```text
Danger icon / accent line
```

Không dùng toàn bộ notification màu đỏ.

---

# 38. Inputs

Input:

```css
background: rgba(255, 255, 255, 0.70);
border: 1px solid rgba(43, 21, 114, 0.10);
backdrop-filter: blur(10px);
border-radius: 12px;
```

Focus:

```css
border-color: #7CB8EE;
box-shadow: 0 0 0 3px rgba(166, 209, 253, 0.26);
```

Error:

```css
border-color: rgba(196, 0, 0, 0.55);
```

AI Input:

```css
border-color: rgba(160, 0, 200, 0.48);
```

---

# 39. Form Validation

Error message:

- Nằm gần field.
- Ngắn.
- Có action / hướng sửa nếu cần.
- Không chỉ đổi border đỏ.

Success validation chỉ dùng khi thực sự hữu ích.

---

# 40. Tables

Admin tables ưu tiên readability hơn glass effect.

Header:

```css
background: rgba(255, 255, 255, 0.62);
```

Rows:

```css
background: rgba(255, 255, 255, 0.32);
```

Hover:

```css
background: rgba(166, 209, 253, 0.12);
```

Không làm mỗi cell thành một glass card.

---

# 41. Admin Dashboard

Dashboard card:

```css
background: rgba(255, 255, 255, 0.54);
backdrop-filter: blur(18px);
border-radius: 20px;
```

Chart palette:

- `#A6D1FD`
- `#2B1572`
- `#A000C8`
- `#358200`
- `#A35A00`
- `#C40000`

Không dùng quá nhiều series trên một chart.

---

# 42. Charts

Rule:

- Tối đa số màu vừa đủ để phân biệt series.
- Axis / label phải đọc được.
- Tooltip accessible.
- Không dùng 3D chart.
- Không dùng gradient quá mạnh.
- Không dùng pie chart cho quá nhiều category.

Learning analytics ưu tiên:

- Line.
- Bar.
- Stacked bar.
- Progress.
- Heatmap nhẹ nếu có lý do.

---

# 43. Commerce / Checkout

Checkout UI phải có hierarchy rõ:

```text
Order Items
→ Coupon
→ Price Breakdown
→ Payment Method
→ Final Total
→ Pay
```

Payment state:

- Pending.
- Success.
- Failed.

Không dùng glass quá trong cho price summary.

---

# 44. Certificate

Certificate view có thể khác app shell nhưng vẫn dùng brand system.

Rule:

- Clean.
- Printable.
- Không phụ thuộc glass effect khi export PDF / print.
- Verification code rõ.
- Revoked state rõ nếu có.

---

# 45. AI UI

AI phải có nhận diện riêng nhưng không lấn át core learning.

### AI Accent

```text
#A000C8
```

### AI Glow

```css
box-shadow: 0 8px 28px rgba(160, 0, 200, 0.16);
```

### AI Suggestion Card

```css
background: rgba(160, 0, 200, 0.07);
border: 1px solid rgba(160, 0, 200, 0.16);
backdrop-filter: blur(16px);
```

Phải phân biệt:

```text
AI Suggestion
vs
System Fact
vs
Teacher Feedback
vs
Executed Action
```

---

# 46. Empty State

Empty state gồm:

- Icon / illustration nhẹ.
- Tiêu đề.
- Mô tả ngắn.
- Primary CTA nếu có.

Ví dụ:

```text
Bạn chưa có từ vựng nào trong My Vocabulary.
[Khám phá từ vựng]
```

Không dùng empty state quá trang trí trong Test Mode.

---

# 47. Loading State

Dùng:

- Skeleton cho card / list.
- Spinner cho action ngắn.
- Progress bar cho upload / processing dài.

Không dùng spinner toàn màn hình nếu chỉ một widget đang load.

---

# 48. Error State

Error state phải trả lời:

```text
What happened?
Can the user retry?
Is data safe?
What should the user do next?
```

Ví dụ upload Speaking lỗi:

- Giữ local recording nếu có thể.
- Hiển thị Retry Upload.
- Không bắt user record lại nếu không cần.

---

# 49. Toast

Toast dùng cho:

- Saved.
- Copied.
- Added to vocabulary.
- Published.
- Payment status update nhẹ.

Không dùng toast làm nơi duy nhất hiển thị lỗi critical.

Duration gợi ý:

```text
Success: 2.5–4s
Info:    3–5s
Error:   persistent hơn hoặc có action
```

---

# 50. Modal / Dialog

Modal Strong Glass:

```css
background: rgba(255, 255, 255, 0.74);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.45);
border-radius: 24px;
```

Rule:

- Một primary action.
- Một secondary / cancel.
- Danger action tách rõ.
- Focus trap.
- Esc behavior rõ.
- Không dùng modal cho flow dài nếu full page phù hợp hơn.

---

# 51. Icons

Khuyến nghị:

- Lucide Icons.
- Stroke style.
- 1.5–2px.

Không trộn icon family.

Icon-only button phải có accessible label.

---

# 52. Animation

Animation phải ngắn và có mục đích.

```text
Hover              120–180ms
Dropdown           160–220ms
Modal              200–280ms
Page transition    180–260ms
Flashcard flip     220–280ms
Progress update    220–360ms
```

Không dùng:

- Bounce liên tục.
- Excessive scale.
- Constant floating.
- Flashing timer.
- Background motion trong Test Mode.

---

# 53. Accessibility

Glass effect không được hy sinh khả năng đọc.

Phải đảm bảo:

- Contrast tốt.
- Focus visible.
- Keyboard navigation.
- Không chỉ dùng màu để biểu diễn trạng thái.
- `aria-label` cho icon-only action.
- Form error được liên kết với field.
- Audio control dùng được bằng keyboard.
- Modal focus trap.
- Dialog có accessible title.
- Timer không cập nhật theo cách gây nhiễu screen reader.
- Drag/drop nếu có phải có alternative thao tác không dùng chuột.

---

# 54. Responsive

## Desktop

Ưu tiên:

- Admin.
- Test Builder.
- Reviewer workspace.
- Split Reading layout.
- Full learning navigation.

## Tablet

- Sidebar collapse.
- 2-column layout khi đủ rộng.
- Course cards giảm số cột.
- Right panel có thể chuyển drawer.

## Mobile

Ưu tiên:

- Continue Learning.
- Lesson.
- Vocabulary.
- Practice.
- Audio.
- Speaking recording.

Không ép desktop layout thu nhỏ nguyên xi.

Có thể dùng:

- Bottom navigation.
- Bottom sheet.
- Stacked filters.
- Sticky lesson CTA.
- Single-column test view.

---

# 55. Dark Mode mở rộng

Dark Mode có thể dùng:

```text
Background:
#150D32

Surface:
rgba(43, 21, 114, 0.44)

Glass:
rgba(255, 255, 255, 0.08)

Border:
rgba(255, 255, 255, 0.12)

Primary text:
rgba(255, 255, 255, 0.95)

Secondary text:
rgba(255, 255, 255, 0.72)
```

Không đảo màu một cách máy móc.

Reading passage / Writing editor phải giữ contrast cao.

---

# 56. Component Naming Convention

```text
AppShell
PublicHeader
PublicFooter
StudentSidebar
AdminSidebar
TopBar
Breadcrumbs
PageHeader

CourseCard
CourseGrid
CourseHero
CourseProgress
ModuleAccordion
LessonNavigation
LessonContent
LearningMaterial
ContinueLearningCard

QuestionCard
AnswerOption
QuestionNavigator
TestHeader
TestTimer
TestSectionNav
TestResultSummary

AudioPlayer
SpeakingRecorder
WritingEditor
ReadingPassage
ListeningPanel

VocabularyCard
VocabularyFlashcard
VocabularyStateBadge
VocabularyPractice

LearningGoalCard
AssessmentSummary
LearningGapCard
LearningPath
PathItem
StudyPlan
StudyTask

SkillProgress
ProgressBar
ProgressRing
WeakSkillCard

SubmissionPanel
ReviewWorkspace
ReviewCriteria
FeedbackPanel

PackageCard
CheckoutSummary
OrderStatus
PaymentStatus

NotificationPanel
NotificationItem
SearchCommand
FilterBar

ArticleCard
ResourceCard

DashboardWidget
AnalyticsChart
AdminTable

AiAssistant
AiSuggestion
AiTutorPanel

ConfirmDialog
EmptyState
ErrorState
LoadingSkeleton
Toast
```

---

# 57. Token gợi ý

```css
:root {
  /* Brand */
  --color-primary: #A6D1FD;
  --color-primary-strong: #4F91CF;
  --color-brand: #2B1572;
  --color-brand-deep: #1D0F4E;

  /* Semantic */
  --color-success: #358200;
  --color-warning: #A35A00;
  --color-danger: #C40000;
  --color-ai: #A000C8;
  --color-info: #2D6FA8;

  /* Exam accents */
  --color-ielts: #2D6FA8;
  --color-hsk: #B85C00;

  /* Base */
  --color-white: #FFFFFF;
  --color-page: #F5F9FF;

  /* Text */
  --text-primary: rgba(43, 21, 114, 0.95);
  --text-secondary: rgba(43, 21, 114, 0.68);
  --text-muted: rgba(43, 21, 114, 0.48);
  --text-disabled: rgba(43, 21, 114, 0.32);

  /* Glass */
  --glass-xs: rgba(255, 255, 255, 0.32);
  --glass-sm: rgba(255, 255, 255, 0.44);
  --glass-md: rgba(255, 255, 255, 0.55);
  --glass-lg: rgba(255, 255, 255, 0.70);
  --glass-solid: rgba(255, 255, 255, 0.84);

  /* Borders */
  --border-glass: rgba(255, 255, 255, 0.35);
  --border-neutral: rgba(43, 21, 114, 0.10);
  --border-focus: #7CB8EE;

  /* Shadows */
  --shadow-sm: 0 4px 16px rgba(43, 21, 114, 0.08);
  --shadow-md: 0 8px 32px rgba(43, 21, 114, 0.10);
  --shadow-lg: 0 18px 50px rgba(43, 21, 114, 0.15);

  /* Radius */
  --radius-xs: 10px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Blur */
  --blur-sm: 12px;
  --blur-md: 18px;
  --blur-lg: 24px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Motion */
  --duration-fast: 140ms;
  --duration-normal: 200ms;
  --duration-slow: 280ms;
}
```

---

# 58. Tailwind Mapping gợi ý

Nếu dự án dùng Tailwind, semantic token nên map qua theme thay vì hard-code màu trực tiếp trong component.

Ví dụ conceptual:

```text
bg-primary
text-brand
text-muted
border-neutral
bg-glass-md
shadow-glass-md
rounded-card
text-success
text-danger
text-ai
text-ielts
text-hsk
```

Mục tiêu:

```text
Component
→ Semantic Token
→ Theme Value
```

không phải:

```text
Component
→ Random Hex
```

---

# 59. Design Rule cho Learning vs Test vs Admin

## Learning Mode

Cho phép:

- Glass.
- Soft gradient.
- Recommendation cards.
- Rich learning content.

## Test Mode

Giảm:

- Blur.
- Gradient.
- Animation.
- Decorative AI.
- Navigation distraction.

Ưu tiên:

- Question readability.
- Timer.
- Answer state.
- Submit safety.

## Admin Mode

Ưu tiên:

- Density hợp lý.
- Table readability.
- Filter.
- Bulk operation clarity.
- Auditability.

Glass chỉ dùng ở shell / widget, không dùng quá nhiều trong data table.

---

# 60. Design Principle cuối cùng

Web Học Ngoại Ngữ phải mang cảm giác:

```text
Clear
+
Calm
+
Modern
+
Focused
+
Supportive
+
Structured
```

Không nên biến:

```text
Glassmorphism
=
Blur mọi thứ
```

Mà phải là:

```text
Glass
+
Hierarchy
+
Contrast
+
Whitespace
+
Readable Learning Content
+
Controlled Color
```

Với mọi quyết định UI:

```text
Usability
>
Learning Focus
>
Visual Consistency
>
Decoration
```
