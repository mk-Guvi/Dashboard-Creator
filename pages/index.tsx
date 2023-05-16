import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { Layout } from '../components';
import Dashboard from '../containers/dashboard/dashboardContainer';
const Home: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
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
