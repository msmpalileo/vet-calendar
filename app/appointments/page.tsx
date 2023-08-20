"use client"

import { useContext } from "react";

//Assets
import ChevronLeft from "@/assets/images/main/chevronLeft";

//Styles
import styles from "@/styles/components.module.scss";

//Context
import { DateContext } from "../utils/context/dateContext";

export default function Appointments() {
  const {
    currentDate,
    stringDate,
    nextDay,
    prevDay,
    month,
    today,
  } = useContext(DateContext);

  return (
    <main className='bg-white'>
      <section className="flex py-5 px-10 border-b border-b-light-gray">
        <div>
          <span className="text-gray">Appointments for {month}</span>
          <div>
            <span className="text-2xl font-bold mr-3">{stringDate}</span>
            <button className={styles.iconButton} onClick={() => prevDay()}>
              <ChevronLeft />
            </button>
            <button className={styles.iconButton} onClick={() => nextDay()}>
              <ChevronLeft className="rotate-180"/>
            </button>
          </div>
          {/* <span className="text-gray">{month}</span> */}
          <button className="text-accent hover:text-accent-color text-xs" onClick={() => today()}>Jump to Today</button>
        </div>
        <button className={`${styles.mainButton} ml-auto my-auto`}>New Appointment</button>
      </section>
    </main>
  );
}
  