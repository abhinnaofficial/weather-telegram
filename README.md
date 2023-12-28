# Telegram Bot with Admin Panel

This project is a NestJS application that integrates a Telegram bot with an admin panel.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/) (for local development with Telegram webhook)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/telegram-bot-admin-panel.git
   cd telegram-bot-admin-panel

2. Install dependencies:

   ```bash
   npm install

3. Configure Telegram Bot

    Create a new Telegram bot on BotFather.
    Copy the bot token.

4. Set Environment Variables

  Create a .env file in the project root and add the following:

   ```bash
   TELEGRAM_BOT_TOKEN=your_bot_token_here

5. Run the Application
  
    ```bash
    npm run start

  The application will run on http://localhost:3000.

6. Set Up ngrok (for local development)

    ```bash
    ngrok http 3000

  Copy the ngrok URL (e.g., https://your-ngrok-id.ngrok.io)

7. Set Webhook for Telegram Bot

  Use the Telegram Bot API to set the webhook:

    ```bash
    curl -F "url=https://your-ngrok-id.ngrok.io/webhook" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook

  Replace <YOUR_BOT_TOKEN> and your-ngrok-id with your bot token and ngrok ID.  

  Admin Panel

  Access the admin panel by visiting http://localhost:3000/admin in your browser.

  Contributing

  Feel free to contribute to this project by submitting issues or pull requests.
