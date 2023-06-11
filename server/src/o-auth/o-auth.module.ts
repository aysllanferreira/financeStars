import { Module } from '@nestjs/common';
import { OAuthService } from './o-auth.service';
import { OAuthController } from './o-auth.controller';

@Module({
  providers: [OAuthService],
  controllers: [OAuthController]
})
export class OAuthModule {}
