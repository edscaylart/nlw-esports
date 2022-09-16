import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { Background } from './src/components/background/background';
import { Loading } from './src/components/loading/loading';
import { Home } from './src/screens/home/home';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      { fontsLoaded ? <Home /> : <Loading />}
    </Background>
  );
}