"use client"
import { createContext, useState, useEffect } from "react";
import moment from "moment";

//Assets
import monthsList from "@/assets/constants/months.json";

//Utils
import { getSlots } from "../utils";

type DateContextType = {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
  stringDate: string;
  setStringDate: (value: string) => void;
  month: {
    label: string;
    number: number;
    year?: number;
  };
  setMonth: (value: {
    label: string;
    number: number;
    year?: number;
  }) => void;
  nextDay: () => void;
  prevDay: () => void;
  nextMonth: () => void;
  prevMonth: () => void;
  today: () => void;
  startOfDay: number;
  endOfDay: number;
  slots: any[];
  viewType: string;
  setViewType: (value: string) => void;
}

type DateProviderProps = {
  children: React.ReactNode;
}

export const DateContext = createContext<DateContextType>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  stringDate: "",
  setStringDate: () => {},
  month: {
    label: "",
    number: 0,
  },
  setMonth: () => {},
  nextDay: () => {},
  prevDay: () => {},
  nextMonth: () => {},
  prevMonth: () => {},
  today: () => {},
  startOfDay: 5,
  endOfDay: 18,
  slots: [],
  viewType: "",
  setViewType: () => {},
})

const SessionProvider = (props: DateProviderProps) => {
  const { children } = props;
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [stringDate, setStringDate] = useState<string>("");
  const [month, setMonth] = useState<{
    label: string;
    number: number;
    year?: number;
  }>({
    label: monthsList[currentDate.getMonth()].label,
    number: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  const startOfDay =  5;
  const endOfDay = 18;
  const slots: object[] = getSlots(currentDate);
  const [viewType, setViewType] = useState("day");

  

  useEffect(() => {
    if(currentDate) {
      updateStringDate(currentDate);
    }
  }, [currentDate, stringDate]);

  const updateStringDate = (currentDate: Date) => {
    setStringDate(`${monthsList[currentDate.getMonth()].label} ${currentDate.getDate()}, ${currentDate.getFullYear()}`);
    setMonth({
      label: monthsList[currentDate.getMonth()].label,
      number: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
  }

  const nextMonth = () => {
    let next = currentDate;
    next.setMonth(next.getMonth() + 1);
    setMonth({
      label: `${monthsList[next.getMonth()].label}`,
      number: next.getMonth(),
      year: next.getFullYear(),
    });
  }

  const prevMonth = () => {
    let prev = currentDate;
    prev.setMonth(prev.getMonth() - 1);
    setMonth({
      label: monthsList[prev.getMonth()].label,
      number: prev.getMonth(),
      year: prev.getFullYear(),
    });
  }

  const nextDay = () => {
    let tomorrow = currentDate;
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCurrentDate(tomorrow);
    updateStringDate(tomorrow);
  }

  const prevDay = () => {
    let yesterday = currentDate;
    yesterday.setDate(yesterday.getDate() - 1);
    setCurrentDate(yesterday);
    updateStringDate(yesterday);
  }

  const today = () => {
    let today = new Date();
    setCurrentDate(today);
    updateStringDate(today);
  }

  const values = {
    currentDate,
    setCurrentDate,
    stringDate,
    setStringDate,
    month,
    setMonth,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    today,
    startOfDay,
    endOfDay,
    slots,
    viewType,
    setViewType,
  }

  return (
    <DateContext.Provider value={values}>
      {children}
    </DateContext.Provider>
  )
}

export default SessionProvider;