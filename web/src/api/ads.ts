import axios from "axios"

export type CreateAdType = {
  gameId: string
  name: string
  yearsPlaying: string
  discord: string
  weekDays: string[]
  hourStart: string
  hourEnd: string
  useVoiceChannel: boolean
}

export async function createAd({gameId, ...data}: CreateAdType) {
  return axios.post(`http://localhost:3333/games/${gameId}/ads`, {
    ...data,
    yearsPlaying: Number(data.yearsPlaying),
    weekDays: data.weekDays.map(Number)
  })
}