import { z } from 'zod';

export const CreateAds = z.object({
  name: z.string(),
  yearsPlaying: z.number(),
  discord: z.string(),
  weekDays: z.number().array(),
  hourStart: z.string(),
  hourEnd: z.string(),
  useVoiceChannel: z.boolean(),
});
