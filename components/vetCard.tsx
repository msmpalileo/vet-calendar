
//Components
import Modal from "./modal"

//Types
import { VetCardProps } from "@/types/veterinary";

//Assets
import PlusIcon from "@/assets/images/main/plus";
import PhoneIcon from "@/assets/images/main/phone";
import PinIcon from "@/assets/images/main/pin";

//Styles
import styles from '@/styles/components.module.scss';

const vetCard = (props: VetCardProps) => {
  const {
    veterinary_name,
    address,
    building,
    contact_number,
    image,
    isActive,
    setIsActive,
  } = props;

  return (
    <Modal isActive={isActive} modalClassName="w-96">
      <div className="h-40 w-40 mx-auto bg-cover rounded-full"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="text-center text-lg my-4 font-semibold">
        <p>Dr. {veterinary_name}</p>
        <p className="text-xs text-md text-gray-color">Veterinarian</p>
      </div>
      <div>
        <div className="flex mb-3">
          <div className="mr-2 flex w-1/3 text-gray-color"><PhoneIcon className="mr-2"/> Contact</div>
          <p className="w-2/3">{contact_number}</p>
        </div>
        <div className="flex mb-3">
          <div className="mr-2 flex w-1/3 text-gray-color"><PlusIcon className="mr-2"/> Clinic</div>
          <p className="w-2/3">{building}</p>
        </div>
        <div className="flex mb-3">
          <div className="mr-2 flex w-1/3 text-gray-color"><PinIcon className="mr-2"/> Address</div>
          <p className="w-2/3">{address}</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className={styles.hollowButton} onClick={() => setIsActive(false)}>Back</button>
      </div>
    </Modal>
  )
}

export default vetCard