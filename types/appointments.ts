interface VeterinaryType {
  veterinary_name: string;
  address: string;
  building: string;
  contact_number: string;
  image: string;
  email?: string;
}

interface AppointmentTypes {
  id?: string;
  slots: number[];
  appointmentDate: {
    date?: string;
    start: string;
    end: string;
  };
  appointmentType: string;
  veterinary: VeterinaryType;
  client: {
    name: string;
    contact: string;
    image?: string;
    email?: string;
    address?: string;
  };
  pet: {
    name: string;
    type: string;
    breed: string;
    sex?: string;
    birthday?: string;
    age: {
      years: string;
      months: string;
    };
    image: string;
  }
}

interface SlotType {
  number: number | null;
  start: string;
  end: string;
}


export type { AppointmentTypes, SlotType, VeterinaryType };
