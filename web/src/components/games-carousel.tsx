import { useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import GamesBanner from "./games-banner";

export type Game = {
  "id": string
  "twitchGameId": string
  "name": string
  "bannerUrl": string,
  "_count": {
    "ads": number
  }
}

type Props = {
  data: Game[]
}

function GamesCarousel({ data }: Props) {
  const [sliderRef] = useKeenSlider({
      initial: 0,
      loop: true,
      mode: "free",
      slides: {
        perView: 6,
        spacing: 16,
      },
    },
    [])

  return (
    <div ref={sliderRef} className="keen-slider mt-16">
      {data.map((game, index) => (
        <div key={game.id} className={`keen-slider__slide number-slide${index+1}`}>
          <GamesBanner
            name={game.name}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
            id={game.id}
          />
        </div>
      ))}
    </div>
  )
}

export default GamesCarousel;