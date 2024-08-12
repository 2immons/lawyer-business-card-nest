import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class OrderService {
  constructor(private db: DbService) {}

  async createOrder(data: {
    userId: number;
    serviceTitle: string;
    clientTask: string;
    clientName?: string;
    clientContacts?: string;
    clientCity?: string;
  }) {
    try {
      console.log(data)
      const order = await this.db.order.create({
        data: {
          clientId: data.userId,
          serviceTitle: data.serviceTitle,
          clientTask: data.clientTask,
          clientName: data.clientName,
          clientContacts: data.clientContacts,
          clientCity: data.clientCity,
        }
      });

      return order;
    } catch (error) {
      throw new ForbiddenException(
        'Ошибка при создании заказа' + error,
      );
    }
  }

  async getAllOrders() {
    const users = await this.db.order.findMany(
      {},
    );

    if (!users)
      throw new ForbiddenException(
        'Нет пользователей',
      );

    return users;
  }

  async getOrder(userId: number) {
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
