"use client"
import { createContext, useState, useEffect } from "react";

//Types
import { AppointmentTypes } from "@/types/appointments";

//Assets
import appointmentsList from "@/assets/constants/appointments.json";

type AppointmentContextType = {
  appointments: AppointmentTypes[];
  setAppointments: (value: AppointmentTypes[]) => void;
  selectedAppointment: AppointmentTypes;
  setSelectedAppointment: (value: AppointmentTypes) => void;
  updateAppointments: () => void;
  deleteAppointment: () => void;
  addAppointment: () => void;
}

type AppointmentProviderProps = {
  children: React.ReactNode;
}

export const AppointmentsContext = createContext<AppointmentContextType>({
  appointments: [],
  setAppointments: () => {},
  selectedAppointment: {
    id: "",
    slots: [],
    appointmentDate: {
      start: "",
      end: "",
    },
    appointmentType: "",
    veterinary: {
      veterinary_name: "",
      address: "",
      building: "",
      contact_number: "",
      image: "",
    },
    client: {
      name: "",
      contact: "",
      image: "",
    },
    pet: {
      name: "",
      type: "",
      breed: "",
      age: {
        years: "",
        months: "",
      },
      image: "",
    }
  },
  setSelectedAppointment: () => {},
  updateAppointments: () => {},
  deleteAppointment: () => {},
  addAppointment: () => {},
})

const SessionProvider = (props: AppointmentProviderProps) => {
  const { children } = props;
  const [appointments, setAppointments] = useState<AppointmentTypes[]>(appointmentsList);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentTypes>({
    id: "",
    slots: [],
    appointmentDate: {
      start: "",
      end: "",
    },
    appointmentType: "",
    veterinary: {
      veterinary_name: "",
      address: "",
      building: "",
      contact_number: "",
      image: "",
    },
    client: {
      name: "",
      contact: "",
      image: "",
    },
    pet: {
      name: "",
      type: "",
      breed: "",
      age: {
        years: "",
        months: "",
      },
      image: "",
    }
  });

  const addAppointment = () => {};

  const updateAppointments = () => {};

  const deleteAppointment = () => {};

  const values = {
    appointments,
    setAppointments,
    selectedAppointment,
    setSelectedAppointment,
    updateAppointments,
    deleteAppointment,
    addAppointment,
  };

  return (
    <AppointmentsContext.Provider value={values}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export default SessionProvider