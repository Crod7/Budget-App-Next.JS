import '@/src/styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app'; // Needed for typeScript
import { Provider as ReduxProvider } from 'react-redux'; // Import Redux Provider
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/src/components/Utility/ToggleColorMode/theme';
import store from '@/src/store/store';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>

      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserProvider>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </UserProvider>

    </ChakraProvider>

  );
}
