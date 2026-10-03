# Web Học Ngoại Ngữ — Test Plan

> Scope: IELTS + HSK learning platform  
> Frontend: Next.js  
> Backend: NestJS  
> Database/Auth/Storage: Supabase  
> Automated Testing: Jest + Playwright

---

# 1. Mục tiêu kiểm thử

Đảm bảo hệ thống:

- đúng requirement và use case,
- bảo vệ dữ liệu người dùng,
- không bypass course access,
- chấm/lưu kết quả đúng,
- không duplicate mutation do retry,
- hoạt động ổn định trên desktop/mobile,
- không expose answer key hoặc secret,
- giữ tính nhất quán payment/result/progress,
- hỗ trợ core learning flows trước release.

---

# 2. Test Scope

## In Scope

```text
Auth
User/Profile
Public Site
Course
Lesson
Exercise
Question Bank
Test Engine
Placement/Diagnostic
Learning Goal/Path
Progress
Vocabulary
Writing/Speaking Submission
Review
Package/Order/Payment/Coupon
CMS
Notification
Certificate
Media
Admin
Analytics
Realtime
Supabase integration
```

## V2 / Conditional

```text
AI-assisted learning
Advanced recommendation
Spaced repetition advanced algorithm
```

AI test chạy khi module enable.

---

# 3. Test Levels

## Unit Test

Target:

```text
service
policy
validator
mapper
scoring strategy
progress calculation
coupon rule
course access
state transition
```

Framework:

```text
Jest
```

## Integration Test

Target:

```text
Service + Repository + PostgreSQL
Transaction
Supabase Auth adapter
Storage adapter
Payment adapter
Redis lock/cache
```

## API E2E

```text
HTTP
→ auth
→ policy
→ service
→ DB
```

## Browser E2E

Playwright:

```text
Next.js
→ Backend
→ test infrastructure
```

---

# 4. Environments

## Local

```text
Frontend localhost
Backend localhost
Isolated development/test database
```

## CI

Requirements:

- isolated database/schema,
- deterministic seed,
- mock external payment/email unless contract test,
- never use production Supabase project.

## Staging

Production-like:

- Supabase staging project,
- staging Storage buckets,
- payment sandbox,
- test email provider.

---

# 5. Test Data Strategy

Use:

```text
essential seed
+
test-specific fixtures
```

Each suite:

- creates own data where practical,
- cleans/resets state,
- uses unique IDs/email,
- avoids order dependence.

---

# 6. Entry Criteria

```text
[ ] Requirement identified
[ ] Use Case identified
[ ] API contract exists
[ ] UI behavior defined
[ ] Migration available if needed
[ ] Seed/fixture available
[ ] Feature deploys to test environment
```

---

# 7. Exit Criteria

```text
[ ] No open Critical defect
[ ] No open High defect on core flow
[ ] Core Playwright flows pass
[ ] Backend unit/integration pass
[ ] Migration test pass
[ ] Authorization tests pass
[ ] Payment idempotency pass if commerce enabled
[ ] Test Result integrity tests pass
[ ] Accessibility smoke pass
[ ] Browser smoke pass
```

---

# 8. Severity

## Critical

Examples:

- payment grants wrong user access,
- answer key exposed to Student,
- user can read another user's submission/order/result,
- data loss,
- admin bypass,
- finalized result corruption.

## High

Examples:

- cannot submit test,
- course access broken,
- login unusable,
- review publish fails,
- wrong auto-scoring.

## Medium

Examples:

- filter incorrect,
- progress UI mismatch but canonical data correct,
- non-core responsive defect.

## Low

Examples:

- spacing,
- copy issue,
- non-blocking visual inconsistency.

---

# 9. Test Case Naming

```text
TC-<DOMAIN>-<NUMBER>
```

Examples:

```text
TC-AUTH-001
TC-COURSE-005
TC-TEST-014
```

---

# 10. Authentication Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-AUTH-001 | register valid account | identity created |
| TC-AUTH-002 | duplicate email | rejected |
| TC-AUTH-003 | invalid email | validation error |
| TC-AUTH-004 | login valid | session created |
| TC-AUTH-005 | login invalid password | rejected safely |
| TC-AUTH-006 | expired JWT to Backend | 401 |
| TC-AUTH-007 | missing JWT protected API | 401 |
| TC-AUTH-008 | suspended app user | business access denied |
| TC-AUTH-009 | password reset flow | accepted |
| TC-AUTH-010 | logout | session/local state cleared |

Security:

```text
SUPABASE_SERVICE_ROLE_KEY
```

must never reach browser.

---

# 11. User/Profile Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-USER-001 | get own profile | correct user |
| TC-USER-002 | update display name | persisted |
| TC-USER-003 | invalid timezone | validation |
| TC-USER-004 | update learning preference | persisted |
| TC-USER-005 | avatar signed upload | success |
| TC-USER-006 | update another user | forbidden |

---

# 12. Public Site Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-PUB-001 | homepage anonymous | renders |
| TC-PUB-002 | published course catalog | visible |
| TC-PUB-003 | draft course public | hidden |
| TC-PUB-004 | course detail slug | correct |
| TC-PUB-005 | draft article | hidden |
| TC-PUB-006 | mobile homepage | usable |
| TC-PUB-007 | SEO metadata | present |

---

# 13. Course Access Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-COURSE-001 | free course enroll | access/enrollment |
| TC-COURSE-002 | paid course no grant | denied |
| TC-COURSE-003 | purchased course | allowed |
| TC-COURSE-004 | package course | allowed |
| TC-COURSE-005 | preview lesson | preview only |
| TC-COURSE-006 | revoked access | denied |
| TC-COURSE-007 | expired grant | denied |
| TC-COURSE-008 | admin grant | allowed |
| TC-COURSE-009 | unpublished course | unavailable |
| TC-COURSE-010 | public outline | no premium body leak |

---

# 14. Lesson / Progress Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-LESSON-001 | open accessible lesson | returned |
| TC-LESSON-002 | locked prerequisite | denied/locked |
| TC-LESSON-003 | start lesson twice | no duplicate |
| TC-LESSON-004 | video position | persisted |
| TC-LESSON-005 | required material complete | progress updates |
| TC-LESSON-006 | complete retry | idempotent |
| TC-LESSON-007 | course progress aggregate | correct |
| TC-LESSON-008 | progress >100 | rejected/constraint |

---

# 15. Question Bank Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-QB-001 | admin creates MCQ | saved |
| TC-QB-002 | invalid question payload | validation |
| TC-QB-003 | filter skill/type | correct |
| TC-QB-004 | archive question | unavailable for normal new use |
| TC-QB-005 | reuse question | supported |
| TC-QB-006 | Student fetch | answer key absent |
| TC-QB-007 | Student option response | `isCorrect` absent |
| TC-QB-008 | invalid import | validation report |

---

# 16. Exercise Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-EX-001 | start attempt | attempt no 1 |
| TC-EX-002 | save answer | persisted |
| TC-EX-003 | submit auto-grade | correct score |
| TC-EX-004 | submit twice | no duplicate |
| TC-EX-005 | attempt limit | denied |
| TC-EX-006 | explanation pre-submit | hidden |
| TC-EX-007 | explanation post-submit | policy applied |

---

# 17. Test Builder Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-TB-001 | create test | draft |
| TC-TB-002 | create version | version 1 |
| TC-TB-003 | sections/questions | correct order |
| TC-TB-004 | empty section validation | error |
| TC-TB-005 | publish valid version | published |
| TC-TB-006 | edit published version | denied |
| TC-TB-007 | new version | increments |
| TC-TB-008 | old attempt after new version | unchanged |

---

# 18. Test Attempt / Result Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-TEST-001 | create attempt | version attached |
| TC-TEST-002 | save answer | unique per question |
| TC-TEST-003 | update pre-submit | latest saved |
| TC-TEST-004 | submit | finalized workflow |
| TC-TEST-005 | duplicate submit same key | same effect |
| TC-TEST-006 | concurrent submit | one finalization |
| TC-TEST-007 | submit expired attempt | policy applied |
| TC-TEST-008 | auto-score MCQ | correct |
| TC-TEST-009 | manual-review question | pending/partial |
| TC-TEST-010 | finalized result update | denied |
| TC-TEST-011 | master question changed later | history unchanged |
| TC-TEST-012 | timer client-clock manipulation | server expiry wins |
| TC-TEST-013 | read other user's attempt | forbidden |
| TC-TEST-014 | answer key before policy | hidden |

---

# 19. Assessment Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-ASMT-001 | active placement listed | visible |
| TC-ASMT-002 | start placement | AssessmentAttempt + TestAttempt |
| TC-ASMT-003 | submit | result created |
| TC-ASMT-004 | skill breakdown configured | returned |
| TC-ASMT-005 | retake too early | denied |
| TC-ASMT-006 | finalized result | immutable |
| TC-ASMT-007 | recommendation refs | valid |
| TC-ASMT-008 | UI result wording | clearly estimated |

---

# 20. Learning Goal / Path Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-PATH-001 | create goal | active |
| TC-PATH-002 | invalid goal data | validation |
| TC-PATH-003 | generate path | items created |
| TC-PATH-004 | regenerate | history preserved |
| TC-PATH-005 | next learning | skips completed |
| TC-PATH-006 | prerequisite | respected |
| TC-PATH-007 | daily task complete | persisted |

---

# 21. Vocabulary Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-VOC-001 | search | results |
| TC-VOC-002 | add My Vocabulary | NEW |
| TC-VOC-003 | duplicate add | one row |
| TC-VOC-004 | NEW→LEARNING | valid |
| TC-VOC-005 | REVIEW→MASTERED | valid |
| TC-VOC-006 | Hanzi/Pinyin render | correct |
| TC-VOC-007 | Pinyin toggle | correct UI/preference |
| TC-VOC-008 | review counters | correct |

---

# 22. Writing Submission Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-WRITE-001 | create draft | DRAFT |
| TC-WRITE-002 | autosave | persisted |
| TC-WRITE-003 | submit | SUBMITTED |
| TC-WRITE-004 | edit locked submit | denied |
| TC-WRITE-005 | owner history | allowed |
| TC-WRITE-006 | other Student access | forbidden |
| TC-WRITE-007 | word count | consistent |

---

# 23. Speaking Submission Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-SPK-001 | microphone denied | recoverable UI |
| TC-SPK-002 | record | RECORDED |
| TC-SPK-003 | signed upload | authorized |
| TC-SPK-004 | invalid MIME | rejected |
| TC-SPK-005 | oversized file | rejected |
| TC-SPK-006 | upload confirm | linked |
| TC-SPK-007 | reviewer access | allowed |
| TC-SPK-008 | unrelated user access | forbidden |

---

# 24. Review Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-REV-001 | reviewer queue | scoped |
| TC-REV-002 | unauthorized reviewer | denied |
| TC-REV-003 | draft review | not Student-visible |
| TC-REV-004 | publish | visible |
| TC-REV-005 | publish audit | created |
| TC-REV-006 | publish notification | created |
| TC-REV-007 | revise published | history preserved |
| TC-REV-008 | Student current review | only published current |

---

# 25. Commerce Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-ORD-001 | create order | price snapshot |
| TC-ORD-002 | later course price change | old order unchanged |
| TC-ORD-003 | valid coupon | discount |
| TC-ORD-004 | expired coupon | invalid |
| TC-ORD-005 | user limit exceeded | denied |
| TC-ORD-006 | negative total | impossible |
| TC-ORD-007 | read other user's order | forbidden |

---

# 26. Payment Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-PAY-001 | initiate | CREATED/PENDING |
| TC-PAY-002 | valid webhook | processed |
| TC-PAY-003 | invalid signature | rejected |
| TC-PAY-004 | duplicate provider event | no duplicate |
| TC-PAY-005 | success webhook | order completed |
| TC-PAY-006 | success access grant | correct courses |
| TC-PAY-007 | success redirect without webhook | no false grant |
| TC-PAY-008 | failed payment | no access |
| TC-PAY-009 | concurrent webhook | one completion |
| TC-PAY-010 | internal provider metadata | not leaked |

---

# 27. CMS Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-CMS-001 | draft article public | hidden |
| TC-CMS-002 | publish | visible |
| TC-CMS-003 | duplicate slug | rejected |
| TC-CMS-004 | SEO fields | render |
| TC-CMS-005 | archive | not public |
| TC-CMS-006 | content manager scope | enforced |

---

# 28. Notification / Realtime Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-NOTI-001 | create | unread |
| TC-NOTI-002 | mark read | readAt |
| TC-NOTI-003 | mark all | correct |
| TC-NOTI-004 | dedup key repeat | no duplicate |
| TC-RT-001 | valid socket auth | connected |
| TC-RT-002 | invalid socket token | rejected |
| TC-RT-003 | review event | correct user |
| TC-RT-004 | reconnect | canonical refetch |

---

# 29. Certificate Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-CERT-001 | eligible issue | created |
| TC-CERT-002 | retry issue | one active issuance |
| TC-CERT-003 | verify code | safe public response |
| TC-CERT-004 | revoked | revoked state |
| TC-CERT-005 | private certificate file | owner/admin |

---

# 30. Admin Authorization Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-ADM-001 | Student calls admin endpoint | 403 |
| TC-ADM-002 | Content Manager permitted edit | allowed |
| TC-ADM-003 | Reviewer edits course | denied |
| TC-ADM-004 | Admin role change | allowed + audit |
| TC-ADM-005 | mutate audit log | unavailable |
| TC-ADM-006 | suspended admin | denied |

---

# 31. Supabase Security Test Cases

```text
TC-SEC-001 service role key absent browser bundle
TC-SEC-002 DATABASE_URL absent browser bundle
TC-SEC-003 private object no public access
TC-SEC-004 signed URL expires
TC-SEC-005 speaking object scoped
TC-SEC-006 public content readable
TC-SEC-007 RLS blocks unauthorized direct row access
TC-SEC-008 Backend application policy still runs with service role
```

---

# 32. General API Security Tests

Test:

- IDOR/BOLA,
- broken function level authorization,
- mass assignment,
- invalid enum,
- oversized payload,
- malformed JSON,
- unsafe file metadata,
- invalid MIME,
- rate limit,
- SQL injection attempts,
- XSS storage/rendering,
- CSRF where applicable,
- secret leakage,
- verbose error leakage.

---

# 33. Performance Tests

NFR baseline:

```text
normal API p95 <= 500ms under baseline load
```

Targets:

```text
GET course catalog
GET dashboard
GET lesson
save progress
save test answer
submit test
admin question search
```

Video/audio should stream from Storage/CDN using signed URL, not through NestJS data path.

---

# 34. Concurrency Tests

Required:

```text
two test submits
two payment webhooks
two coupon redemption requests
two certificate issue requests
two lesson-completion requests
```

Expected:

- one logical effect,
- no duplicate result/access,
- no invalid usage count.

---

# 35. Accessibility Test Plan

Check:

```text
keyboard
focus
labels
heading hierarchy
contrast
error association
modal focus trap
audio controls
accessible names
touch targets
```

Critical screens:

```text
Login
Dashboard
Lesson
Test
Writing
Speaking
Checkout
Admin forms
```

---

# 36. Browser / Device Matrix

```text
Chrome latest
Edge latest
Firefox latest
Safari latest where available
```

Responsive:

```text
Desktop 1440
Laptop 1280
Tablet 768/1024
Mobile 390
Mobile 360
```

Speaking recording cần browser/device capability test riêng.

---

# 37. Visual Regression Targets

```text
Homepage
Course Card
Dashboard
Lesson
Test Taking
Assessment Result
Vocabulary Card
Admin Table
Modal
Toast
```

---

# 38. Backup / Migration Tests

```text
migration on fresh DB
migration on representative existing DB
seed after reset
foreign-key integrity
recovery procedure reviewed
```

Database backup và Storage recovery là hai concern khác nhau.

---

# 39. Logging / Observability Test

Log should contain:

```text
requestId
route
method
duration
statusCode
userId when authenticated
```

Must not contain:

```text
password
access token
refresh token
service role key
payment secret
raw credential
```

---

# 40. Automated Test Priority

## P0 — Every PR

```text
unit
critical integration
lint/typecheck
authorization smoke
```

## P1 — Main / CI

```text
API E2E
core browser E2E
migration + seed
```

## P2 — Staging / Release

```text
payment sandbox
storage
realtime
browser matrix
performance smoke
accessibility
```

---

# 41. Core Playwright Journeys

## E2E-01 Register → Dashboard

```text
Register
→ identity/session
→ bootstrap profile
→ dashboard
```

## E2E-02 Placement → Path

```text
Login
→ Placement
→ Answer
→ Submit
→ Result
→ Create Goal
→ Generate Path
```

## E2E-03 Course Learning

```text
Course
→ Access/Enroll
→ Lesson
→ Practice
→ Complete
→ Progress
```

## E2E-04 Test

```text
Start Test
→ Answer
→ Submit
→ Result
```

## E2E-05 Vocabulary

```text
Add
→ Review
→ Change state
```

## E2E-06 Writing Review

```text
Student submit
→ Reviewer publish
→ Student receives result
```

## E2E-07 Speaking Review

```text
Upload audio fixture
→ Submit
→ Reviewer access
→ Publish
```

## E2E-08 Commerce

```text
Create Order
→ sandbox payment event
→ access granted
→ My Courses
```

## E2E-09 Admin Content

```text
Admin create Course
→ Module
→ Lesson
→ Publish
→ Public catalog
```

## E2E-10 Test Builder

```text
Question
→ Test
→ Version
→ Section
→ Add Question
→ Validate
→ Publish
→ Student attempt
```

---

# 42. Traceability Matrix Template

| Test | Requirement | Use Case | API | UI |
|---|---|---|---|---|
| TC-COURSE-002 | BR03 | Course Access | lesson/access | Course/Lesson |
| TC-TEST-005 | BR06/BR07 | Test Submit | submit attempt | Test |
| TC-PAY-004 | BR10 | Payment Event | webhook | Checkout |
| TC-REV-005 | BR11 | Publish Review | review publish | Reviewer |

QA tiếp tục mở rộng khi implementation bắt đầu.

---

# 43. Release Gate

Không release nếu có:

```text
Critical security defect
Critical data consistency defect
Test result corruption
Payment duplicate grant
Unauthorized private data access
Core login/course/test flow broken
Production migration unverified
```

Medium/Low chỉ có thể defer khi:

- không ảnh hưởng security/core/data,
- có owner,
- có follow-up.

---

# 44. Definition of Done — Test

```text
[ ] Acceptance criteria mapped
[ ] Happy path
[ ] Validation
[ ] Authorization
[ ] Error path
[ ] State transition
[ ] Idempotency/concurrency nếu cần
[ ] Unit/integration coverage phù hợp
[ ] E2E core path nếu critical
[ ] No Critical/High unresolved defect
```
