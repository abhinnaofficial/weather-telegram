// src/google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '669282121068-4ag11c0jjt8tfu36duc90hn20nqj390s.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const user = { userId: profile.id, email: profile.emails[0].value, name: profile.displayName };
        return done(null, user);
    }
}
