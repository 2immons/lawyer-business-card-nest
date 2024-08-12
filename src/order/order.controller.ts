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

  @UseGuards(AuthGuard('jwt'))
  @Post('create-order')
  createOrder(@Body() createOrderDto: OrderDto) {
    return this.orderService.createOrder(
      createOrderDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllUsers() {
    return this.orderService.getAllOrders();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('order/:id')
  getOrder(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.orderService.getOrder(userId);
  }
}
