"use client"
import { createContext, useState, useEffect } from "react";

//Types
import { Veterinary } from "@/types/veterinary";

type UtilsContextType = {
  showVetCard: boolean;
  setShowVetCard: (value: boolean) => void;
  selectedVet: Veterinary;
  setSelectedVet: (value: Veterinary) => void;
}

type UtilsProviderProps = {
  children: React.ReactNode;
}

export const UtilsContext = createContext<UtilsContextType>({
  showVetCard: false,
  setShowVetCard: () => {},
  selectedVet: {
    veterinary_name: "",
    address: "",
    building: "",
    contact_number: "",
    image: "",
  },
  setSelectedVet: () => {},
});

const SessionProvider = (props: UtilsProviderProps) => {
  const { children } = props;
  const [showVetCard, setShowVetCard] = useState<boolean>(false);
  const [selectedVet, setSelectedVet] = useState<Veterinary>({
    veterinary_name: "",
    address: "",
    building: "",
    contact_number: "",
    image: "",
  })
  

  const values = {
    showVetCard,
    setShowVetCard,
    selectedVet,
    setSelectedVet,
  }

  return (
    <UtilsContext.Provider value={values}>
      {children}
    </UtilsContext.Provider>
  )
}

export default SessionProvider;