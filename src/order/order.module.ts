import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order-entity/orderSchema';
import { PaymentSchema } from './order-entity/paymentSchema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'orderModel', schema: OrderSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'paymentModel', schema: PaymentSchema },
    ]),

    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret:"Hritik@11",
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
