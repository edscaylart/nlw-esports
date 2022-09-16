import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { convertHourStringToMinutes } from '../../utils/convert-hour-string-to-minutes';
import { convertMinutesStringToHour } from '../../utils/convert-minutes-string-to-hour';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateAds } from './create-ads.validator';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async getAds() {
    return [{ id: 1 }];
  }

  async getAdByGameId(gameId: string) {
    const ads = await this.prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourEnd: true,
        hourStart: true,
      },
      where: { gameId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ads.map((ad) => ({
      ...ad,
      hourStart: convertMinutesStringToHour(ad.hourStart),
      hourEnd: convertMinutesStringToHour(ad.hourEnd),
      weekDays: ad.weekDays.split(','),
    }));
  }

  async getAdDiscord(adId: string) {
    return this.prisma.ad.findUniqueOrThrow({
      select: { discord: true },
      where: { id: adId },
    });
  }

  async createAdByGameId(gameId: string, adData: z.infer<typeof CreateAds>) {
    return this.prisma.ad.create({
      data: {
        ...adData,
        hourStart: convertHourStringToMinutes(adData.hourStart),
        hourEnd: convertHourStringToMinutes(adData.hourEnd),
        weekDays: adData.weekDays.join(','),
        gameId,
      },
    });
  }
}
