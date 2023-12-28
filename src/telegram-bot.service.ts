// src/telegram-bot.service.ts
import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from './weather.service';

@Injectable()
export class TelegramBotService {
    public bot: Telegraf<Context>;
    public subscribedUsers: Record<string, string[]> = {};

    constructor(private readonly weatherService: WeatherService) {
        this.bot = new Telegraf('6705195195:AAGCJeYIkCbdq_AHdDjmWfNsJ_qUP5t2Zd0');
        this.setupCommands();
        this.startBot();
    }

    private setupCommands() {
        this.bot.command('start', (ctx) => ctx.reply('Welcome! Type /subscribe <city> to get daily weather updates.'));
        this.bot.command('subscribe', async (ctx) => {
            const commandArgs = ctx.message.text.split(' ').slice(1);
            const city = commandArgs.join(' ');

            if (!city) {
                return ctx.reply('Please provide a city. Example: /subscribe London');
            }

            this.subscribeUser(ctx.message.chat.id.toString(), city);
            return ctx.reply(`Subscribed for daily weather updates in ${city}.`);
        });

        this.bot.command('unsubscribe', async (ctx) => {
            const commandArgs = ctx.message.text.split(' ').slice(1);
            const city = commandArgs.join(' ');

            if (!city) {
                return ctx.reply('Please provide a city. Example: /unsubscribe London');
            }

            this.unsubscribeUser(ctx.message.chat.id.toString(), city);
            return ctx.reply(`Unsubscribed from daily weather updates in ${city}.`);
        });

        // immediate weather update
        this.bot.command('update', async (ctx) => {
            const commandArgs = ctx.message.text.split(' ').slice(1);
            const city = commandArgs.join(' ');

            if (!city) {
                return ctx.reply('Please provide a city. Example: /update London');
            }

            await this.sendWeatherUpdateOnDemand(ctx.message.chat.id.toString(), city);
        });
    }

    public startBot() {
        const webhookUrl = 'https://0094-2405-201-a41b-1813-7ca5-1bfd-faaa-a36f.ngrok-free.app/webhuk';


        this.bot.telegram.setWebhook(webhookUrl);
        console.log(`Telegram bot started with webhook at ${webhookUrl}`);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async sendDailyWeatherUpdates() {
        for (const chatId of Object.keys(this.subscribedUsers)) {
            for (const city of this.subscribedUsers[chatId]) {
                try {
                    const weatherUpdate = await this.weatherService.getWeather(city).toPromise();
                    await this.sendMessage(chatId, weatherUpdate);
                } catch (error) {
                    console.error(`Error sending weather update for ${city}:`, error);
                }
            }
        }
    }

    public async sendWeatherUpdateOnDemand(chatId: string, city: string) {
        try {
            const weatherUpdate = await this.weatherService.getWeather(city).toPromise();
            console.log(`Sending immediate weather update for ${city} to user ${chatId}: ${weatherUpdate}`);
            await this.sendMessage(chatId, weatherUpdate);
        } catch (error) {
            console.error(`Error sending immediate weather update for ${city}:`, error);
        }
    }

    public subscribeUser(chatId: string, city: string) {
        if (!this.subscribedUsers[chatId]) {
            this.subscribedUsers[chatId] = [];
        }
        this.subscribedUsers[chatId].push(city);
    }

    public unsubscribeUser(chatId: string, city: string) {
        if (this.subscribedUsers[chatId]) {
            this.subscribedUsers[chatId] = this.subscribedUsers[chatId].filter((c) => c !== city);
        }
    }

    public async sendMessage(chatId: string, text: string) {
        await this.bot.telegram.sendMessage(chatId, text);
    }
}
