import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body): Promise<any> {
    const { email, password } = body;
    return this.authService.signUp(email, password);
  }

  @Post('confirmation')
  async confirmSignUp(@Body() body): Promise<any> {
    const { email, code } = body;
    return this.authService.confirmSignUp(email, code);
  }

  @Post('signin')
  async signIn(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { email, password } = body;

    const token = await this.authService.signIn(email, password);
    console.log(token);

    // Send cookies in the header
    response.setHeader('Set-Cookie', [
      `id_token=${token}; HttpOnly; Max-Age=2592000; Path=/; SameSite=Lax`,
    ]);
    return { status: 'success' };
  }

  @Post('auth0')
  async authO(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { token } = body;

    response.setHeader('Set-Cookie', [
      `id_token=${token}; HttpOnly; Max-Age=2592000; Path=/; SameSite=Lax`,
    ]);
    return { status: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req): Promise<any> {
    const jwtToken = req.cookies['id_token'];
    const user = await this.authService.validateTokenAndGetUser(jwtToken);
    return user;
  }
}
