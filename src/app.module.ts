// src/app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { TelegramBotModule } from './telegram-bot.module';
import { AuthController } from './auth.controller';
import { AdminController } from './admin.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({}),
    ScheduleModule.forRoot(),
    TelegramBotModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController, AdminController],
  providers: [GoogleStrategy],
})
export class AppModule { }
