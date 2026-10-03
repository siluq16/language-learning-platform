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
