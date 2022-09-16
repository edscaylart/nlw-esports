import { ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme';

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={colors.primary} />
    </View>
  )
}