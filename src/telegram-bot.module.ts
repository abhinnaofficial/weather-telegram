// src/telegram-bot.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { HttpModule } from '@nestjs/axios';  // Import HttpModule here
import { WeatherService } from './weather.service';
import { TelegramBotService } from './telegram-bot.service';

@Module({
    imports: [HttpModule.register({}), ScheduleModule.forRoot()],
    providers: [
        WeatherService,
        {
            provide: Telegraf,
            useValue: new Telegraf('6705195195:AAGCJeYIkCbdq_AHdDjmWfNsJ_qUP5t2Zd0'),
        },
        TelegramBotService,
    ],
    exports: [TelegramBotService],
})
export class TelegramBotModule { }
