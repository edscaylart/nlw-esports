import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdsController } from './modules/ads/ads.controller';
import { AdsService } from './modules/ads/ads.service';
import { GameController } from './modules/game/game.controller';
import { GameService } from './modules/game/game.service';
import { PrismaService } from './services/prisma/prisma.service';
import { TwitchService } from './services/twitch/twitch.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register(),
    HttpModule,
  ],
  controllers: [AdsController, GameController],
  providers: [AdsService, GameService, TwitchService, PrismaService],
})
export class AppModule {}
