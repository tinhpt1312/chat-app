import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ENV } from 'src/config';
import { GoogleProfile } from 'src/types/auth.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: ENV.GOOGLE.CLIENT_ID,
      clientSecret: ENV.GOOGLE.CLIENT_SECRET,
      callbackURL: ENV.GOOGLE.CLIENT_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile,
    done: VerifyCallback,
  ) {
    const payload: GoogleProfile = {
      username: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0]?.value,
      provider: profile.provider,
    };

    return done(null, payload);
  }
}
