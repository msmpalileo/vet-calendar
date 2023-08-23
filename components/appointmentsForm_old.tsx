
import { useState, useEffect, useContext } from 'react'
import moment from "moment";

//Components
import Modal from './modal'
import Input from './input';
import Select from './select';
import Calendar from './calendar';
import Dropzone from './dropzone';

//Context
import { AppointmentsContext } from '@/app/utils/context/appointmentsContext';
import { DateContext } from '@/app/utils/context/dateContext';

//Assets
import veterinaries from '@/assets/constants/veterinaries.json';
import appointmentTypes from '@/assets/constants/appointmentTypes.json';
import BreedIcon from '@/assets/images/main/breed';

//Styles
import styles from '@/styles/components.module.scss';

//Utils
import { getSlots } from '@/app/utils/utils';

//Types
import { VeterinaryType } from '@/types/appointments';

interface SlotType {
  value: number | null | object;
  label: string;
  disabled?: boolean;
}

const AppointmentsForm = () => {
  const [selectedDate, setSelectedDate] = useState<string>(moment(new Date()).format("MM/DD/yyyy").toString());
  const [selectedDateSlots, setSelectedDateSlots] = useState<any[]>([]);
  const [startSlots, setStartSlots] = useState<SlotType[]>([]);
  const [endSlots, setEndSlots] = useState<SlotType[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(true);

  const { 
    appointments,
    showAppointmentForm, 
    setShowAppointmentForm,
    appointmentFormValues,
    updateFormValue,
   } = useContext(AppointmentsContext);

   const {
    pet: { name: petName, type, breed, age, sex, image: petImage },
    client: { name: clientName, contact },
    veterinary,
    appointmentDate,
    appointmentType,
   } = appointmentFormValues;

   const { years, months } = age || { years: "", months: "" };
   const { date, start, end } = appointmentDate || { date: "", start: "", end: "" };

   const checkSubmission = () => {
    const toCheck = [date, start, end, appointmentType, petName, type, breed, age, sex, petImage, clientName, contact, veterinary.veterinary_name];

    const error = toCheck.some((item) => item === "");
    setHasErrors(error);
   };
   
  const updateValues = (value: any, key: string, subkey?: string) => {
    updateFormValue(value, key, subkey);
    checkSubmission();
  }
  
  const getSlotValue = (index: number) => {
    const dateSlot = selectedDateSlots.find(slot => slot.number === index);
    return dateSlot.start;
   }

  useEffect(() => {
    if(startTime) {
      updateValues(getSlotValue(parseInt(startTime)), "appointmentDate", "start");
    }

    if(endTime) {
      updateValues(getSlotValue(parseInt(endTime)), "appointmentDate", "end");
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [startTime, endTime])
   

   const setAvailableScheduleSlots = (selectedDate: string) => {
    const todayAppointments = appointments.filter(appointment => moment(appointment.appointmentDate.start).startOf('day').toString() === moment(selectedDate).startOf('day').toString());
    let occupiedSlots: number[] = [];
    todayAppointments.forEach(appointment => occupiedSlots = [...occupiedSlots, ...appointment.slots]);
    occupiedSlots.sort();

    const dateSlots = getSlots(selectedDate);
    setSelectedDateSlots([...dateSlots]);

    const availableScheduleSlots = dateSlots.map(slot => {
      if(occupiedSlots.includes(slot.number as number)) {
        return {
          value: slot.number,
          label: moment(slot.start).format("hh:mm a"),
          disabled: true,
        }
      }

      return {
        value: slot.number,
        label: moment(slot.start).format("hh:mm a"),
      };
    })

    //Get index of first endTime
    let endIndex = availableScheduleSlots.length - 1;
    if(availableScheduleSlots.length && startTime) {
      for(let x = parseInt(startTime); x < availableScheduleSlots.length; x++) {
        if(availableScheduleSlots[x].disabled) {
          endIndex = x;
          break;
        }
      }
    }

    const availableEndSlots = dateSlots.map((slot) => {
      if(slot && slot.number !== null && startTime && (slot.number <= parseInt(startTime) || slot.number > endIndex)) {
        return {
          value: slot.number,
          label: moment(slot.start).format("hh:mm a"),
          disabled: true,
        }
      }

      return {
        value: slot.number,
        label: moment(slot.start).format("hh:mm a"),
      };
    })

    setStartSlots(availableScheduleSlots);
    setEndSlots(availableEndSlots);
   }

   useEffect(() => {
    setAvailableScheduleSlots(selectedDate);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [startTime])

   const saveAppointment = () => {
    console.log(appointmentFormValues);
   }


  return (
    <Modal {...{isActive: showAppointmentForm, setIsActive: setShowAppointmentForm}}
      modalClassName='w-1/2'
    >
      <p className="text-gray-color text-sm">SCHEDULE AN APPOINTMENT</p>
      <div className="text-xl border-b font-bold text-vaccination-color border-b-vaccination-color mt-4">Appointment Details</div>
      <div className="flex mt-4 gap-2">
        <Calendar
          value={date}
          placeholder={moment(new Date()).format("MM/DD/yyyy").toString()}
          onChange={(value) => {
            setSelectedDate(value);
            updateValues(value, "appointmentDate", "date");
            setAvailableScheduleSlots(value);
            setHasErrors(true);
            setStartTime("");
            setEndTime("");
          }}
          label='Appointment Date'
          wrapperClassName='w-1/2'
        />
        <Select
          options={appointmentTypes}
          label="Appointment Type"
          value={appointmentType}
          onChange={(value) => updateValues(value, "appointmentType")}
          wrapperClassName='flex-grow w-1/2'
        />
      </div>
      <div className="flex mt-4 gap-2">
      <Select
          options={[
            {
              value: "",
              label: "",
            },
            ...startSlots
          ]}
          label="Start Time"
          value={startTime}
          onChange={(value) => {
            setStartTime(value);
            setEndTime("");
          }}
          wrapperClassName='flex-grow w-1/2'
          inputClassName='uppercase'
          isClearable
        />
        <Select
          options={[
            {
              value: "",
              label: "",
            },
            ...endSlots
          ]}
          label="End Time"
          value={endTime}
          onChange={(value) => {
            setEndTime(value);
          }}
          wrapperClassName='flex-grow w-1/2'
          inputClassName='uppercase'
          isClearable
        />
      </div>
      <div className="text-xl font-bold border-b border-b-vaccination-color mt-4 text-vaccination-color">Pet Details</div>
      <div className="flex">
        <div className='w-1/2 pt-4'>
          <Dropzone
            onChange={(value) => updateValues(value, "pet", "image")}
            icon={<BreedIcon className='h-12 w-12 mb-4 opacity-80'/>}
            value={petImage}
          />
        </div>
        <div className='w-1/2'>
        <Input 
          label='Pet Name'
          type='text'
          placeholder={'Pet Name'}
          value={petName || ""}
          onChange={(value) => updateValues(value, "pet", "name")}
          wrapperClassName='mt-4 flex-grow'
        />
        <div className="flex gap-2">
          <Input 
            label='Animal Type'
            type='text'
            placeholder={'Animal Type'}
            value={type || ""}
            onChange={(value) => updateValues(value, "pet", "type")}
            wrapperClassName='mt-4 flex-grow'
          />
          <Input 
            label='Breed'
            type='text'
            placeholder={'Breed'}
            value={breed || ""}
            onChange={(value) => updateValues(value, "pet", "breed")}
            wrapperClassName='mt-4 flex-grow'
          />
        </div>
        
        <div className="flex gap-2">
          <Input 
            label='Age'
            type='text'
            placeholder={'Years'}
            value={years || ""}
            onChange={(value) => updateValues({
              years: value,
              months,
            }, "pet", "age")}
            wrapperClassName='mt-4 w-1/2'
          />
          <Input 
            type='text'
            placeholder={'Months'}
            value={months || ""}
            onChange={(value) => updateValues({
              years,
              months: value,
            }, "pet", "age")}
            wrapperClassName='mt-4 w-1/2'
          />
        </div>
        <Select
          options={[
            {
              label: 'Male',
              value: 'Male',
            },
            {
              label: 'Female',
              value: 'Female',
            }
          ]}
          label="Gender"
          value={sex}
          onChange={(value) => updateValues(value, "pet", "sex")}
          wrapperClassName='mt-4 flex-grow'
        />
        </div>
      </div>
      <div className="text-xl border-b font-bold text-vaccination-color border-b-vaccination-color mt-4">Owner Details</div>
      <div className="flex gap-2">
        <Input 
          label='Name'
            type='text'
            placeholder={'Name'}
            value={clientName}
            onChange={(value) => updateValues(value, "client", "name")}
            wrapperClassName='mt-4 flex-grow'
          />
        <Input 
          label='Phone Number'
            type='text'
            placeholder={'Phone Number'}
            value={contact}
            onChange={(value) => updateValues(value, "client", "contact")}
            wrapperClassName='mt-4 flex-grow'
          />
      </div>
      <div className="text-xl text-vaccination-color font-bold border-b border-b-vaccination-color mt-4">Veterinarian</div>
      <div className="flex flex-wrap gap-2 pt-4">
        {veterinaries.map((vet: VeterinaryType, index) => (
          <button
            key={index}
            className={`${styles.vetButton} ${vet.veterinary_name === veterinary.veterinary_name ? styles.vetButtonActive  : ''}`}
            onClick={() => updateValues(vet, "veterinary")}
          >
            <div>
              <div className="rounded-full h-14 w-14 bg-cover mr-4 bg-center" style={{
                backgroundImage: `url("${vet.image}")`,
              }}/>
            </div>
            <div className='text-left'>
              <p className="text-lg">Dr. {vet.veterinary_name}</p>
              <p className="text-md">{vet.contact_number}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between py-4">
        <button className={styles.hollowButton}>Cancel</button>
        <button className={styles.mainButton} onClick={() => saveAppointment()} disabled={hasErrors}>Save</button>
      </div>
    </Modal>
  )
}

export default AppointmentsForm