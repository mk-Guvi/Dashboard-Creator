import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoaderSvg } from '../../components';

import { ExtraSmallText, H5, H6 } from '../../components/typography';
import { GetCardDetailsResponseT } from './cardItem';

export type SchedulesDataT = {
  title: string;
  time: {
    from: string;
    to: string;
  };
  location: string;
  borderColor: string;
};

type CardItemsStateT = {
  loading: boolean;
  error: string;
  data: SchedulesDataT[];
};
export const Schedules = ({ getCardDetails }: { getCardDetails: () => Promise<GetCardDetailsResponseT<SchedulesDataT[]>> }) => {
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
    <div className="flex flex-col h-full w-full p-4 gap-6">
      <div className="flex w-full flex-wrap gap-2 items-center">
        <H5 className="flex-1">Today&apos;s schedule</H5>
        <Link href={'/schedules'}>
          <ExtraSmallText className="text-gray-600">See more</ExtraSmallText>
        </Link>
      </div>

      {state?.data?.map((e) => {
        return (
          <div key={e.location} className={`border-l-4 break-all p-2 flex flex-col gap-1 ${e.borderColor}`}>
            <H6 className="text-gray-700">{e.title}</H6>
            <ExtraSmallText className="text-gray-500">
              {e?.time.from}-{e.time.to}
            </ExtraSmallText>
            <ExtraSmallText className="text-gray-500">{e?.location}</ExtraSmallText>
          </div>
        );
      })}
    </div>
  );
};
