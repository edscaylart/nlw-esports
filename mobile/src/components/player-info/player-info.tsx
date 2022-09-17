import { Text, View } from "react-native";

import { colors } from "../../theme";

type Props = {
  label: string;
  value: string;
  colorValue?: string;
}

export function PlayerInfo({ label, value, colorValue = colors.text }: Props) {
  return (
    <View className="w-full mb-4">
      <Text
        className="text-caption-300 text-sm font-interRegular mb-1"
      >
        {label}
      </Text>
      <Text
        className="text-sm font-interBold"
        style={{ color: colorValue }}
        numberOfLines={1}>
        {value}
      </Text>
    </View>
  )
}