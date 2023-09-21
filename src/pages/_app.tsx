import '@/src/styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app'; // Needed for typeScript
import Navbar from '../components/Navbar';

import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/src/components/theme';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>

      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    
    </ChakraProvider>

  );
}
