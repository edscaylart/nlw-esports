import { Controller, Get, Param } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('/ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('/')
  async getAds() {
    return this.adsService.getAds();
  }

  @Get('/:id/discord')
  async getDiscord(@Param('id') id: string) {
    return this.adsService.getAdDiscord(id);
  }
}
