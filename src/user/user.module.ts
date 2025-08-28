import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user-entity/userSchema';
@Module({
  imports:[MongooseModule.forFeature([{name:"userModel",schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,MongooseModule]
})
export class UserModule {}
