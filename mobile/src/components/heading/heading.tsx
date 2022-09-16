import { Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...rest }: Props) {
  return (
    <View className="w-full p-8" {...rest}>
      <Text className="text-white text-lg font-interBlack">{title}</Text>
      <Text className="text-caption-400 text-md font-interRegular">{subtitle}</Text>
    </View>
  )
}