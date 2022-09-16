import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdsService } from '../ads/ads.service';
import { CreateAds } from '../ads/create-ads.validator';
import { GameService } from './game.service';
import { z } from 'zod';

@Controller('/games')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly adService: AdsService,
  ) {}

  @Get('/')
  async getGames() {
    const games = await this.gameService.getGames();

    if (games.length === 0) {
      await this.gameService.requestAndStoreGames();
      return this.gameService.getGames();
    }

    return games;
  }

  @Get('/:id/ads')
  async getAds(@Param('id') gameId: string) {
    return this.adService.getAdByGameId(gameId);
  }

  @Post('/:id/ads')
  async createAd(
    @Param('id') gameId: string,
    @Body() adData: z.infer<typeof CreateAds>,
  ) {
    return this.adService.createAdByGameId(gameId, adData);
  }
}
