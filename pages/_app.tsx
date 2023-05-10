import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { appService } from '../services';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={appService.store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
