import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramBotService } from './telegram-bot.service';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const telegramBotService = app.get(TelegramBotService);

  // Express application
  const expressApp = express();

  // static assets (if you have any)
  expressApp.use('/static', express.static(path.join(__dirname, 'public')));

  // the views folder and use EJS as the view engine
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'ejs');

  // webhook endpoint
  expressApp.use(`/webhuk`, express.json());
  expressApp.post(`/webhuk`, (req, res) => {
    telegramBotService.bot.handleUpdate(req.body);
    res.sendStatus(200);
  });

  expressApp.listen(3000, () => {
    console.log('Telegram bot webhook is listening on port 3000');
  });
}

bootstrap();
