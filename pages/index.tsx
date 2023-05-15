import { NextPage } from 'next';
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
