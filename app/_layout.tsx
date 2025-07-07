import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";

import * as Sentry from '@sentry/react-native';
import './globals.css'
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://17b76e167db978284d66add371ced6aa@o4509620930478080.ingest.us.sentry.io/4509620938866688',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
export default Sentry.wrap(function RootLayout() {

    const { isLoading, fetchAuthenticatedUser } = useAuthStore();

 const [fontLoaded, error] = useFonts({
    "Quicksand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "Quicksand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "Quicksand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "Quicksand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "Quicksand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });


  useEffect(() => {
  if(error) throw error;
  if(fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);

    useEffect(() => {
        fetchAuthenticatedUser()
    }, []);

    if(!fontLoaded || isLoading) return  null;

  return <Stack screenOptions={{headerShown: false}}/>;
});