import { Injectable } from '@nestjs/common';
import { TwitchService } from '../../services/twitch/twitch.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private twitchService: TwitchService,
  ) {}

  async getGames() {
    const games = await this.prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    return games;
  }

  async requestAndStoreGames() {
    const games = await this.twitchService.getTwitchTopGames();

    await Promise.all(
      games.map(async (game) => {
        await this.prisma.game.create({ data: game });
      }),
    );
  }
}
