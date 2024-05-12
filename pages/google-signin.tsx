import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LoaderSvg } from '../components';

const GoogleSignInPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(status === 'loading') && !session) {
      void signIn('google', {
        callbackUrl: 'http://localhost:3000/google-signin',
        redirect: false, // Set redirect to false to get the sign-in URL without redirecting
        intent: 'external', // Specify that the action should be treated as an external intent
      });
    } else if (session) {
      window.close();
    }
  }, [session, status]);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'white',
      }}>
      {!session && status != 'loading' && !loading ? (
        <p>Something went wrong try again later</p>
      ) : (
        <LoaderSvg className="!h-10 !w-10" type="SECONDARY" />
      )}
    </div>
  );
};

export default GoogleSignInPage;
