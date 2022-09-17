import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from 'phosphor-react-native';

import { GameAd } from "../../api/ads";
import { colors } from "../../theme";
import { PlayerInfo } from "../player-info/player-info";

type Props = {
  data: GameAd
  onConnect: () => void
}

export function PlayerCard({ data, onConnect }: Props) {
  return (
    <View className="w-48 bg-shape rounded-t-md p-5 mr-4 items-center">
      <PlayerInfo
        label="Nome"
        value={data.name}
      />
      <PlayerInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
      />
      <PlayerInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <PlayerInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? colors.success : colors.alert}
      />

      <TouchableOpacity
        className="w-full h-9 rounded-md bg-primary flex-row items-center justify-center"
        onPress={onConnect}
      >
        <GameController color={colors.text} size={20} />
        <Text className="text-white font-interSemi text-sm ml-2">Conectar</Text>
      </TouchableOpacity>
    </View>
  )
}