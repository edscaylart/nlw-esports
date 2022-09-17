export type Game = {
  "id": string
  "twitchGameId": string
  "name": string
  "bannerUrl": string,
  "_count": {
    "ads": number
  }
}

export async function getGames() {
  const response = await fetch('http://localhost:3333/games')
  const data = await response.json()

  return data as Game[]
}