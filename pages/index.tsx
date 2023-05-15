import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut, useSession } from 'next-auth/react';
const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="h-screen w-screen font-bold flex flex-col justify-center items-center">
      <p>It&apos;s the begining...</p>
      {session ? (
        <button
          className="border rounded p-2"
          onClick={() =>
            signOut({
              callbackUrl: '/login',
              redirect: true,
            })
          }>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ session: Session }>> {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
