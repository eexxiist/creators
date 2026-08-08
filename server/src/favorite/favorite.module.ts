import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
  imports: [PrismaModule],
})
export class FavoriteModule {}
