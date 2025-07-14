import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schemas/auth-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: AuthUserSchema },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
