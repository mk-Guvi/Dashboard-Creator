import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Layout } from '../components';
import Loader from '../components/loaders/Loader';
import { appService } from '../services';
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });
    return () => {
      router.events.off('routeChangeComplete', () => {
        setLoading(false);
      });
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={appService.store}>
        {loading ? (
          <Layout>
            <Loader />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
