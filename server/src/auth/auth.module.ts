import { Module } from '@nestjs/common';
import { AwsCognitoStrategy } from './strategies/aws-cognito.strategy';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [AwsCognitoStrategy, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
