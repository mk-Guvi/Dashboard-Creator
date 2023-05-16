import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Icon, InputField } from '../../components';
import Tooltip from '../../components/sharedComps/ToolTip';
import { H3, H4, Text } from '../../components/typography';
import { BackendGet } from '../../integrations';
import AvatarImage from '../../public/assets/avatar-image.svg';
import { getRandomNumber, searchValue, suspendApi, useDebounce } from '../../utils';
import Activities, { ChartDataT } from './activities';
import CardItem, { CardEntityTypeT, GetCardDetailsPayloadT, GetCardDetailsResponseT } from './cardItem';
import { AllCardsEntities, chartdata, salesItems, schedulesData } from './constants';
import SalesChart, { SalesChartDataT } from './salesChart';
import { Schedules, SchedulesDataT } from './schedules';

export type DashboardStateT = {
  search: string;
  allEntities: CardEntityTypeT[];
};
function Dashboard() {
  const { data: session } = useSession();

  const [state, setState] = useState<DashboardStateT>({
    search: '',
    allEntities: [...AllCardsEntities],
  });
  const debouncedSearch: string = useDebounce(state.search, 1000);
  useEffect(() => {
    getSearchedWidgets(debouncedSearch);
  }, [debouncedSearch]);

  const getSearchedWidgets = (value: string) => {
    const filteredSearchValues = [...AllCardsEntities].filter((e) => searchValue(value, e.label));
    handleState({ allEntities: filteredSearchValues });
  };

  const handleState = (payload: Partial<DashboardStateT>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  const getCardDetails = useCallback(async (payload: GetCardDetailsPayloadT): Promise<GetCardDetailsResponseT<string | number>> => {
    try {
      if (payload?.value === 'USERS') {
        const response = await BackendGet(payload?.url);

        if (response?.total) {
          return {
            error: '',
            data: response?.total,
          };
        } else {
          throw new Error('Failed to get data');
        }
      } else {
        await suspendApi(1500);
        return {
          error: '',
          data: getRandomNumber(0, 10000),
        };
      }
    } catch (e) {
      return {
        error: 'Something Went Wrong',
        data: '',
      };
    }
  }, []);

  const getSalesCardDetails = useCallback(async (): Promise<GetCardDetailsResponseT<SalesChartDataT[]>> => {
    try {
      await suspendApi(1500);
      return {
        error: '',
        data: salesItems,
      };
    } catch (e) {
      return {
        error: 'Something Went Wrong',
        data: [],
      };
    }
  }, []);

  const getActivitiesCardDetails = useCallback(async (): Promise<GetCardDetailsResponseT<ChartDataT[]>> => {
    try {
      await suspendApi(1500);
      return {
        error: '',
        data: chartdata,
      };
    } catch (e) {
      return {
        error: 'Something Went Wrong',
        data: [],
      };
    }
  }, []);

  const getSchedulesCardDetails = useCallback(async (): Promise<GetCardDetailsResponseT<SchedulesDataT[]>> => {
    try {
      await suspendApi(1500);
      return {
        error: '',
        data: schedulesData,
      };
    } catch (e) {
      return {
        error: 'Something Went Wrong',
        data: [],
      };
    }
  }, []);
  return (
    <div className="h-full w-full   flex flex-col   gap-5 items-center ">
      <header className="flex items-center  py-3 gap-3 flex-wrap w-[95%]">
        <H3 className="flex-1">Dashboard</H3>
        <div className="w-[13rem]">
          <InputField
            containerClassName=" h-[2.2rem] hover:ring-[2px] focus-within:ring-purple-400 ring-purple-400  "
            className="pl-4"
            value={state.search}
            onChange={(e) => handleState({ search: e.target.value })}
            iconRight={{
              icon: 'search',
              iconStyle: 'text-gray-600',
            }}
            disableRing
            placeholder="Search Widget"
          />
        </div>

        <Icon icon="bell" />
        <Tooltip
          content={
            <div className="w-fit min-h-20 p-4 text-black bg-white shadow rounded flex flex-col items-center justify-center gap-1">
              <img
                src={session?.user?.image || AvatarImage.src}
                alt={'profile'}
                width={25}
                height={25}
                className="rounded-full object-cover h-8 w-8"
              />
              <Text>{session?.user?.name || 'Name Not Found'}</Text>
            </div>
          }>
          <img
            onClick={() =>
              signOut({
                callbackUrl: '/login',
              })
            }
            src={session?.user?.image || AvatarImage.src}
            alt={'profile'}
            width={25}
            height={25}
            title="Logout"
            className="rounded-full cursor-pointer object-cover h-8 w-8"
          />
        </Tooltip>
      </header>

      {state?.allEntities?.length ? (
        <section className="flex flex-wrap pb-5 w-[95%]  h-full  gap-8">
          {state?.allEntities?.map((each) => {
            return each.type === 'CARD' ? (
              <CardItem
                key={each.value}
                getCardDetails={getCardDetails}
                label={each.label}
                value={each.value}
                url={each.url}
                icon={each.icon}
                type={each.type}
                className={each.className}
                prefix={each?.prefix}
              />
            ) : each.type === 'ACTIVITIES' ? (
              <section className={`${each?.className || ''} `} key={each.value}>
                <Activities getCardDetails={getActivitiesCardDetails} />
              </section>
            ) : each.type === 'SALES' ? (
              <div className={`${each?.className || ''}  `} key={each.value}>
                <SalesChart getCardDetails={getSalesCardDetails} />
              </div>
            ) : each.type === 'SCHEDULES' ? (
              <div className={`${each?.className || ''}`} key={each?.value}>
                <Schedules getCardDetails={getSchedulesCardDetails} />
              </div>
            ) : null;
          })}
        </section>
      ) : (
        <H4 className="flex flex-1 w-full justify-center items-center ">No Widget Found!</H4>
      )}
    </div>
  );
}

export default Dashboard;
