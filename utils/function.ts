export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const suspendApi = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const searchValue = (value: string, compareValue: string) => {
  return compareValue?.toLowerCase()?.includes(value?.toLowerCase());
};
