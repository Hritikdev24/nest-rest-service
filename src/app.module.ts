import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [UserModule,
    MongooseModule.forRoot('mongodb+srv://hritikgangadhar90:hritikgangadhar@cluster0.im4lb1c.mongodb.net/nestproject?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    OrderModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
