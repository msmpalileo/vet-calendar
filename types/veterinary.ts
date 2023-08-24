interface Veterinary {
  veterinary_name: string;
  address: string;
  building: string;
  contact_number: string;
  image: string;
}

interface VetCardProps extends Veterinary {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}


export type { Veterinary, VetCardProps };
