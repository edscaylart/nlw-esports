export type GameAd = {
  "id": string;
  "name": string;
  "weekDays": string[];
  "useVoiceChannel": boolean;
  "yearsPlaying": number;
  "hourEnd": string;
  "hourStart": string;
}

export type DiscordAd = {
  discord: string
}

export async function getAdsByGame(gameId: string) {
  const response = await fetch(`http://localhost:3333/games/${gameId}/ads`)
  const data = await response.json()

  return data as GameAd[]
}

export async function getDiscordByAd(adId: string) {
  const response = await fetch(`http://localhost:3333/ads/${adId}/discord`)
  const data = await response.json()

  return (data as DiscordAd).discord
}