import { useEffect, useState } from 'react';
import { Icon, SkeletonLoader } from '../../components';
import { IconTypeT } from '../../components/Icons/iconInner';
import { H3, Text } from '../../components/typography';

export type GetCardDetailsPayloadT = {
  url: string;
  value: CardEntityValueT;
};

export type GetCardDetailsResponseT<T> = {
  error: string;
  data: T;
};

export type CardEntityValueT = 'TOTAL_REVENUE' | 'USERS' | 'LIKES' | 'TOTAL_TRANSACTIONS' | 'ACTIVITIES' | 'TOP_SALES' | 'SCHEDULES';
export type CardTypeT = 'CARD' | 'ACTIVITIES' | 'SALES' | 'SCHEDULES';
export type CardEntityTypeT = {
  label: string;
  value: CardEntityValueT;
  url?: string;
  icon?: IconTypeT;
  prefix?: string;
  className?: string;
  type: CardTypeT;
};
type CardItemsPropsT = CardEntityTypeT & {
  getCardDetails: (payload: GetCardDetailsPayloadT) => Promise<GetCardDetailsResponseT<string | number>>;
};

type CardItemsStateT = {
  loading: boolean;
  error: string;
  data: string | number;
};

function CardItem(props: CardItemsPropsT) {
  const { getCardDetails, url, icon, prefix, value, label, className } = props;
  const [state, setState] = useState<CardItemsStateT>({
    loading: true,
    error: '',
    data: '',
  });

  useEffect(() => {
    callGetCardDetails();
  }, []);

  const callGetCardDetails = async () => {
    handleState({ error: '', loading: true, data: '' });
    const { error, data } = await getCardDetails({
      url: url || '',
      value,
    });
    handleState({ error, data, loading: false });
  };
  const handleState = (payload: Partial<CardItemsStateT>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  return (
    <div
      className={`rounded-lg m-auto lg:w-[20%]  md:w-5/12 w-full      flex flex-col  h-fit break-all  min-w-[10rem] p-4 ${
        className || ''
      }`}>
      {icon ? (
        <div className="h-7 w-7  place-self-end">
          <Icon
            icon={state?.error ? 'refresh-cw' : icon}
            className={`p-1 h-full w-full ${state?.error ? 'cursor-pointer ' : ''}`}
            onClick={() => {
              if (state?.error) {
                callGetCardDetails();
              }
            }}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Text>{label}</Text>
        {state?.loading ? (
          <SkeletonLoader height="7" width="full" />
        ) : (
          <H3 className={`${state?.error ? 'text-red-800 text-sm' : ''}`}>
            {state?.data && prefix ? `${prefix} ` : ''}
            {state?.data || state?.error || 'No Data Found.'}
          </H3>
        )}
      </div>
    </div>
  );
}

export default CardItem;
