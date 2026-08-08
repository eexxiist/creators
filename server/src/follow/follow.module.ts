import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  imports: [PrismaModule],
})
export class FollowModule {}
