import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from 'src/config/env.config';
import { ITokenPayload } from 'src/types/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies[ENV.JWT.COOKIE_NAME],
      ]),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT.SECRET,
    });
  }

  async validate(payload: ITokenPayload): Promise<ITokenPayload> {
    const { id, provider } = payload;

    return { id, provider };
  }
}
