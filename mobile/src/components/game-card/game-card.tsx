import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { colors } from '../../theme';

export type GameCardProps = {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

type Props = TouchableOpacityProps & {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity className="mr-6" {...rest}>
      <ImageBackground
        className="w-[240] h-[320] justify-end rounded-lg overflow-hidden"
        source={data.cover}
      >
      <LinearGradient className="w-full h-120 p-4 justify-end" colors={colors.footer}>
        <Text className="text-white text-md font-interBold">{data.name}</Text>
        <Text className="text-caption-300 text-md font-interRegular">{`${data.ads} anúncios`}</Text>
      </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}