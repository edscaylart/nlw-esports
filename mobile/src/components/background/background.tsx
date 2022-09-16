import { ImageBackground } from 'react-native';
import { $WithChildren } from '../../types';
import backgroundImg from '../../assets/background-galaxy.png'

type Props = $WithChildren

export const Background = ({ children }: Props) => {
  return (
    <ImageBackground
      className={`flex-1 bg-background-800`}
      defaultSource={backgroundImg}
      source={backgroundImg}
    >
      {children}
    </ImageBackground>
  )
}