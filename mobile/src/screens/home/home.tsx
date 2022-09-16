import { FlatList, Image, View } from 'react-native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard } from '../../components/game-card/game-card'
import { Heading } from '../../components/heading/heading'
import { GAMES } from '../../utils/games'

export function Home() {
  return (
    <View className="flex-1 items-center">
      <Image className="w-[214] h-[120] mt-16 mb-4" source={logoImg} />

      <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={GAMES}
        renderItem={({ item }) => (
          <GameCard  data={item} />
        )}
        contentContainerStyle={{ paddingLeft: 32, paddingRight: 64 }}
      />
    </View>
  )
}