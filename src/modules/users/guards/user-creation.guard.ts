import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class UserCreationGuard implements CanActivate {
  private readonly roleHierarchy = {
    [Role.ADMIN]: [Role.ADMIN, Role.STAFF, Role.MEMBER],
    [Role.STAFF]: [Role.MEMBER],
    [Role.MEMBER]: [],
  };

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request; // Usuario autenticado
    const { role: targetRole } = request.body; // Rol del usuario a crear

    if (!user || !targetRole) {
      return false;
    }

    const allowedRoles = this.roleHierarchy[user.role];

    if (!allowedRoles.includes(targetRole)) {
      throw new ForbiddenException(
        `Users with role ${user.role} cannot create users with role ${targetRole}`,
      );
    }

    return true;
  }
}
