const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFileIfNotExist(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  }
}

console.log('--- Starting Project Scaffolding ---');

// 1. ROOT FILES
writeFileIfNotExist(path.join(ROOT_DIR, 'package.json'), JSON.stringify({
  "name": "language-learning-platform",
  "private": true,
  "version": "1.0.0",
  "description": "Nền tảng học và luyện thi ngoại ngữ trực tuyến IELTS + HSK",
  "workspaces": [
    "frontend",
    "backend",
    "shared/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,json,md}\"",
    "prisma:generate": "npm run prisma:generate --workspace=backend",
    "prisma:migrate": "npm run prisma:migrate --workspace=backend",
    "prisma:seed": "npm run prisma:seed --workspace=backend"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "prettier": "^3.5.2",
    "typescript": "^5.7.3"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'turbo.json'), JSON.stringify({
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, '.gitignore'), `
node_modules
.next
dist
build
.turbo
*.log
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.DS_Store
coverage
`);

writeFileIfNotExist(path.join(ROOT_DIR, '.env.example'), `
# Root environment reference
PORT=4000
FRONTEND_PORT=3000
NODE_ENV=development
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'docker-compose.yml'), `
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: llp-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: language_learning_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: llp-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
`);

// 2. SHARED PACKAGES
// 2.1 shared/types
writeFileIfNotExist(path.join(ROOT_DIR, 'shared/types/package.json'), JSON.stringify({
  "name": "@shared/types",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/types/tsconfig.json'), JSON.stringify({
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/types/src/index.ts'), `
export type Role = 'GUEST' | 'STUDENT' | 'CONTENT_MANAGER' | 'TEACHER_REVIEWER' | 'ADMIN';

export type ExamType = 'IELTS' | 'HSK' | 'CUSTOM';
export type SkillType = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING' | 'VOCABULARY' | 'GRAMMAR';

export type SubmissionStatus = 'PENDING' | 'IN_REVIEW' | 'REVIEWED' | 'REJECTED';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type AccessGrantSource = 'PURCHASE' | 'PACKAGE' | 'TRIAL' | 'ADMIN';

export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    requestId?: string;
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId?: string;
  };
}
`);

// 2.2 shared/constants
writeFileIfNotExist(path.join(ROOT_DIR, 'shared/constants/package.json'), JSON.stringify({
  "name": "@shared/constants",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/constants/tsconfig.json'), JSON.stringify({
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/constants/src/index.ts'), `
export const API_VERSION = 'v1';
export const API_BASE_PREFIX = '/api/v1';

export const ERROR_CODES = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_ACCOUNT_SUSPENDED: 'AUTH_ACCOUNT_SUSPENDED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  COURSE_ACCESS_DENIED: 'COURSE_ACCESS_DENIED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  PUBLIC_CONTENT: 'public-content',
  LESSON_MEDIA: 'lesson-media',
  SPEAKING_SUBMISSIONS: 'speaking-submissions',
  RESOURCES: 'resources',
  CERTIFICATES: 'certificates',
} as const;
`);

// 2.3 shared/api-contracts
writeFileIfNotExist(path.join(ROOT_DIR, 'shared/api-contracts/package.json'), JSON.stringify({
  "name": "@shared/api-contracts",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "@shared/types": "*"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/api-contracts/tsconfig.json'), JSON.stringify({
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'shared/api-contracts/src/index.ts'), `
import { ApiResponse, Role } from '@shared/types';

export interface UserProfileDto {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  locale: string;
  roles: Role[];
}

export type MeResponse = ApiResponse<UserProfileDto>;
`);

// 3. BACKEND (NestJS)
writeFileIfNotExist(path.join(ROOT_DIR, 'backend/package.json'), JSON.stringify({
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate --schema=prisma/schema.prisma",
    "prisma:migrate": "prisma migrate dev --schema=prisma/schema.prisma",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/platform-socket.io": "^11.0.1",
    "@nestjs/swagger": "^11.0.3",
    "@nestjs/websockets": "^11.0.1",
    "@prisma/client": "^6.4.1",
    "@shared/api-contracts": "*",
    "@shared/constants": "*",
    "@shared/types": "*",
    "@supabase/supabase-js": "^2.49.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.7",
    "ioredis": "^5.6.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "socket.io": "^4.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.13.4",
    "@types/passport-jwt": "^4.0.1",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "prisma": "^6.4.1",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/tsconfig.json'), JSON.stringify({
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["../shared/*/src"]
    }
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/nest-cli.json'), JSON.stringify({
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/.env.example'), `
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/language_learning_db?schema=public"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_JWT_SECRET="your-jwt-secret"

# Redis
REDIS_URL="redis://localhost:6379"

# Storage
STORAGE_BUCKET_AVATARS="avatars"
STORAGE_BUCKET_MEDIA="lesson-media"
STORAGE_BUCKET_SPEAKING="speaking-submissions"

# AI / External
LLM_API_KEY=""
LLM_BASE_URL=""
`);

// Copy schema.prisma and seed.ts from documents if not existing
const docPrismaPath = path.join(ROOT_DIR, 'documents/schema.prisma');
const docSeedPath = path.join(ROOT_DIR, 'documents/seed.ts');
const targetPrismaPath = path.join(ROOT_DIR, 'backend/prisma/schema.prisma');
const targetSeedPath = path.join(ROOT_DIR, 'backend/prisma/seed.ts');

ensureDir(path.join(ROOT_DIR, 'backend/prisma'));
if (fs.existsSync(docPrismaPath)) {
  fs.copyFileSync(docPrismaPath, targetPrismaPath);
}
if (fs.existsSync(docSeedPath)) {
  fs.copyFileSync(docSeedPath, targetSeedPath);
}

// Backend core files
writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/main.ts'), `
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Web Học Ngoại Ngữ API')
    .setDescription('API documentation for IELTS + HSK Learning Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(\`Backend server running on: http://localhost:\${port}/api/v1\`);
}
bootstrap();
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/app.module.ts'), `
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { TestsModule } from './modules/tests/tests.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { ProgressModule } from './modules/progress/progress.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RealtimeModule } from './modules/realtime/realtime.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
    TestsModule,
    AssessmentsModule,
    VocabularyModule,
    ProgressModule,
    SubmissionsModule,
    ReviewsModule,
    OrdersModule,
    PaymentsModule,
    NotificationsModule,
    RealtimeModule,
  ],
})
export class AppModule {}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/database/database.module.ts'), `
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/database/prisma.service.ts'), `
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/health/health.module.ts'), `
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'backend/src/health/health.controller.ts'), `
import { Controller, GET } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @GET()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Web Học Ngoại Ngữ Backend API',
    };
  }
}
`);

// Backend modules placeholder folders & basic module files
const backendModules = [
  'auth', 'users', 'roles', 'languages', 'exams', 'levels', 'skills',
  'courses', 'modules', 'lessons', 'learning-materials', 'enrollments',
  'exercises', 'question-bank', 'tests', 'assessments', 'learning-goals',
  'learning-paths', 'study-plans', 'progress', 'vocabulary', 'submissions',
  'reviews', 'packages', 'orders', 'payments', 'coupons', 'certificates',
  'cms', 'notifications', 'search', 'media', 'analytics', 'activity',
  'audit', 'realtime', 'ai'
];

backendModules.forEach((mod) => {
  const modDir = path.join(ROOT_DIR, `backend/src/modules/${mod}`);
  ensureDir(modDir);
  const className = mod.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  writeFileIfNotExist(path.join(modDir, `${mod}.module.ts`), `
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class ${className}Module {}
`);
  writeFileIfNotExist(path.join(modDir, 'index.ts'), `
export * from './${mod}.module';
`);
});

// Config files in backend
const backendConfigs = ['app', 'auth', 'database', 'supabase', 'redis', 'storage', 'email', 'payment', 'ai'];
backendConfigs.forEach(cfg => {
  writeFileIfNotExist(path.join(ROOT_DIR, `backend/src/config/${cfg}.config.ts`), `
export const ${cfg}Config = () => ({
  // ${cfg} configuration
});
`);
});

// Common backend folders
['decorators', 'guards', 'interceptors', 'filters', 'pipes', 'middleware', 'exceptions', 'error-codes', 'constants', 'logger', 'utils'].forEach(dir => {
  ensureDir(path.join(ROOT_DIR, `backend/src/common/${dir}`));
});

// Integrations backend folders
['supabase', 'redis', 'storage', 'email', 'payment', 'ai'].forEach(dir => {
  ensureDir(path.join(ROOT_DIR, `backend/src/integrations/${dir}`));
});

// Events & Jobs
ensureDir(path.join(ROOT_DIR, 'backend/src/events/handlers'));
ensureDir(path.join(ROOT_DIR, 'backend/src/jobs/queues'));
ensureDir(path.join(ROOT_DIR, 'backend/src/jobs/processors'));
ensureDir(path.join(ROOT_DIR, 'backend/src/jobs/schedules'));
ensureDir(path.join(ROOT_DIR, 'backend/test/unit'));
ensureDir(path.join(ROOT_DIR, 'backend/test/integration'));
ensureDir(path.join(ROOT_DIR, 'backend/test/e2e'));


// 4. FRONTEND (Next.js)
writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/package.json'), JSON.stringify({
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.0",
    "@shared/api-contracts": "*",
    "@shared/constants": "*",
    "@shared/types": "*",
    "@supabase/supabase-js": "^2.49.1",
    "@tanstack/react-query": "^5.66.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "next": "15.1.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "socket.io-client": "^4.8.1",
    "tailwind-merge": "^3.0.1",
    "zod": "^3.24.2",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/tsconfig.json'), JSON.stringify({
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../shared/*/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}, null, 2));

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/next.config.ts'), `
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared/types", "@shared/constants", "@shared/api-contracts"],
};

export default nextConfig;
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/postcss.config.mjs'), `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/tailwind.config.ts'), `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A6D1FD", // Sky Glass
          light: "#D8EBFE",
          dark: "#68A5E8",
        },
        brand: {
          dark: "#2B1572", // Deep Purple
          purple: "#4622A3",
        },
        ai: {
          DEFAULT: "#A000C8", // Magenta
        },
        status: {
          success: "#358200",
          error: "#C40000",
          warning: "#A35A00",
        },
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
    },
  },
  plugins: [],
};
export default config;
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/.env.local.example'), `
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/src/app/globals.css'), `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-sky: #A6D1FD;
  --brand-deep: #2B1572;
  --ai-magenta: #A000C8;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.4);
}

body {
  color: var(--brand-deep);
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 50%, #fdf8ff 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Glassmorphism utility classes */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(43, 21, 114, 0.08);
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/src/app/layout.tsx'), `
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Web Học Ngoại Ngữ — IELTS & HSK Learning Platform",
  description: "Nền tảng học và luyện thi trực tuyến chuyên sâu cho IELTS và HSK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-primary selection:text-brand-dark">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/src/app/(public)/page.tsx'), `
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="glass-panel p-12 rounded-3xl max-w-3xl w-full">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/40 text-brand-dark font-semibold text-sm mb-4 border border-primary/60">
          Nền tảng học ngoại ngữ thế hệ mới
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark mb-6 tracking-tight">
          Chinh phục <span className="text-blue-600">IELTS</span> & <span className="text-red-500">HSK</span> theo lộ trình cá nhân hóa
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Đánh giá trình độ đầu vào, luyện tập 4 kỹ năng toàn diện với AI và nhận phản hồi chi tiết từ giáo viên.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="px-6 py-3.5 rounded-xl bg-brand-dark text-white font-medium shadow-lg hover:bg-brand-purple transition-all duration-200"
          >
            Khám phá khóa học
          </Link>
          <Link
            href="/placement-test"
            className="px-6 py-3.5 rounded-xl glass-card text-brand-dark font-medium border border-primary hover:bg-white transition-all duration-200"
          >
            Làm bài test trình độ
          </Link>
        </div>
      </div>
    </main>
  );
}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/src/providers/query-provider.tsx'), `
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
`);

writeFileIfNotExist(path.join(ROOT_DIR, 'frontend/src/lib/api/client.ts'), `
import { API_BASE_PREFIX } from '@shared/constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || \`http://localhost:4000\${API_BASE_PREFIX}\`;

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : \`\${BASE_URL}\${endpoint.startsWith('/') ? '' : '/'}\${endpoint}\`;
  
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || \`HTTP error! status: \${response.status}\`);
  }

  return response.json();
}
`);

// Frontend Features
const frontendFeatures = [
  'auth', 'users', 'courses', 'modules', 'lessons', 'learning-materials',
  'exercises', 'question-bank', 'tests', 'assessments', 'learning-goals',
  'learning-path', 'study-plan', 'progress', 'vocabulary', 'ielts', 'hsk',
  'writing', 'speaking', 'submissions', 'reviews', 'packages', 'orders',
  'payments', 'coupons', 'certificates', 'articles', 'resources',
  'notifications', 'analytics', 'search', 'media', 'ai'
];

frontendFeatures.forEach(feature => {
  const featureDir = path.join(ROOT_DIR, `frontend/src/features/${feature}`);
  ensureDir(path.join(featureDir, 'components'));
  ensureDir(path.join(featureDir, 'api'));
  ensureDir(path.join(featureDir, 'hooks'));
  ensureDir(path.join(featureDir, 'types'));
  writeFileIfNotExist(path.join(featureDir, 'index.ts'), `
export * from './types';
`);
  writeFileIfNotExist(path.join(featureDir, 'types/index.ts'), `
export interface ${feature.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}State {}
`);
});

// App route folders in frontend
const appRoutes = [
  '(public)/courses',
  '(public)/packages',
  '(public)/trial',
  '(public)/placement-test',
  '(public)/articles',
  '(public)/resources',
  '(public)/about',
  '(public)/contact',
  '(auth)/login',
  '(auth)/register',
  '(auth)/verify-email',
  '(auth)/forgot-password',
  '(auth)/reset-password',
  '(student)/dashboard',
  '(student)/my-courses',
  '(student)/learning',
  '(student)/lesson',
  '(student)/practice',
  '(student)/exams',
  '(student)/test',
  '(student)/results',
  '(student)/progress',
  '(student)/vocabulary',
  '(student)/learning-path',
  '(student)/study-plan',
  '(student)/submissions',
  '(student)/certificates',
  '(student)/orders',
  '(student)/notifications',
  '(student)/profile',
  '(reviewer)/review/queue',
  '(reviewer)/submissions',
  '(admin)/admin/students',
  '(admin)/admin/courses',
  '(admin)/admin/modules',
  '(admin)/admin/lessons',
  '(admin)/admin/exercises',
  '(admin)/admin/question-bank',
  '(admin)/admin/tests',
  '(admin)/admin/vocabulary',
  '(admin)/admin/submissions',
  '(admin)/admin/articles',
  '(admin)/admin/resources',
  '(admin)/admin/packages',
  '(admin)/admin/orders',
  '(admin)/admin/coupons',
  '(admin)/admin/certificates',
  '(admin)/admin/analytics',
  '(admin)/admin/audit',
  '(admin)/admin/settings',
];

appRoutes.forEach(route => {
  ensureDir(path.join(ROOT_DIR, `frontend/src/app/${route}`));
});

// Components directories
['ui', 'layout', 'feedback', 'data-display', 'forms', 'charts'].forEach(dir => {
  ensureDir(path.join(ROOT_DIR, `frontend/src/components/${dir}`));
});

// Hooks, Lib, Providers, Config, Constants, Types
['use-debounce.ts', 'use-media-query.ts', 'use-click-outside.ts', 'use-keyboard-shortcut.ts', 'use-microphone.ts', 'use-websocket.ts'].forEach(hook => {
  writeFileIfNotExist(path.join(ROOT_DIR, `frontend/src/hooks/${hook}`), `
export const ${hook.replace('.ts', '').replace(/-([a-z])/g, g => g[1].toUpperCase())} = () => {};
`);
});

['env.ts', 'navigation.ts', 'feature-flags.ts', 'app.config.ts'].forEach(cfg => {
  writeFileIfNotExist(path.join(ROOT_DIR, `frontend/src/config/${cfg}`), `
export const ${cfg.replace('.ts', '').replace(/-([a-z])/g, g => g[1].toUpperCase())} = {};
`);
});

['routes.ts', 'query-keys.ts', 'storage-keys.ts', 'app.constants.ts'].forEach(cnst => {
  writeFileIfNotExist(path.join(ROOT_DIR, `frontend/src/constants/${cnst}`), `
export const ${cnst.replace('.ts', '').toUpperCase().replace('-', '_')} = {};
`);
});

['common.types.ts', 'auth.types.ts', 'pagination.types.ts', 'api.types.ts'].forEach(tp => {
  writeFileIfNotExist(path.join(ROOT_DIR, `frontend/src/types/${tp}`), `
export interface ${tp.replace('.types.ts', '').charAt(0).toUpperCase() + tp.replace('.types.ts', '').slice(1)}Type {}
`);
});

// Infrastructure & Public & Tests folders
ensureDir(path.join(ROOT_DIR, 'frontend/public/images'));
ensureDir(path.join(ROOT_DIR, 'frontend/public/icons'));
ensureDir(path.join(ROOT_DIR, 'frontend/public/audio'));
ensureDir(path.join(ROOT_DIR, 'frontend/tests/unit'));
ensureDir(path.join(ROOT_DIR, 'frontend/tests/component'));
ensureDir(path.join(ROOT_DIR, 'frontend/tests/e2e'));

console.log('--- Project Scaffolding Finished Successfully ---');
