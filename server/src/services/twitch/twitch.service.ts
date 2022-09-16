import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Game } from './game.interface';
import { TwitchGame } from './twitch.interface';

@Injectable()
export class TwitchService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  async getAppAccessToken() {
    const { data } = await this.httpService.axiosRef.post<{
      access_token: string;
      expires_in: number;
    }>('https://id.twitch.tv/oauth2/token', {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    await this.cacheManager.set('accessToken', data.access_token, {
      ttl: data.expires_in,
    });

    return data.access_token;
  }

  async getTwitchTopGames(): Promise<Game[]> {
    let appAccessToken = await this.cacheManager.get<string>('accessToken');
    if (!appAccessToken) {
      appAccessToken = await this.getAppAccessToken();
    }

    const { data } = await this.httpService.axiosRef.get<TwitchGame>(
      'https://api.twitch.tv/helix/games/top',
      {
        headers: {
          'Client-Id': process.env.TWITCH_CLIENT_ID as string,
          Authorization: `Bearer ${appAccessToken}`,
        },
      },
    );

    const { data: remoteGame } = data;

    return remoteGame.map((game) => ({
      twitchGameId: game.id,
      name: game.name,
      bannerUrl: game.box_art_url
        .replace('{width}', '180')
        .replace('{height}', '240'),
    }));
  }
}
