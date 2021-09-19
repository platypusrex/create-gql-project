import React from 'react';
import { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
);

export default App;
