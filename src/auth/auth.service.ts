import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.db.user.findFirst({
      where: {
        login: authDto.login,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Нет такого пользователя',
      );

    const pwMatches = await argon.verify(
      user.hash,
      authDto.password,
    );

    if (!pwMatches)
      throw new ForbiddenException(
        'Неверные данные',
      );

    delete user.hash;
    return this.signToken(user.id, user.login, user.name);
  }

  async signup(authDto: AuthDto) {
    const hash = await argon.hash(
      authDto.password,
    );
    try {
      const user = await this.db.user.create({
        data: {
          login: authDto.login,
          name: authDto.name,
          hash: hash,
        },
      });

      delete user.hash;

      console.log(
        `Создан пользователь: ${user.login} с именем ${user.name}`
      );
      return this.signToken(user.id, user.login, user.name);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Данные не уникальны',
          );
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    login: string,
    name: string,
  ): Promise<{
    access_token: string;
    expires_in: string;
    display_name: string;
  }> {
    const payload = {
      sub: userId,
      login,
    };

    const secret = this.config.get('JWT_SECRET');

    const options = {
      expiresIn: '60m',
      secret: secret,
    };

    const token = await this.jwt.signAsync(
      payload,
      options,
    );

    return {
      access_token: token,
      expires_in: options.expiresIn,
      display_name: name
    };
  }
}
