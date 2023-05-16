import { LineChart } from '@tremor/react';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LoaderSvg } from '../../components/loaders/CircularLoader';
import { ExtraSmallText, H5, H6 } from '../../components/typography';
import { GetCardDetailsResponseT } from './cardItem';
// import { CartesianGrid, Dot, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type ChartDataT = {
  Week: string;
  Guest: number;
  User: number;
};

type CardItemsStateT = {
  loading: boolean;
  error: string;
  data: ChartDataT[];
};
export const Activities = ({ getCardDetails }: { getCardDetails: () => Promise<GetCardDetailsResponseT<ChartDataT[]>> }) => {
  const [state, setState] = useState<CardItemsStateT>({
    loading: true,
    error: '',
    data: [],
  });

  useEffect(() => {
    callGetCardDetails();
  }, []);

  const callGetCardDetails = async () => {
    handleState({ error: '', loading: true, data: [] });
    const { error, data } = await getCardDetails();
    handleState({ error, data: data || [], loading: false });
  };
  const handleState = (payload: Partial<CardItemsStateT>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };
  return state?.loading ? (
    <div className="h-full justify-center flex flex-wrap gap-2 items-center">
      <LoaderSvg size="8" type="SECONDARY" className="rounded-md" />
      <H6>Loading Activities</H6>
    </div>
  ) : (
    <div className="h-full w-full relative flex flex-col overflow-hidden  p-4">
      <H5>Activities</H5>
      <ExtraSmallText className="text-gray-600 ">
        {`${moment().subtract(1, 'month').format('MMMM')}-${moment().format('MMMM')}`} {moment().format('YYYY')}
      </ExtraSmallText>
      <div className="h-[85%] w-full   place-self-center">
        <LineChart
          data={state.data}
          index="Week"
          className="h-full w-full"
          categories={['Guest', 'User']}
          colors={['emerald', 'gray']}
          curveType="natural"
          autoFocus={false}
          yAxisWidth={40}
          showAnimation={true}
        />
      </div>
    </div>
  );
};

export default React.memo(Activities);
