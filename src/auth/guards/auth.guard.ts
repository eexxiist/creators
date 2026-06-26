import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../utils/verifyToken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Нет доступа');
    }

    const token = authorization.split(' ')[1];

    try {
      const payload = verifyToken(token);

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
