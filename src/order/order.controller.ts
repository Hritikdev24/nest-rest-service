import { Body, Controller, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { Authorization } from 'src/authorization/authorization.guard';
import { Post } from '@nestjs/common';
import { OrderDto } from './order-dto/orderDto';
import { PaymentDto } from './order-dto/paymentDto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(Authorization)
@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create-order')
  @ApiOperation({ summary: 'Create order', description: 'Create a new order for the current user' })
  @ApiBody({ type: OrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createOrder(@Req() req, @Body() orderData: OrderDto) {
    const orderPayload = {
      ...orderData,
      userId: req.user.userId,
    };

    return this.orderService.createOrder(orderPayload);
  }

  @Post("/buy-now")
  buyNow(@Req() req, @Body() orderData:OrderDto){
    const orderPayload = {
      ...orderData,
      userId: req.user.userId,
    };

    return this.orderService.buyNow(orderPayload);
  }

  @Post('/make-payment')
  @ApiOperation({ summary: 'Make payment', description: 'Make a payment for the current user' })
  @ApiBody({ type: PaymentDto })
  @ApiResponse({ status: 201, description: 'Payment processed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  makePayment(@Body() paymentData: PaymentDto, @Req() req) {
    const paymentPayload = {
      ...paymentData,
      userId: req.user.userId,
    };

    return this.orderService.makePayment(paymentPayload);
  }
}
