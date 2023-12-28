// src/auth.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        const token = req.user;
        if (token) {
            res.cookie('auth_token', JSON.stringify(token));
            res.redirect('http://localhost:3000/admin'); // Redirect to the admin panel
        } else {
            res.redirect('http://localhost:3000/'); // Redirect to the home page if authentication fails
        }
    }
}
