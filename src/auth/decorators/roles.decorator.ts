import { SetMetadata } from '@nestjs/common';

export function Roles(role: string) {
  return SetMetadata('role', role);
}
