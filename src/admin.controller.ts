// src/admin.controller.ts

import { Controller, Get, Post, Render, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('admin')
export class AdminController {
    private botSettings = { apiKey: 'initialApiKey' };
    private users = [];

    @Get()
    @UseGuards(AuthGuard('google'))
    @Render('admin')
    admin() {
        return { title: 'Admin Panel', users: this.users };
    }

    @Post('update-bot-settings')
    updateBotSettings(@Req() req: Request) {
        const { apiKey } = req.body;
        this.botSettings.apiKey = apiKey;
        return { title: 'Admin Panel', users: this.users }; // Refresh the admin panel after updating settings
    }

    @Post('block-user')
    blockUser(@Req() req: Request) {
        const { userId } = req.body;

        return { title: 'Admin Panel', users: this.users }; // Refresh the admin panel after blocking user
    }

    @Post('delete-user')
    deleteUser(@Req() req: Request) {
        const { userId } = req.body;

        return { title: 'Admin Panel', users: this.users }; // Refresh the admin panel after deleting user
    }
}
