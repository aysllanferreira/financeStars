import { Module } from '@nestjs/common';
import { AwsCognitoStrategy } from './strategies/aws-cognito.strategy';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [AwsCognitoStrategy, AuthGuard, AuthService],
  exports: [AuthGuard],
})
export class AuthModule {}
