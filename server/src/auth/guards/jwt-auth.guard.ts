import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('aws-cognito') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Get the token from the cookies
    const token = request.cookies['id_token'];

    // If there is a token, add it to the headers
    if (token && !request.headers.authorization) {
      request.headers.authorization = `Bearer ${token}`;
    }

    // Add your customized authentication logic here
    // For example, you can call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info): any {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
