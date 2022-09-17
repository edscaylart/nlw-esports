import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo }  from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import emptyImg from '../../assets/among-us.png'
import { GameRouteParams } from "../../@types/navigation";
import { Background } from "../../components/background/background";
import { colors } from "../../theme";
import { Heading } from "../../components/heading/heading";
import { PlayerCard } from "../../components/player-card/player-card";
import { useQuery } from "@tanstack/react-query";
import { getAdsByGame, getDiscordByAd } from "../../api/ads";
import { PlayerMatch } from "../../components/player-match/player-match";
import { useState } from "react";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameRouteParams;

  const [discordPlayerSelected, setDiscordPlayerSelected] = useState('')

  const ads = useQuery(['ads', game.id], () => getAdsByGame(game.id), {
    initialData: []
  })

  async function handleGetDiscord(adId: string) {
    const discord = await getDiscordByAd(adId)
    setDiscordPlayerSelected(discord)
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView className="flex-1 items-center">
        <View className="w-full flex-row items-center px-8 mt-5 justify-between">
          <TouchableOpacity className="" onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={colors.caption[300]} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} className="w-[72] h-[40]" />

          <View className="w-5 h-5" />
        </View>

        <Image
          source={{ uri:game.bannerUrl }}
          className="w-[311] h-28 rounded-md mt-8"
          resizeMode="cover"
        />

        <Heading
          title={game.name}
          subtitle="Conecte-se e comece a jogar"
        />

        <FlatList
          horizontal
          data={ads.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PlayerCard
              data={item}
              onConnect={() => handleGetDiscord(item.id)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            ads.data.length > 0 ?
              { paddingLeft: 32, paddingRight: 64 } :
              { flex: 1, alignItems: 'center', justifyContent: 'center' }
          ]}
          ListEmptyComponent={() => (
            <View className="items-center justify-center">
              {ads.isLoading ? <ActivityIndicator color={colors.success} size="large" /> : <Text className="text-caption-300 text-sm font-interRegular">
                Não há anúncios publicados ainda.
              </Text>}
            </View>
          )}
        />

        <PlayerMatch
          visible={discordPlayerSelected.length > 0}
          discord={discordPlayerSelected}
          onClose={() => setDiscordPlayerSelected('')}
        />
      </SafeAreaView>
    </Background>
  )
}