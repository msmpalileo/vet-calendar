"use client"

import { useContext, useState } from "react";
import moment from "moment";

//Assets
import ChevronLeftIcon from "@/assets/images/main/chevronLeft";
import BreedIcon from "@/assets/images/main/breed";
import ConsultationIcon from "@/assets/images/main/consultation";
import SkewerIcon from "@/assets/images/main/skewer";
import VaccinationIcon from "@/assets/images/main/vaccination";
import UserIcon from "@/assets/images/header/user";
import PlusIcon from "@/assets/images/main/plus";

//Types
import { AppointmentTypes } from "@/types/appointments";

//Styles
import styles from "@/styles/components.module.scss";

//Context
import { DateContext } from "../utils/context/dateContext";
import { AppointmentsContext } from "../utils/context/appointmentsContext";

//Components
import AppointmentDetails from "@/components/appointmentDetails";
import AppointmentsForm from "@/components/appointmentsForm";

export default function Appointments() {
  const {
    currentDate,
    stringDate,
    nextDay,
    prevDay,
    month,
    today,
    slots,
  } = useContext(DateContext);

  const {
    appointments,
    selectedAppointment,
    setSelectedAppointment,
    setViewAppointmentDetails,
    setShowAppointmentForm,
  } = useContext(AppointmentsContext);
  

  const ShowCalendar = () => {
    const mapTimeSlots = () => {
      return slots.map((slot, index) => {
        if(slot.number % 2 === 0) {
          return (
            <div key={index} className="uppercase flex flex-col flex-grow align-center justify-center text-center font-medium border-r border-b border-light-gray-color w-36">
              {moment(slot.start).format("h:mm a")}
            </div>
          )
        }
      })
    }

    const getIcon = (type: string) => {
      switch(type) {
        case "Consultation":
          return <div className={`mr-3 h-fit bg-consultation-color bg-opacity-30 p-2 rounded-full ${styles.svgStrokePurple}`}><ConsultationIcon /></div>;
        case "Vaccination":
          return <div className={`mr-3 h-fit bg-vaccination-color bg-opacity-20 p-2 rounded-full ${styles.svgFillOrange}`}><VaccinationIcon /></div>;
        default:
          break;
      }
    }

    const getStyles = (type: string) => {
      switch(type) {
        case "Consultation":
          return styles.scheduleConsultation;
        case "Vaccination":
          return styles.scheduleVaccination;
        default:
          break;
      }
    }

    const mapSchedules = () => {
      return slots.map((slot) => {
        const appointment: AppointmentTypes = appointments.find(appointment => appointment.slots[0] === slot.number && moment(appointment.appointmentDate.start).startOf('day').toString() === moment(currentDate).startOf('day').toString())!;

        return (
          <div key={slot.number} 
            className={`border-light-gray-color bg-transparent h-16 overflow-visible ${slot.number % 2 === 0 ? "" : "border-b"}`}
          >
            <div 
              className={`mx-5 my-2 flex flex-col align-middle justify-center px-5 relative ${getStyles(appointment?.appointmentType)}`}
              style={{
                height: appointment ? `calc(64px * ${appointment?.slots.length})` : '64px',
              }}
            >
              {appointment && (
                <div className="flex relative z-50">
                  {getIcon(appointment?.appointmentType)}
                  <div className={`flex flex-grow align-middle cursor-pointer ${appointment?.slots.length > 1 ? "flex-col" : ""}`}
                    onClick={() => {
                      if(appointment) {
                        setSelectedAppointment(appointment);
                        setViewAppointmentDetails(true);
                      }
                    }}>
                    <div className="flex flex-col align-middle justify-center mr-6">
                      <p className="text-lg text-left font-bold leading-3 mb-1 mt-2">{appointment?.appointmentType}</p>
                      <span className="text-xs text-left uppercase">{moment(new Date(appointment?.appointmentDate.start)).format("h:mm a")} - {moment(new Date(appointment?.appointmentDate.end)).format("h:mm a")}</span>
                    </div>
                    <div className="mt-3 flex align-middle">
                      <PlusIcon className="mr-2"/> <span className="text-sm">{appointment?.veterinary.veterinary_name}</span> <UserIcon className="ml-6 mr-2"/> <span className="text-sm">{appointment?.client.name}</span> <BreedIcon className="ml-6 mr-2"/> <span className="text-sm">{appointment?.pet.name} ({appointment?.pet.type})</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button><SkewerIcon /></button> 
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })
    }

    const SchedulesComponent = (
      <div className="flex flex-row">
        <div className="flex flex-col">
          {mapTimeSlots()}
        </div>
        <div className="flex-grow">
          {mapSchedules()}
        </div>
      </div>
    )

    return SchedulesComponent;
  }

  return (
    <>
      <AppointmentsForm />
      <main className='bg-white flex flex-col h-screen'>
        <section className="flex py-5 px-10 border-b border-b-light-gray h-36">
          <div>
            <span className="text-gray">Appointments for {month}</span>
            <div>
              <span className="text-2xl font-bold mr-3">{stringDate}</span>
              <button className={styles.iconButton} onClick={() => prevDay()}>
                <ChevronLeftIcon />
              </button>
              <button className={styles.iconButton} onClick={() => nextDay()}>
                <ChevronLeftIcon className="rotate-180"/>
              </button>
            </div>
            {/* <span className="text-gray">{month}</span> */}
            <button className="text-accent hover:text-accent-color text-xs" onClick={() => today()}>Jump to Today</button>
          </div>
          <button
            className={`${styles.mainButton} ml-auto my-auto`}
            onClick={() => setShowAppointmentForm(true)}
          >
            New Appointment
          </button>
        </section>
        <section className="flex">
          <div className="flex-grow overflow-y-scroll"
            style={{
              height: "calc(100vh - 114px - 144px)"
            }}
          >
            {ShowCalendar()}
          </div>
          <AppointmentDetails {...selectedAppointment} />
        </section>
      </main>
    </>
    
  );
}
  