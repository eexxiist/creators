import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    if (!roles) {
      return true;
    }

    if (roles.includes(userRole)) {
      return true;
    }

    return false;
  }
}
