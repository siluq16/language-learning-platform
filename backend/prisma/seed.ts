/**
 * Web Học Ngoại Ngữ — Prisma Seed Baseline
 *
 * IMPORTANT:
 * - Baseline cho schema dự kiến trong ERD.md.
 * - Sau khi tạo schema.prisma, đồng bộ lại đúng Prisma model/enum names.
 * - Không hard-code production credential hoặc Supabase service key.
 * - Demo content bên dưới là nội dung tự tạo/generic.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedRoles() {
  const roles = [
    { code: "STUDENT", name: "Student", description: "Learner account" },
    { code: "ADMIN", name: "Administrator", description: "System administrator" },
    {
      code: "CONTENT_MANAGER",
      name: "Content Manager",
      description: "Manages learning and CMS content",
    },
    {
      code: "REVIEWER",
      name: "Teacher / Reviewer",
      description: "Reviews Writing and Speaking submissions",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {
        name: role.name,
        description: role.description,
      },
      create: {
        ...role,
        isSystem: true,
      },
    });
  }
}

async function seedLanguages() {
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "zh", name: "Chinese", nativeName: "中文" },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: language,
      create: {
        ...language,
        isActive: true,
      },
    });
  }
}

async function seedSkills() {
  const skills = [
    ["LISTENING", "Listening"],
    ["READING", "Reading"],
    ["WRITING", "Writing"],
    ["SPEAKING", "Speaking"],
    ["VOCABULARY", "Vocabulary"],
    ["GRAMMAR", "Grammar"],
  ] as const;

  for (const [code, name] of skills) {
    await prisma.skill.upsert({
      where: { code },
      update: { name },
      create: { code, name },
    });
  }
}

async function seedExams() {
  const english = await prisma.language.findUniqueOrThrow({
    where: { code: "en" },
  });

  const chinese = await prisma.language.findUniqueOrThrow({
    where: { code: "zh" },
  });

  const ielts = await prisma.exam.upsert({
    where: { code: "IELTS" },
    update: {
      name: "IELTS",
      languageId: english.id,
      isActive: true,
    },
    create: {
      code: "IELTS",
      name: "IELTS",
      languageId: english.id,
      description: "IELTS-oriented learning and preparation catalog.",
      isActive: true,
    },
  });

  const hsk = await prisma.exam.upsert({
    where: { code: "HSK" },
    update: {
      name: "HSK",
      languageId: chinese.id,
      isActive: true,
    },
    create: {
      code: "HSK",
      name: "HSK",
      languageId: chinese.id,
      description: "HSK-oriented Chinese learning catalog.",
      isActive: true,
    },
  });

  return { ielts, hsk };
}

async function seedExamVersions(ieltsId: string, hskId: string) {
  const ieltsVersion = await prisma.examVersion.upsert({
    where: {
      examId_versionCode: {
        examId: ieltsId,
        versionCode: "IELTS_INTERNAL_V1",
      },
    },
    update: {
      name: "IELTS Internal Development Configuration v1",
      isActive: true,
    },
    create: {
      examId: ieltsId,
      versionCode: "IELTS_INTERNAL_V1",
      name: "IELTS Internal Development Configuration v1",
      isActive: true,
      config: {
        purpose: "development",
        officialSpecification: false,
      },
      scoringConfig: {
        mode: "development-placeholder",
      },
    },
  });

  const hskVersion = await prisma.examVersion.upsert({
    where: {
      examId_versionCode: {
        examId: hskId,
        versionCode: "HSK_INTERNAL_V1",
      },
    },
    update: {
      name: "HSK Internal Development Configuration v1",
      isActive: true,
    },
    create: {
      examId: hskId,
      versionCode: "HSK_INTERNAL_V1",
      name: "HSK Internal Development Configuration v1",
      isActive: true,
      config: {
        purpose: "development",
        officialSpecification: false,
      },
      scoringConfig: {
        mode: "development-placeholder",
      },
    },
  });

  return { ieltsVersion, hskVersion };
}

async function seedLevels(ieltsVersionId: string, hskVersionId: string) {
  const ieltsLevels = [
    ["FOUNDATION", "Foundation", 0],
    ["4.0", "IELTS 4.0", 10],
    ["4.5", "IELTS 4.5", 20],
    ["5.0", "IELTS 5.0", 30],
    ["5.5", "IELTS 5.5", 40],
    ["6.0", "IELTS 6.0", 50],
    ["6.5", "IELTS 6.5", 60],
    ["7.0", "IELTS 7.0", 70],
    ["7.5_PLUS", "IELTS 7.5+", 80],
  ] as const;

  for (const [code, name, sortOrder] of ieltsLevels) {
    await prisma.level.upsert({
      where: {
        examVersionId_code: {
          examVersionId: ieltsVersionId,
          code,
        },
      },
      update: { name, sortOrder },
      create: {
        examVersionId: ieltsVersionId,
        code,
        name,
        sortOrder,
        metadata: { seed: true },
      },
    });
  }

  const hskLevels = [
    ["FOUNDATION", "HSK Foundation", 0],
    ["HSK1", "HSK 1", 10],
    ["HSK2", "HSK 2", 20],
    ["HSK3", "HSK 3", 30],
    ["HSK4", "HSK 4", 40],
    ["HSK5", "HSK 5", 50],
    ["HSK6", "HSK 6", 60],
  ] as const;

  for (const [code, name, sortOrder] of hskLevels) {
    await prisma.level.upsert({
      where: {
        examVersionId_code: {
          examVersionId: hskVersionId,
          code,
        },
      },
      update: { name, sortOrder },
      create: {
        examVersionId: hskVersionId,
        code,
        name,
        sortOrder,
        metadata: {
          seed: true,
          note: "Development catalog level; verify production exam configuration.",
        },
      },
    });
  }
}

async function seedExamSkills(
  ieltsVersionId: string,
  hskVersionId: string,
) {
  const allSkills = await prisma.skill.findMany();
  const byCode = new Map(allSkills.map((skill) => [skill.code, skill]));

  const ieltsCodes = ["LISTENING", "READING", "WRITING", "SPEAKING"];
  const hskCodes = [
    "LISTENING",
    "READING",
    "WRITING",
    "SPEAKING",
    "VOCABULARY",
    "GRAMMAR",
  ];

  for (const [index, code] of ieltsCodes.entries()) {
    const skill = byCode.get(code);
    if (!skill) throw new Error(`Missing skill ${code}`);

    await prisma.examSkill.upsert({
      where: {
        examVersionId_skillId: {
          examVersionId: ieltsVersionId,
          skillId: skill.id,
        },
      },
      update: { sortOrder: index + 1 },
      create: {
        examVersionId: ieltsVersionId,
        skillId: skill.id,
        sortOrder: index + 1,
        config: {},
      },
    });
  }

  for (const [index, code] of hskCodes.entries()) {
    const skill = byCode.get(code);
    if (!skill) throw new Error(`Missing skill ${code}`);

    await prisma.examSkill.upsert({
      where: {
        examVersionId_skillId: {
          examVersionId: hskVersionId,
          skillId: skill.id,
        },
      },
      update: { sortOrder: index + 1 },
      create: {
        examVersionId: hskVersionId,
        skillId: skill.id,
        sortOrder: index + 1,
        config: {},
      },
    });
  }
}

async function seedDemoCourses(
  ieltsId: string,
  hskId: string,
  ieltsVersionId: string,
  hskVersionId: string,
) {
  const english = await prisma.language.findUniqueOrThrow({
    where: { code: "en" },
  });
  const chinese = await prisma.language.findUniqueOrThrow({
    where: { code: "zh" },
  });

  const ieltsFoundationLevel = await prisma.level.findUniqueOrThrow({
    where: {
      examVersionId_code: {
        examVersionId: ieltsVersionId,
        code: "FOUNDATION",
      },
    },
  });

  const hskFoundationLevel = await prisma.level.findUniqueOrThrow({
    where: {
      examVersionId_code: {
        examVersionId: hskVersionId,
        code: "FOUNDATION",
      },
    },
  });

  const ieltsCourse = await prisma.course.upsert({
    where: { slug: "ielts-foundation" },
    update: {},
    create: {
      languageId: english.id,
      examId: ieltsId,
      examVersionId: ieltsVersionId,
      levelId: ieltsFoundationLevel.id,
      title: "IELTS Foundation",
      slug: "ielts-foundation",
      shortDescription:
        "Development course for foundational IELTS-oriented skills.",
      description:
        "Original demo content for development. Not an official IELTS course.",
      courseType: "FOUNDATION",
      status: "PUBLISHED",
      price: 499000,
      currency: "VND",
      isFree: false,
      trialEnabled: true,
      estimatedMinutes: 360,
    },
  });

  const hskCourse = await prisma.course.upsert({
    where: { slug: "hsk-foundation" },
    update: {},
    create: {
      languageId: chinese.id,
      examId: hskId,
      examVersionId: hskVersionId,
      levelId: hskFoundationLevel.id,
      title: "HSK Foundation",
      slug: "hsk-foundation",
      shortDescription:
        "Development Chinese foundation course with Pinyin and vocabulary.",
      description:
        "Original demo content for development. Not an official HSK course.",
      courseType: "FOUNDATION",
      status: "PUBLISHED",
      price: 399000,
      currency: "VND",
      isFree: false,
      trialEnabled: true,
      estimatedMinutes: 300,
    },
  });

  return { ieltsCourse, hskCourse };
}

async function seedDemoVocabulary() {
  const english = await prisma.language.findUniqueOrThrow({
    where: { code: "en" },
  });
  const chinese = await prisma.language.findUniqueOrThrow({
    where: { code: "zh" },
  });

  const englishItems = [
    { term: "environment", meaning: "môi trường", partOfSpeech: "noun" },
    {
      term: "significant",
      meaning: "đáng kể, quan trọng",
      partOfSpeech: "adjective",
    },
    { term: "evidence", meaning: "bằng chứng", partOfSpeech: "noun" },
  ];

  for (const item of englishItems) {
    const existing = await prisma.vocabularyItem.findFirst({
      where: {
        languageId: english.id,
        term: item.term,
      },
    });

    if (!existing) {
      await prisma.vocabularyItem.create({
        data: {
          languageId: english.id,
          term: item.term,
          meaning: item.meaning,
          partOfSpeech: item.partOfSpeech,
          status: "PUBLISHED",
          metadata: { demo: true },
        },
      });
    }
  }

  const chineseItems = [
    { term: "学习", hanzi: "学习", pinyin: "xuéxí", meaning: "học tập" },
    {
      term: "学生",
      hanzi: "学生",
      pinyin: "xuésheng",
      meaning: "học sinh, sinh viên",
    },
    {
      term: "老师",
      hanzi: "老师",
      pinyin: "lǎoshī",
      meaning: "giáo viên",
    },
  ];

  for (const item of chineseItems) {
    const existing = await prisma.vocabularyItem.findFirst({
      where: {
        languageId: chinese.id,
        term: item.term,
      },
    });

    if (!existing) {
      await prisma.vocabularyItem.create({
        data: {
          languageId: chinese.id,
          term: item.term,
          hanzi: item.hanzi,
          pinyin: item.pinyin,
          meaning: item.meaning,
          status: "PUBLISHED",
          metadata: { demo: true },
        },
      });
    }
  }
}

async function seedDemoQuestion() {
  const english = await prisma.language.findUniqueOrThrow({
    where: { code: "en" },
  });

  const prompt =
    "A student wants to improve concentration while studying. Which action is most likely to reduce interruptions?";

  const existing = await prisma.question.findFirst({
    where: { prompt },
  });

  if (existing) return;

  const question = await prisma.question.create({
    data: {
      languageId: english.id,
      questionType: "MULTIPLE_CHOICE",
      difficulty: "EASY",
      prompt,
      content: {
        source: "original-development-content",
      },
      answerKey: {
        optionKey: "B",
      },
      explanation: {
        text: "Removing a frequent source of notifications can reduce interruptions.",
      },
      status: "PUBLISHED",
      version: 1,
    },
  });

  const options = [
    ["A", "Keep several chat applications open.", false],
    ["B", "Put the phone in another room.", true],
    ["C", "Change study topics every two minutes.", false],
    ["D", "Play multiple videos at once.", false],
  ] as const;

  for (const [key, text, isCorrect] of options) {
    await prisma.questionOption.create({
      data: {
        questionId: question.id,
        optionKey: key,
        content: { text },
        position: key.charCodeAt(0) - 64,
        isCorrect,
        metadata: {},
      },
    });
  }
}

async function main() {
  console.log("Seeding essential catalog...");

  await seedRoles();
  await seedLanguages();
  await seedSkills();

  const { ielts, hsk } = await seedExams();
  const { ieltsVersion, hskVersion } = await seedExamVersions(
    ielts.id,
    hsk.id,
  );

  await seedLevels(ieltsVersion.id, hskVersion.id);
  await seedExamSkills(ieltsVersion.id, hskVersion.id);

  if (process.env.SEED_DEMO_DATA !== "false") {
    console.log("Seeding development demo data...");

    await seedDemoCourses(
      ielts.id,
      hsk.id,
      ieltsVersion.id,
      hskVersion.id,
    );

    await seedDemoVocabulary();
    await seedDemoQuestion();
  }

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
