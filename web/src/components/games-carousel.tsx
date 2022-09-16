const MOCK = [
  { img: '/images/game001.png', name: 'League of Legends', amount: 4 },
  { img: '/images/game004.png', name: 'Apex Legends', amount: 4 },
  { img: '/images/game003.png', name: 'Counter Strike', amount: 4 },
  { img: '/images/game006.png', name: 'World of Warcraft', amount: 4 },
  { img: '/images/game002.png', name: 'Dota 2', amount: 4 },
  { img: '/images/game005.png', name: 'Fortnite', amount: 4 },
]

function GamesCarousel() {
  return (
    <div className="grid grid-cols-6 gap-6 mt-16">
      {MOCK.map((mock, i) => (
        <a key={`item-${i}`} href="" className="relative rounded-lg overflow-hidden">
          <img src={mock.img} alt={mock.name} />
          <div className="w-full pt-16 pb-4 px-2 bg-gradient-shadow absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">{mock.name}</strong>
            <strong className="text-zinc-300 text-sm block">{mock.amount} anúncios</strong>
          </div>
        </a>
      ))}
    </div>
  )
}

export default GamesCarousel;