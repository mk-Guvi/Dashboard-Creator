import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { Layout } from '../components';

const Contact: NextPage = () => {
  return (
    <>
      <Layout classNameChildren="flex justify-center items-center font-bold text-2xl"> Page Under Construction.</Layout>
    </>
  );
};

export default Contact;
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
