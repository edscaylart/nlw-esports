import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { colors } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../heading/heading";
import { useState } from "react";

type Props = ModalProps & {
  discord: string
  onClose: () => void
}

export function PlayerMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setCopping] = useState(false)

  const copyToClipboard = async () => {
    setCopping(true)
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord Copiado!', 'Usuário copiado para você colar no Discord.')
    setCopping(false)
  };

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View className="flex-1 items-center justify-center bg-overlay">
        <View className="w-[311] bg-shape rounded-lg items-center justify-center">
          <TouchableOpacity
            className="self-end m-4"
            onPress={onClose}
          >
            <MaterialIcons name="close" size={20} color={colors.caption[500]} />
          </TouchableOpacity>

          <CheckCircle size={64} color={colors.success} weight="bold" />

          <Heading
            style={{ alignItems: 'center', marginTop: 24 }}
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
          />
          <Text className="text-white text-md font-interSemi mt-4 mb-2">Adicione seu discord</Text>

          <TouchableOpacity
            className="w-[231] h-12 bg-background-900 justify-center items-center rounded mb-8"
            onPress={copyToClipboard}
            disabled={isCopping}
          >
            {isCopping ? <ActivityIndicator color={colors.primary} /> : <Text className="text-white text-md font-interRegular">{discord}</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}