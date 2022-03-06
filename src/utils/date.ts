
export interface Day {
  d: number; //天
  current?: boolean; //是否当天；
  shadowDay: boolean; //不在当月;
  m?: number;
  y?: number;
}
export interface PickerDay extends Day{
  timestamp:number;
}
export interface DateDay {
  y: number;
  m: number;
  d: number;
}

export const getPreM = (y: number, m: number): { y: number; m: number } =>
  m > 0 ? { y, m: m - 1 } : { y: y - 1, m: 11 };

export const getNextM = (y: number, m: number): { y: number; m: number } =>
  m < 11 ? { y, m: m + 1 } : { y: y + 1, m: 1 };

export const getDays = ({
  m,
  y,
  d,
}: {
  y: number;
  m: number; // 0开始
  d?: number;
}): Day[] => {
  const days = new Date(y, m, 0).getDate();
  const firstWeekDay = new Date(y, m-1, 1).getDay();
  const lastWeekDay = new Date(y, m-1, days).getDay();
  
  const preMonDays =new Date(y,m-1,0).getDate();
    // m > 0 ? new Date(y, m-1, 0).getDate() : new Date(y - 1, 11, 0).getDate();

  const dayList: Day[] = new Array(days)
    .fill(1)
    .map((i: any, index: number) => ({
      d: index + 1,
      current: d != null && d === index + 1,
      shadowDay: false,
      y,
      m,
    }));

  // , nextList: Day[];
  let preCount = 0;

  const preList: Day[] = new Array(firstWeekDay === 0 ? 6 : firstWeekDay - 1)
    .fill(1)
    .map((i, index) => ({
      d: preMonDays - preCount++,
      shadowDay: true,
    }));
  preList.reverse();

  const nextList: Day[] = new Array(lastWeekDay === 0 ? 0 : 7 - lastWeekDay)
    .fill(1)
    .map((i, index) => ({
      d: index + 1,
      shadowDay: true,
    }));

  return preList.concat(dayList).concat(nextList);
};

export const getDateDay = (date: Date): DateDay => {
  return {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
  };
};
export const timeStampDay=(day:Day):number=>{
  
  return new Date(day.y||0,(day.m||1) -1,day.d).getTime();
}

export const isGreater=(day:Day,compareDay:Day):boolean=>
  timeStampDay(day)-timeStampDay(compareDay) > 0
