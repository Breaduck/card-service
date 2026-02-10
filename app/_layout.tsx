import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="camera/scan"
          options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="card/[id]" options={{ headerShown: true, title: '카드 상세' }} />
        <Stack.Screen name="card/add" options={{ headerShown: false }} />
        <Stack.Screen name="search/results" options={{ headerShown: true, title: '혜택 검색' }} />
      </Stack>
    </>
  );
}
