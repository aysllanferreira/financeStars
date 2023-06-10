import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body): Promise<any> {
    const { email, password } = body;
    return this.authService.signUp(email, password);
  }

  @Post('signin')
  async signIn(@Body() body): Promise<any> {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
}
