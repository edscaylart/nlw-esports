import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
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

  async getTwitchTopGames() {
    let appAccessToken = await this.cacheManager.get<string>('accessToken');
    if (!appAccessToken) {
      appAccessToken = await this.getAppAccessToken();
    }

    const { data } = await this.httpService.axiosRef.get(
      'https://api.twitch.tv/helix/games/top',
      {
        headers: {
          'Client-Id': process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${appAccessToken}`,
        },
      },
    );

    return data;
  }
}
