const isAfternoon = (hour: string) => {
  return +hour > 12;
};

const isYesterday = (time: string, nowMonth: string, nowDate: string) => {
  return +time[1] === +nowMonth && +time[2] === +nowDate - 1;
};

const isToday = (time: string, nowMonth: string, nowDate: string) => {
  return +time[1] === +nowMonth && +time[2] === +nowDate;
};

const convertTime = (time: string) => {
  let hour = time[3];
  if (isAfternoon(time[3])) {
    hour = String(+time[3] - 12);
    return `오후 ${hour}:${time[4]}`;
  }

  if (hour === '00') hour = '12';
  return `오전 ${hour}:${time[4]}`;
};

export const parsingLastTime = (date: string) => {
  if (date == null) return;
  const re = /\d+/g;
  const time: any = date?.match(re);
  const now = new Date();
  const nowMonth: any = now.getMonth() + 1 + ''; // 달이 1 작게 됨.
  const nowDate: any = now.getDate() + '';
  if (isToday(time, nowMonth, nowDate)) {
    return convertTime(time);
  }

  if (isYesterday(time, nowMonth, nowDate)) {
    return `어제`;
  }

  return `${time[1]}월 ${time[2]}일 ${time[3]}: ${time[4]}`;
};

export const parsingTime = (date: string) => {
  if (date == null) return;
  const re = /\d+/g;
  const time: any = date?.match(re);
  const now = new Date();
  const nowMonth: any = now.getMonth() + 1;
  const nowDate: any = now.getDate();
  if (isToday(time, nowMonth, nowDate)) return convertTime(time);
  // return `${time[1]}월 ${time[2]}일 ${time[3]}시 ${time[4]}분`;
  // return `${time[1]}/${time[2]}일 ${time[3]}: ${time[4]}`;
  return `${time[1]}/${time[2]}일 ` + convertTime(time);
};
