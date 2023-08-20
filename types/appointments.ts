interface AppointmentTypes {
  id: string;
  slots: number[];
  appointmentDate: {
    start: string;
    end: string;
  };
  appointmentType: string;
  veterinary: {
    veterinary_name: string;
    address: string;
    building: string;
    contact_number: string;
    image: string;
  };
  client: {
    name: string;
    contact: string;
    image: string;
  };
  pet: {
    name: string;
    type: string;
    breed: string;
    age: {
      years: string;
      months: string;
    };
    image: string;
  }
}

export type { AppointmentTypes };
