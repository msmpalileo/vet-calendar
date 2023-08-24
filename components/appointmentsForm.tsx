
import { useState, useEffect, useContext } from 'react'
import moment from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//Components
import Modal from './modal'
import Input from './input';
import Select from './select';
import Calendar from './calendar';
import Dropzone from './dropzone';

//Context
import { AppointmentsContext } from '@/app/utils/context/appointmentsContext';

//Assets
import veterinaries from '@/assets/constants/veterinaries.json';
import appointmentTypes from '@/assets/constants/appointmentTypes.json';
import BreedIcon from '@/assets/images/main/breed';

//Styles
import styles from '@/styles/components.module.scss';

//Utils
import { getSlots } from '@/app/utils/utils';

//Types
import { AppointmentTypes, VeterinaryType } from '@/types/appointments';

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

  const { 
    appointments,
    setAppointments,
    showAppointmentForm, 
    setShowAppointmentForm,
    appointmentFormValues,
    updateFormValue,
    resetFormValues,
    isEdit,
    setIsEdit,
    createAppointment,
    setSelectedAppointment,
   } = useContext(AppointmentsContext);

   const {
    pet: { name: petName, type, breed, age, sex, image: petImage },
    client: { name: clientName, contact },
    veterinary,
    appointmentDate,
    appointmentType,
    slots: activeSlots,
   } = appointmentFormValues;

   const { years, months } = age || { years: "", months: "" };
   const { date, start, end } = appointmentDate || { date: "", start: "", end: "" };

   const validationSchema = Yup.object().shape({
    appointmentType: Yup.string().required("Appointment Type is required."),
    veterinarian: Yup.string().required("Veterinarian is required."),
    startTime: Yup.string().required("Start Time is required."),
    endTime: Yup.string().required("End Time is required."),
    petName: Yup.string().required("Pet Name is required."),
    petType: Yup.string().required("Pet Type is required."),
    petBreed: Yup.string().required("Pet Breed is required."),
    petYears: Yup.string().required("Pet Years is required."),
    petMonths: Yup.string().required("Pet Months is required."),
    petGender: Yup.string().required("Pet Gender is required."),
    ownerName: Yup.string().required("Owner Name is required."),
    ownerContact: Yup.string().required("Owner Contact is required."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, watch, control, getValues, setValue, reset } =
    useForm(formOptions);
  const { errors, isValid, isDirty } = formState;

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const vet = veterinaries.find((vet) => vet.veterinary_name === data.veterinarian);
    const timeSlots = [];
    for(let x = parseInt(data.startTime); x < parseInt(data.endTime); x++) {
      timeSlots.push(x);
    }

    const payload: AppointmentTypes = {
      ...appointmentFormValues,
      id: appointmentFormValues.id || Math.floor(Math.random()*10000).toString(),
      appointmentType: data.appointmentType,
      client: {
        contact: data.ownerContact,
        name: data.ownerName,
      },
      pet: {
        ...appointmentFormValues.pet,
        name: data.petName,
        type: data.petType,
        breed: data.petBreed,
        sex: data.petGender,
        age: {
          years: data.petYears,
          months: data.petMonths,
        },
      },
      veterinary: vet!,
      slots: timeSlots,
    };

    let text = "Are you sure you want update appointment details?";
    if (isEdit && confirm(text) == true) {
      createAppointment(payload);
      setSelectedAppointment(payload);
      setShowAppointmentForm(false);
      setAvailableScheduleSlots(appointmentFormValues.appointmentDate.date as string);
      resetFormValues();
      reset({
        appointmentType: "",
        veterinarian: "",
        startTime: "",
        endTime: "",
        petName: "",
        petType: "",
        petBreed: "",
        petYears: "",
        petMonths: "",
        petGender: "",
        ownerName: "",
        ownerContact: "",
      });
      setStartTime("");
      setEndTime("");
      setIsEdit(false);
    } else {
      createAppointment(payload);
      setShowAppointmentForm(false);
      setAvailableScheduleSlots(appointmentFormValues.appointmentDate.date as string);
      resetFormValues();
      reset({
        appointmentType: "",
        veterinarian: "",
        startTime: "",
        endTime: "",
        petName: "",
        petType: "",
        petBreed: "",
        petYears: "",
        petMonths: "",
        petGender: "",
        ownerName: "",
        ownerContact: "",
      });
      setStartTime("");
      setEndTime("");
      setIsEdit(false);
    }

  };
   
  const updateValues = (value: any, key: string, subkey?: string) => {
    updateFormValue(value, key, subkey);
    // checkSubmission();
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
  //  eslint-disable-next-line react-hooks/exhaustive-deps
   }, [startTime, endTime])

   useEffect(() => {
    if(isEdit) {
      setTimeout(() => {
        const existingValues = {
          appointmentType: appointmentType || "",
          veterinarian: veterinary.veterinary_name || "",
          startTime: activeSlots.length ? activeSlots[0].toString() : "",
          // endTime: activeSlots.length ? activeSlots[activeSlots.length - 1].toString() : "",
          endTime: activeSlots.length === 1 ? (activeSlots[0] + 1).toString() : activeSlots[activeSlots.length - 1].toString(),
          petName: petName || "",
          petType: type || "",
          petBreed: breed || "",
          petYears: years || "",
          petMonths: months || "",
          petGender: sex || "",
          ownerName: clientName || "",
          ownerContact: contact || "",
        };
        setStartTime(activeSlots.length ? activeSlots[0].toString() : "");
        reset(existingValues);
        setAvailableScheduleSlots(date as string);
        setSelectedDate(date as string);
      }, 200)
    } else {
      reset({
        appointmentType: "",
        veterinarian: "",
        startTime: "",
        endTime: "",
        petName: "",
        petType: "",
        petBreed: "",
        petYears: "",
        petMonths: "",
        petGender: "",
        ownerName: "",
        ownerContact: "",
      });
    }
  //  eslint-disable-next-line react-hooks/exhaustive-deps
   }, [setShowAppointmentForm, isEdit])
   

   const setAvailableScheduleSlots = (selectedDate: string) => {
    const todayAppointments = appointments.filter(appointment => moment(appointment.appointmentDate.start).startOf('day').toString() === moment(selectedDate).startOf('day').toString());
    let occupiedSlots: number[] = [];
    todayAppointments.forEach(appointment => occupiedSlots = [...occupiedSlots, ...appointment.slots]);
    occupiedSlots.sort();

    const dateSlots = getSlots(selectedDate);
    setSelectedDateSlots([...dateSlots]);

    let availableScheduleSlots = dateSlots.map(slot => {
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
    });

    // If Editing, update availableScheduleSlots to include used data slots of the item being edited
    const availableStartSlots = availableScheduleSlots.map((slot) => {
      if(appointmentFormValues.slots.includes(slot.value as number)) {
        return {
          ...slot,
          disabled: false,
        }
      }

      return slot;
    })

    //Get index of first endTime
    let endIndex = availableStartSlots.length - 1;
    if(availableStartSlots.length && startTime) {
      for(let x = parseInt(startTime); x < availableStartSlots.length; x++) {
        if(availableStartSlots[x].disabled) {
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

    setStartSlots(availableStartSlots);
    setEndSlots(availableEndSlots);
   }

   useEffect(() => {
    setAvailableScheduleSlots(selectedDate);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [startTime])

  const vetOptions = veterinaries.map(vet => {
    return {
      value: vet.veterinary_name,
      label: `Dr. ${vet.veterinary_name}`,
    }
  });

  return (
    <Modal {...{isActive: showAppointmentForm, setIsActive: setShowAppointmentForm}}
      modalClassName='w-1/2'
    >
      <p className="text-gray-color text-sm">SCHEDULE AN APPOINTMENT</p>
      <div className="text-xl border-b font-bold text-vaccination-color border-b-vaccination-color mt-4">Appointment Details</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-4 gap-2">
          <Calendar
            value={selectedDate}
            placeholder={moment(new Date()).format("MM/DD/yyyy").toString()}
            onChange={(value) => {
              const formattedValue = moment(value).format("MM/DD/yyyy");
              setSelectedDate(formattedValue);
              updateValues(formattedValue, "appointmentDate", "date");
              setAvailableScheduleSlots(value);
              setStartTime("");
              setEndTime("");
              setValue('startTime', "");
              setValue('endTime', "");
            }}
            targetValue='appointmentType'
            title='Appointment Date'
            withTitle
            className='w-1/2'
          />
          <Select
            options={appointmentTypes}
            targetValue='appointmentType'
            register={register("appointmentType")}
            title='Appointment Type'
            className='border-none w-1/2'
            errors={errors}
            withErrorMessage
            watchValue={watch("appointmentType")}
            isRequired
            withTitle
          />
        </div>
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2 w-1/2">
            <Select
              options={[
                ...startSlots
              ]}
              register={register("startTime", {
                onChange: (e) => {
                  setStartTime(e.target.value);
                  setValue('endTime', '');
                  setEndTime("");
                }
              })}
              targetValue='startTime'
              title='Start Time'
              className='border-none w-1/2'
              errors={errors}
              withErrorMessage
              watchValue={watch("startTime")}
              isRequired
              withTitle
            />
            <Select
              options={[
                ...endSlots
              ]}
              targetValue='endTime'
              register={register("endTime", {
                onChange: (e) => {
                  setEndTime(e.target.value);
                }
              })}
              title='End Time'
              className='border-none w-1/2'
              errors={errors}
              withErrorMessage
              watchValue={watch("endTime")}
              isRequired
              withTitle
              disabled={!startTime}
            />
          </div>
          <div className='w-1/2'>
            <Select
                options={vetOptions}
                targetValue='veterinarian'
                register={register("veterinarian")}
                title='Veterinarian'
                className='border-none'
                errors={errors}
                withErrorMessage
                watchValue={watch("veterinarian")}
                isRequired
                withTitle
              />
          </div>
          
        </div>
        <div className="text-xl font-bold border-b border-b-vaccination-color mt-4 text-vaccination-color">Pet Details</div>
        <div className="flex">
          <div className='w-1/2 pt-4'>
            <Dropzone
              onChange={(value) => updateValues(value, "pet", "image")}
              icon={<BreedIcon className='h-12 w-12 mb-2 opacity-80'/>}
              value={petImage}
            />
          </div>
          <div className='w-1/2'>
          <Input 
            targetValue='petName'
            register={register("petName")}
            className='border-none mb-2 mt-3'
            title='Pet Name'
            errors={errors}
            withErrorMessage
            isRequired
            withTitle
          />
          <div className="flex gap-2">
            <Input 
              targetValue='petType'
              register={register("petType")}
              className='border-none mb-2 w-1/2'
              title='Animal Type'
              errors={errors}
              withErrorMessage
              isRequired
              withTitle
            />
            <Input 
              targetValue='petBreed'
              register={register("petBreed")}
              className='border-none mb-2 w-1/2'
              title='Breed'
              errors={errors}
              withErrorMessage
              isRequired
              withTitle
            />
          </div>
          
          <div className="flex gap-2">
            <Input 
              targetValue='petYears'
              register={register("petYears")}
              className='border-none mb-2 w-1/2'
              title='Age'
              placeholder='Years'
              errors={errors}
              withErrorMessage
              isRequired
              withTitle
              type='number'
            />
            <Input 
              targetValue='petMonths'
              register={register("petMonths")}
              className='border-none mb-2 w-1/2'
              title=''
              placeholder='Months'
              errors={errors}
              withErrorMessage
              isRequired
              withTitle
              type='number'
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
            targetValue='petGender'
            register={register("petGender")}
            title='Gender'
            className='border-none'
            errors={errors}
            withErrorMessage
            watchValue={watch("petGender")}
            isRequired
            withTitle
          />
          </div>
        </div>
        <div className="text-xl border-b font-bold text-vaccination-color border-b-vaccination-color mt-4">Owner Details</div>
        <div className="flex gap-2">
          <Input 
            targetValue='ownerName'
            register={register("ownerName")}
            className='border-none mb-2 mt-4 w-1/2'
            title='Name'
            errors={errors}
            withErrorMessage
            isRequired
            withTitle
          />
          <Input 
            targetValue='ownerContact'
            register={register("ownerContact")}
            className='border-none mb-2 mt-4 w-1/2'
            title='Phone Number'
            errors={errors}
            withErrorMessage
            isRequired
            withTitle
          />
        </div>
        {/* <div className="text-xl text-vaccination-color font-bold border-b border-b-vaccination-color mt-4">Veterinarian</div>
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
        </div> */}
        <div className="flex justify-between py-4">
          <button className={styles.hollowButton} type='button' onClick={() => {
            if(isDirty || petImage) {
              let text = "You have changes that haven't been saved. Are you sure you want to cancel your changes?";
              if (confirm(text) == true) {
                reset();
                resetFormValues();
                setShowAppointmentForm(false);
                setIsEdit(false);
              }
            } else {
              reset();
              resetFormValues();
              setShowAppointmentForm(false);
              setIsEdit(false);
            }
          }}>Cancel</button>
          <button className={styles.mainButton} type='submit' disabled={!isValid}>Save</button>
        </div>
      </form>
    </Modal>
  )
}

export default AppointmentsForm