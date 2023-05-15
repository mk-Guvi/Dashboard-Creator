import { ApiEndpoints } from '../../constants';
import { ChartDataT } from './activities';
import { CardEntityTypeT } from './cardItem';
import { SalesChartDataT } from './salesChart';
import { SchedulesDataT } from './schedules';

export const AllCardsEntities: CardEntityTypeT[] = [
  {
    className: 'bg-[#DDEFE0] ',
    label: 'Total Revenues',
    icon: 'download',
    prefix: '$',
    url: '',
    value: 'TOTAL_REVENUE',
    type: 'CARD',
  },
  {
    className: 'bg-[#F4ECDD] ',
    label: 'Total Transactions',
    icon: 'tags',
    url: '',
    value: 'TOTAL_TRANSACTIONS',
    type: 'CARD',
  },

  {
    className: 'bg-[#EFDADA]',
    label: 'Total Likes',
    icon: 'thumbs-up',
    url: '',
    value: 'LIKES',
    type: 'CARD',
  },
  {
    className: 'bg-[#DEE0EF]',
    label: 'Total Users',
    icon: 'users',
    url: ApiEndpoints.GET_USERS,
    value: 'USERS',
    type: 'CARD',
  },
  {
    className: 'w-11/12  h-72 rounded   bg-white',
    label: 'Activities',
    value: 'ACTIVITIES',
    type: 'ACTIVITIES',
  },
  {
    className: 'rounded-md   lg:w-5/12 w-11/12   min-h-52 max-h-fit bg-white',
    label: 'Top Sales',
    value: 'TOP_SALES',
    type: 'SALES',
  },
  {
    className: 'rounded-md   lg:w-5/12 w-11/12 min-h-52 max-h-fit bg-white',
    label: "Today's Schedules",
    value: 'SCHEDULES',
    type: 'SCHEDULES',
  },
];

export const PieChartEntityColors: any[] = ['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber'];

export const salesItems: SalesChartDataT[] = [
  {
    name: 'Basic Tees',
    sales: 55,
  },
  {
    name: 'Custom Short Pants',
    sales: 31,
  },
  {
    name: 'Super Hoodies',
    sales: 14,
  },
];

export const chartdata: ChartDataT[] = [
  {
    Week: 'Week 1',
    Guest: 350,
    User: 300,
  },
  {
    Week: 'Week 2',
    Guest: 200,
    User: 374,
  },
  {
    Week: 'Week 3',
    Guest: 280,
    User: 190,
  },
  {
    Week: 'Week 4',
    Guest: 370,
    User: 387,
  },
];

export const schedulesData: SchedulesDataT[] = [
  {
    title: 'Meeting with suppliers from Kuta Bali',
    location: 'Sunset Road, Kuta, Bali ',
    time: {
      from: '14.00',
      to: '15.00',
    },
    borderColor: 'border-[#9BDD7C]',
  },
  {
    title: 'Check operation at Giga Factory 1',
    location: 'Central Jakarta ',
    time: {
      from: '18.00',
      to: '20.00',
    },
    borderColor: 'border-[#6972C3]',
  },
];
