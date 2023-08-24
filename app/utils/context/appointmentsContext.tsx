"use client"
import { createContext, useState, useEffect } from "react";
import moment from 'moment';
import FuzzySearch from 'fuzzy-search';

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
  deleteAppointment: (value: string) => void;
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
  removeSelectedAppointment: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchResults: AppointmentTypes[];
  setSearchResults: (value: AppointmentTypes[]) => void;
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
  removeSelectedAppointment: () => {},
  searchValue: "",
  setSearchValue: () => {},
  searchResults: [],
  setSearchResults: () => {},
})

const defaultFormValues = {
  id: "",
  slots: [],
  appointmentDate: {
    date: moment(new Date()).format("MM/DD/yyyy").toString(),
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<AppointmentTypes[]>([]);

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

  const removeSelectedAppointment = () => {
    setSelectedAppointment(defaultFormValues);
  }

  const createAppointment = (updatedFormValues: AppointmentTypes) => {
    if(isEdit) {
      const index = appointments.findIndex((appointment) => appointment.id === appointmentFormValues.id);
      let updatedAppointments = appointments;
      updatedAppointments.splice(index, 1);
      updatedAppointments.push(updatedFormValues);
      setAppointments([...updatedAppointments]);
    } else {
      setAppointments([...appointments, updatedFormValues]);
      setAppointmentFormValues({...updatedFormValues});
    }
  };

  useEffect(() => {
    if(searchValue) {
      setViewAppointmentDetails(false);
      setSelectedAppointment(defaultFormValues);

      const searcher = new FuzzySearch(appointments, 
        [
          'appointmentDate.date',
          'appointmentDate.start',
          'appointmentDate.end',
          'appointmentType',
          'veterinary.veterinary_name',
          'client.name',
          'pet.name',
          'pet.type',
          'pet.breed',
        ],
      );

      const results = searcher.search(searchValue);
      setSearchResults([...results]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const resetFormValues = () => {
    setAppointmentFormValues({...defaultFormValues});
  }

  const updateAppointments = () => {};

  const deleteAppointment = (id: string) => {
    let text = "Are you sure you want to cancel this appointment?";
    if (confirm(text) == true) {
    const index = appointments.findIndex((appointment) => appointment.id === id);
    let updatedAppointments = appointments;
    updatedAppointments.splice(index, 1);
    setAppointments([...updatedAppointments]);
    setViewAppointmentDetails(false);
    setSelectedAppointment(defaultFormValues);
    }
  };

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
    removeSelectedAppointment,
    searchValue, 
    setSearchValue,
    searchResults,
    setSearchResults,
  };

  return (
    <AppointmentsContext.Provider value={values}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export default SessionProvider