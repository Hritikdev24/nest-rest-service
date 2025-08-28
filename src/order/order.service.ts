import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDoc } from './order-entity/orderSchema';
import { OrderDto } from './order-dto/orderDto';
import { PaymentDoc } from './order-entity/paymentSchema';
import { PaymentDto } from './order-dto/paymentDto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('orderModel') private readonly orderModel: Model<OrderDoc>,
    @InjectModel('paymentModel')
    private readonly paymentModel: Model<any>,
  ) {}

  async createOrder(orderData: OrderDto) {
    console.log("order data",orderData);
    const newOrder = await this.orderModel.create(orderData);
    return newOrder;
  }

  async makePayment(paymentData:PaymentDto) {  // use DTO here
    const { cartId } = paymentData;
  
    // Wrap plain object in Mongoose model to create a Document
    const createdPayment = new this.paymentModel(paymentData);
  
    // Delete cart if cartId exists
    if (cartId) {
      await this.orderModel.findByIdAndDelete(cartId);
    }
  
    // Save and return the created payment
    return await createdPayment.save();
  }
  
}
