import { Module } from '@nestjs/common';
import { AwsCognitoStrategy } from './strategies/aws-cognito.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  providers: [JwtAuthGuard, AwsCognitoStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
