// src/auth/strategies/auth0.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { VerifyCallback } from 'passport-jwt';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_BASE_URL,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: process.env.AUTH0_SCOPE_ID,
    });
  }

  async validate(payload: any, done: VerifyCallback): Promise<any> {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }
    return done(null, payload);
  }
}
