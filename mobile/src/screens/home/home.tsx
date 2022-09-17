import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Game, getGames } from '../../api'
import { Background } from '../../components/background/background'
import { GameCard } from '../../components/game-card/game-card'
import { Heading } from '../../components/heading/heading'

export function Home() {
  const games = useQuery(['games'], getGames, {
    initialData: []
  })
  const navigation = useNavigation();

  function handleGamePress({ id, name, bannerUrl }: Game) {
    navigation.navigate('game', { id, name, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView className="flex-1 items-center">
        <Image className="w-[214] h-[120] mt-16 mb-4" source={logoImg} />

        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={games.data}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleGamePress(item)} />
          )}
          contentContainerStyle={{ paddingLeft: 32, paddingRight: 64 }}
        />
      </SafeAreaView>
    </Background>
  )
}