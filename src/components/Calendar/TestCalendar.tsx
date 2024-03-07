import { useEffect, useRef } from 'react';

import Calendar, { CalendarRef } from './Calendar';

const TestCalendar = () => {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2020, 10, 1));
    }, 3000);
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <Calendar value={new Date(2024, 5, 1)} onChange={value => console.log(value.toLocaleDateString())} />
      <Calendar value={new Date('2024-8-15')} onChange={value => console.log(value.toLocaleDateString())} />

      <Calendar ref={calendarRef} />
    </div>
  );
};

export default TestCalendar;
