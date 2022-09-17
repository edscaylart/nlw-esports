type Props = {
  key?: string
  id: string
  name: string
  adsCount: number
  bannerUrl: string
}

function GamesBanner({ id, name, adsCount, bannerUrl}: Props) {
  return (
    <a href={`https://www.twitch.tv/directory/game/${name}`} className="relative rounded-lg overflow-hidden" target="_blank">
      <img src={bannerUrl} alt={name} />
      <div className="w-full pt-16 pb-4 px-2 bg-gradient-shadow absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{name}</strong>
        <strong className="text-zinc-300 text-sm block">{adsCount} anúncios</strong>
      </div>
    </a>
  )
}

export default GamesBanner;