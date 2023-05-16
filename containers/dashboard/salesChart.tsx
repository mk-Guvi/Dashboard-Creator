import { DonutChart } from '@tremor/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LoaderSvg } from '../../components/loaders/CircularLoader';
import { ExtraSmallText, H3, SmallText, Text } from '../../components/typography';
import { GetCardDetailsResponseT } from './cardItem';

import { PieChartEntityColors } from './constants';

export type SalesChartDataT = {
  name: string;
  sales: number;
};

type CardItemsStateT = {
  loading: boolean;
  error: string;
  data: SalesChartDataT[];
};
const SalesChart = ({ getCardDetails }: { getCardDetails: () => Promise<GetCardDetailsResponseT<SalesChartDataT[]>> }) => {
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
    <div className="h-40 justify-center flex items-center">
      <LoaderSvg size="10" type="SECONDARY" />
    </div>
  ) : (
    <div className="w-full  grid grid-cols-1 lg:grid-cols-2 place-items-center  gap-2  p-4 h-full">
      <div className=" w-full h-full">
        <H3>Top Sales</H3>

        <DonutChart
          data={state.data}
          className=" mt-2 "
          category="sales"
          index="name"
          showAnimation
          valueFormatter={(e) => `${e}%`}
          variant="pie"
          showLabel
          colors={PieChartEntityColors}
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <Text className="text-gray-600 self-end">
          {`${moment().subtract(1, 'month').format('MMMM')}-${moment().format('MMMM')}`} {moment().format('YYYY')}
        </Text>
        <div className="flex h-full flex-col gap-2">
          {state?.data?.map((e, i) => {
            return (
              <div key={e.name}>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full h-2 w-2 bg-${PieChartEntityColors[i]}-500`} />
                  <SmallText className="font-semibold ">{e.name} </SmallText>
                </div>
                <ExtraSmallText className="mt-0.5 text-gray-600">{e.sales}%</ExtraSmallText>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SalesChart);
