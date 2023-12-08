import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Route from "./src/navigation/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useTheme } from 'react-native-paper';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  let [fontsLoaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
