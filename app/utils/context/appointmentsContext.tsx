"use client"
import { createContext, useState } from "react";
import moment from 'moment';

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
  createAppointment: (value: AppointmentTypes) => void;
  viewAppointmentDetails: boolean;
  setViewAppointmentDetails: (value: boolean) => void;
  showAppointmentForm: boolean;
  setShowAppointmentForm: (value: boolean) => void;
  appointmentFormValues: AppointmentTypes;
  setAppointmentFormValues: (value: AppointmentTypes) => void;
  updateFormValue: (value: string | object, key: string, subkey?: string) => void;
  resetFormValues: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
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
  createAppointment: () => {},
  viewAppointmentDetails: false,
  setViewAppointmentDetails: () => {},
  showAppointmentForm: false,
  setShowAppointmentForm: () => {},
  appointmentFormValues: {
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
  }},
  setAppointmentFormValues: () => {},
  updateFormValue: () => {},
  resetFormValues: () => {},
  isEdit: false,
  setIsEdit: () => {},
})

const defaultFormValues = {
  id: "",
  slots: [],
  appointmentDate: {
    date: moment(new Date()).format("MM-DD-yyyy").toString(),
    start: "",
    end: "",
  },
  appointmentType: "Consultation",
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
    sex: "Male",
    age: {
      years: "",
      months: "",
    },
    image: "",
  }
};

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
  const [viewAppointmentDetails, setViewAppointmentDetails] = useState<boolean>(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);
  const [appointmentFormValues, setAppointmentFormValues] = useState<AppointmentTypes>(defaultFormValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // useEffect(() => {
  //   const slots: SlotType[] = getSlots(appointmentFormValues.appointmentDate.date as string);
  //   selectedDateSlots = slots;
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const updateFormValue = (value: string | number[] | object, key: string, subkey?: string) => {
    let values = appointmentFormValues;
    let subValues = null;
    let updatedValues: any = {};
    
    if(subkey) {
      subValues = appointmentFormValues[key as keyof typeof values];

      updatedValues = {
        ...values,
        [key]: {
          ...(subValues as object),
          [subkey]: value
        },
      };
      setAppointmentFormValues(updatedValues);
    } else {
      updatedValues = {
        ...values,
        [key]: value,
      };
      setAppointmentFormValues(updatedValues);
    }
  }


  const createAppointment = (updatedFormValues: AppointmentTypes) => {
    if(isEdit) {
      const index = appointments.findIndex((appointment) => appointment.id === appointmentFormValues.id);
      let updatedAppointments = appointments;
      updatedAppointments.splice(index, 1);
      updatedAppointments.push(updatedFormValues);
      setAppointments([...updatedAppointments]);
      console.log(`Edited`)
    } else {
      setAppointments([...appointments, updatedFormValues]);
      console.log(`New Added`)
    }

    console.log([...appointments, updatedFormValues]);
    
  };

  const resetFormValues = () => {
    setAppointmentFormValues({...defaultFormValues});
  }

  const updateAppointments = () => {};

  const deleteAppointment = () => {};

  const values = {
    appointments,
    setAppointments,
    selectedAppointment,
    setSelectedAppointment,
    updateAppointments,
    deleteAppointment,
    createAppointment,
    viewAppointmentDetails,
    setViewAppointmentDetails,
    showAppointmentForm,
    setShowAppointmentForm,
    appointmentFormValues,
    setAppointmentFormValues,
    updateFormValue,
    resetFormValues,
    isEdit,
    setIsEdit,
  };

  return (
    <AppointmentsContext.Provider value={values}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export default SessionProvider