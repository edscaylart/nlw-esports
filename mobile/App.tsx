import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import './src/services/notification-config';
import { Background } from './src/components/background/background';
import { Loading } from './src/components/loading/loading';
import { Routes } from './src/routes';

const queryClient = new QueryClient()

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Background>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        { fontsLoaded ? <Routes /> : <Loading />}
      </Background>
    </QueryClientProvider>
  );
}