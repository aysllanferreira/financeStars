import { Module } from '@nestjs/common';
import { AwsCognitoStrategy } from './strategies/aws-cognito.strategy';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AwsCognitoStrategy, AuthGuard, AuthService],
  exports: [AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
