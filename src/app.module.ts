import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { FormsModule } from './forms/forms.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        UsersModule,
        AccountModule,
        FormsModule,
        FeedbacksModule,
    ],
})
export class AppModule {}
