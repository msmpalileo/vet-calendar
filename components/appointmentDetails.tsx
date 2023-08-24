"use client"

import { useContext } from "react";
import moment from "moment";
// import Image from "next/image";

//Types
import { AppointmentTypes } from "@/types/appointments"

//Assets
import SkewerIcon from "@/assets/images/main/skewer";
import PhoneIcon from "@/assets/images/main/phone";
import EmailIcon from "@/assets/images/main/email";
import PinIcon from "@/assets/images/main/pin";
import BreedIcon from "@/assets/images/main/breed";
import PlusIcon from "@/assets/images/main/plus";
import SexIcon from "@/assets/images/main/sex";
import CalendarIcon from "@/assets/images/main/calendar";
import BellIcon from "@/assets/images/header/bell";
import VaccinationIcon from "@/assets/images/main/vaccination";

//Styles
import styles from '@/styles/components.module.scss';

//Context
import { AppointmentsContext } from "@/app/utils/context/appointmentsContext";

interface AppointmentDetailsProps extends AppointmentTypes {
  wrapperStyle?: {};
}

const AppointmentDetails = (props: AppointmentDetailsProps) => {
  const {
    id,
    slots,
    appointmentDate,
    appointmentType,
    veterinary,
    client,
    pet,
    wrapperStyle,
  } = props;

  const {
    viewAppointmentDetails,
    setViewAppointmentDetails,
    removeSelectedAppointment,
    setAppointmentFormValues,
    setShowAppointmentForm,
    setIsEdit,
    deleteAppointment,
  } = useContext(AppointmentsContext);

  const openEditForm = () => {
    setAppointmentFormValues({
      id,
      slots,
      appointmentType,
      appointmentDate: {
        ...appointmentDate,
        date: moment(appointmentDate.start).format("MM/DD/yyyy").toString(),
      },
      veterinary,
      client,
      pet
    });
    setIsEdit(true);
    setShowAppointmentForm(true);
  }

  return (
    <aside className="transition-all duration-200 ease-linear overflow-y-auto border-l border-l-light-gray-color absolute bg-white right-0" style={{
      width: '440px',
      zIndex: 100,
      marginRight: !viewAppointmentDetails ? '-440px' : '',
      ...wrapperStyle,
    }}>
      <div className="flex border-b border-light-gray-color py-5 px-10">
        {/* <Image
          loader={() => client.image}
          src={client.image}
          alt='Client'
          height={80}
          width={80}
          className="rounded-full"
        /> */}
        <div className="rounded-full h-20 w-20 bg-cover mr-4 bg-center" style={{
          backgroundImage: `url("${client.image || 'https://picsum.photos/200/200?random=5'}")`,
        }}/>
        <div className="flex flex-col justify-center mr-auto">
          <p className="text-2xl font-semibold">{client.name}</p>
          <p className="w-16 text-gray-color">Client</p>
        </div>
        <div className="flex flex-col justify-center">
          <button onClick={() => {
            setViewAppointmentDetails(false);
          }}>
            <SkewerIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col border-b border-light-gray-color py-5 px-10">
        <span className="font-bold uppercase text-gray-color">Contact information</span>
          {client.email && <div className="flex mt-4">
            <div className="flex"><EmailIcon className="mr-2"/> <p className="w-16 text-gray-color">Email</p></div>
            <div className="pl-4">{client.email}</div>
          </div>}
          {client.contact && <div className="flex mt-4">
            <div className="flex"><PhoneIcon className="mr-2"/> <p className="w-16 text-gray-color">Phone</p></div>
            <div className="pl-4">{client.contact}</div>
          </div>}
          {client.address && <div className="flex mt-4">
            <div className="flex"><PinIcon className="mr-2"/> <p className="w-16 text-gray-color">Address</p></div>
            <div className="pl-4">{client.address}</div>
          </div>}
      </div>
      <div className="flex flex-col border-b border-light-gray-color py-5 px-10">
        <span className="font-bold uppercase text-gray-color">Pet Details</span>
        <div className="flex pt-5">
          <div className="rounded-full h-14 w-14 bg-cover mr-4 bg-center" style={{
              backgroundImage: `url("${pet.image ? pet.image : "https://picsum.photos/200/200?random=6"}")`,
            }}/>
            <div className="flex flex-col justify-center mr-auto">
              <p className="text-2xl font-semibold">{pet.name}</p>
              <p className="w-16 text-gray-color">{pet.type}</p>
            </div>
        </div>
          {pet.breed && <div className="flex mt-4">
            <div className="flex"><BreedIcon className="mr-2"/> <p className="w-16 text-gray-color">Breed</p></div>
            <div className="pl-4">{pet.breed}</div>
          </div>}
          {pet.sex && <div className="flex mt-4">
            <div className="flex"><SexIcon className="mr-2"/> <p className="w-16 text-gray-color">Sex</p></div>
            <div className="pl-4">{pet.sex}</div>
          </div>}
          {pet.age.years && <div className="flex mt-4">
            <div className="flex"><PlusIcon className="mr-2"/> <p className="w-16 text-gray-color">Age</p></div>
            <div className="pl-4">
              {parseInt(pet.age.years) > 0 ? `${pet.age.years} years` : ''} {pet.age.months ? `${pet.age.months} months` : ''} 
            </div>
          </div>}
          {pet.birthday && <div className="flex mt-4">
            <div className="flex"><CalendarIcon className="mr-2"/> <p className="w-16 text-gray-color">Birthday</p></div>
            <div className="pl-4">
              {pet.birthday}
            </div>
          </div>}
      </div>
      <div className="flex flex-col border-b border-light-gray-color py-5 px-10">
        <span className="font-bold uppercase text-gray-color">Appointment Details</span>
        <div className="flex mt-4">
          <div className="flex"><CalendarIcon className={`mr-2 ${styles.svgFillGray}`}/> <p className="w-16 text-gray-color">Date</p></div>
          <div className="pl-4">{appointmentDate.date || moment(appointmentDate.start).format('MM/DD/yyyy')}</div>
        </div>
        <div className="flex mt-4">
          <div className="flex"><BellIcon className={`mr-2 ${styles.svgStrokeGray}`}/> <p className="w-16 text-gray-color">Time</p></div>
          <div className="pl-4">{moment(appointmentDate.start).format('hh:mm a')} - {moment(appointmentDate.end).format('hh:mm a')}</div>
        </div>
        <div className="flex mt-4">
          <div className="flex"><VaccinationIcon className={`mr-2 ${styles.svgFillGray}`}/> <p className="w-16 text-gray-color">Type</p></div>
          <div className="pl-4">{appointmentType}</div>
        </div>
      </div>
      <div className="flex flex-col border-b border-light-gray-color py-5 px-10">
        <span className="font-bold uppercase text-gray-color">Veterinarian Details</span>
        <div className="flex pt-5">
          <div className="rounded-full h-14 w-14 bg-cover mr-4 bg-center" style={{
              backgroundImage: `url("${veterinary.image}")`,
            }}/>
            <div className="flex flex-col justify-center mr-auto">
              <p className="text-2xl font-semibold">{veterinary.veterinary_name}</p>
              <p className="w-16 text-gray-color">Veterinarian</p>
            </div>
        </div>
          {veterinary.email && <div className="flex mt-4">
            <div className="flex"><EmailIcon className="mr-2"/> <p className="w-16 text-gray-color">Email</p></div>
            <div className="pl-4">{veterinary.email}</div>
          </div>}
          {veterinary.contact_number && <div className="flex mt-4">
            <div className="flex"><PhoneIcon className="mr-2"/> <p className="w-16 text-gray-color">Phone</p></div>
            <div className="pl-4">{veterinary.contact_number}</div>
          </div>}
          {veterinary.address && <div className="flex mt-4">
            <div className="flex"><PinIcon className="mr-2"/> <p className="w-16 text-gray-color">Address</p></div>
            <div className="pl-4">{veterinary.building},<br/>{veterinary.address}</div>
          </div>}
      </div>
      <div className="pt-5 text-center">
        <button className={`${styles.mainButton} w-4/5`} onClick={() => openEditForm()}>Reschedule Appointment</button>
        <button className={`${styles.hollowButton} w-4/5 my-4`} onClick={() => deleteAppointment(id as string)}>Cancel Appointment</button>
      </div>
    </aside>
  )
}

export default AppointmentDetails 