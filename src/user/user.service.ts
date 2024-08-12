import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getAllUsers() {
    const users = await this.db.user.findMany({});

    if (!users)
      throw new ForbiddenException(
        'Нет пользователей',
      );

    return users;
  }

  async getUser(userId: number) {
    const user = await this.db.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        login: true,
        email: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            serviceTitle: true,
            clientTask: true,
          },
        },
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Нет пользователя',
      );

    return user;
  }
}
