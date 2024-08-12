import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtStrategy } from '../auth/strategy';

@Module({
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
})
export class OrderModule {}
