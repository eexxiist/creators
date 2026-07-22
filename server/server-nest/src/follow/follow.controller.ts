import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(AuthGuard)
  @Post(':creatorId')
  async createFollow(
    @Param('creatorId') creatorId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;

    return this.followService.createFollow(userId, creatorId);
  }

  @UseGuards(AuthGuard)
  @Delete(':creatorId')
  async deleteFollow(
    @Param('creatorId') creatorId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    return this.followService.deleteFollow(userId, creatorId);
  }

  @Get(':userId')
  async getFollowCounts(@Param('userId') userId: string) {
    return this.followService.getFollowCounts(userId);
  }
}
