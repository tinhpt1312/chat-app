import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { comparePassword, hashPassword, IResponse } from 'src/shared/utils';
import {
  GoogleProfile,
  ITokenPayload,
  USER_RESPONSE,
  UserProvider,
} from 'src/types/auth.type';
import { ACCESS_TOKEN_NAME, COOKIE_OPTIONS } from 'src/constants';
import { ENV } from 'src/config/env.config';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async checkIfUserByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('u')
      .where('u.timestamp.deletedAt IS NULL')
      .where('u.email = :email', { email })
      .getOne();
  }

  async register(dto: RegisterDto) {
    const { email, password, username } = dto;

    const exitUser = await this.checkIfUserByEmail(email);

    if (exitUser) {
      throw new HttpException(
        USER_RESPONSE.NOT_EXIST_MESSAGE,
        USER_RESPONSE.NOT_EXIST_CODE,
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.save(
      this.userRepository.create({
        email,
        username,
        password: hashedPassword,
        provider: UserProvider.LOCAL,
        emailVerified: true,
      }),
    );

    return IResponse({
      statusCode: Number(USER_RESPONSE.CREATED_SUCCESS),
      message: String(USER_RESPONSE.CREATED_MESSAGE),
      data: user.id,
    });
  }

  async login(dto: LoginDto, res: Response) {
    const { email, password } = dto;

    const user = await this.checkIfUserByEmail(email);

    if (!user) {
      throw new HttpException(
        USER_RESPONSE.NOT_EXIST_MESSAGE,
        USER_RESPONSE.NOT_EXIST_CODE,
      );
    }

    const { password: hash } = user;

    const isMatch = await comparePassword(password, hash);

    if (!isMatch) {
      throw new HttpException(
        USER_RESPONSE.INVALID_MESSAGE,
        USER_RESPONSE.INVALID_CODE,
      );
    }

    if (!user.emailVerified) {
      throw new HttpException(
        USER_RESPONSE.EMAIL_NOT_VERIFIED_MESSAGE,
        USER_RESPONSE.EMAIL_NOT_VERIFIED_CODE,
      );
    }

    const payload = await this.createPayload(user.id, user.provider);

    const signToken = this.signToken(payload);

    res.cookie(ACCESS_TOKEN_NAME, signToken, COOKIE_OPTIONS);

    return IResponse({
      statusCode: Number(USER_RESPONSE.LOGIN_SUCCESS_CODE),
      message: String(USER_RESPONSE.LOGIN_SUCCESS_MESSAGE),
    });
  }

  async googleLoginCallback(req: Request, res: Response) {
    if (!req.user) {
      throw new HttpException(
        {
          code: USER_RESPONSE.GOOGLE_EXISTS_CODE,
          message: USER_RESPONSE.GOOGLE_EXISTS_MESSAGE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email, avatar, username, provider } = req.user as GoogleProfile;

    const user = await this.checkIfUserByEmail(email);

    try {
      const userId = user
        ? user.id
        : (
            await this.userRepository.save(
              this.userRepository.create({
                username,
                email,
                provider,
                avatar,
                emailVerified: true,
              }),
            )
          ).id;

      const payload = await this.createPayload(userId, provider);

      const signToken = this.signToken(payload);

      res.cookie(ACCESS_TOKEN_NAME, signToken, COOKIE_OPTIONS);

      res.redirect(ENV.URL_REDIRECT);
    } catch (error) {
      throw new HttpException(
        // USER_RESPONSE.GOOGLE_LOGIN_FAIL_MESSAGE,
        `Fail login google is message: ${error}`,
        USER_RESPONSE.GOOGLE_LOGIN_FAIL_CODE,
      );
    }
  }

  signToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: ENV.JWT.EXPIRES_IN,
      secret: ENV.JWT.SECRET,
    });
  }

  async createPayload(id: string, provider: string): Promise<ITokenPayload> {
    return {
      id,
      provider,
    };
  }
}
