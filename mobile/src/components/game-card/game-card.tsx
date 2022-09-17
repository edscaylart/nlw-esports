import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Game } from '../../api';
import { colors } from '../../theme';

type Props = TouchableOpacityProps & {
  data: Game;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity className="mr-6" {...rest}>
      <ImageBackground
        className="w-[240] h-[320] justify-end rounded-lg overflow-hidden"
        source={{ uri: data.bannerUrl }}
      >
      <LinearGradient className="w-full h-120 p-4 justify-end" colors={colors.footer}>
        <Text className="text-white text-md font-interBold">{data.name}</Text>
        <Text className="text-caption-300 text-md font-interRegular">{`${data._count.ads} anúncios`}</Text>
      </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}