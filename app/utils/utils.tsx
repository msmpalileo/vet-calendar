import moment from 'moment';

//Types
import { SlotType } from '@/types/appointments';

export const getSlots = (date: string | Date, startOfDay = 5, endOfDay = 18) => {
  const start = moment(date).startOf('day').add(startOfDay, 'hours');
  const end = moment(date).startOf('day').add(endOfDay, 'hours');
  const slots: SlotType[] = [];
  const schedules: any[] = [];

  while(start.hour() <= end.hour()) {
    schedules.push(start.toString());
    start.add(30, 'minutes');
  }
  schedules.pop();
  for(let x = 0; x <= schedules.length; x++) {
    slots.push({
      number: x,
      start: schedules[x],
      end: schedules[x+1],
    })
  }
  slots.splice(slots.length-2, 2);

  return slots;
}