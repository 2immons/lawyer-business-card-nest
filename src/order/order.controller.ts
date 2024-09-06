import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { OrderDto } from './dto';

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post('create-order')
  createOrder(@Body() createOrderDto: OrderDto) {
    return this.orderService.createOrder(
      createOrderDto,
    );
  }

  @Get('all')
  getAllUsers() {
    return this.orderService.getAllOrders();
  }

  @Get('order/:id')
  getOrder(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.orderService.getOrder(userId);
  }
}
