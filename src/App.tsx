import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import Calendar from './components/Calendar/index';

import './App.css';

function App() {
  const [initDate, setInitDate] = useState<Dayjs>(dayjs('2024-3-20'));

  return (
    <>
      <Calendar
        defaultValue={dayjs('2024/1/20')}
        value={initDate}
        locale='zh-CN'
        onChange={date => setInitDate(date)}
      />
      <hr />
      <Calendar
        locale='en-US'
        defaultValue={dayjs('2024-1-20')}
        dateRender={date => <p style={{ background: 'yellowgreen', height: '50px' }}>{date.format('YYYY_MM/DD')}</p>}
      />
      <hr />
      <Calendar
        defaultValue={dayjs('2024-1-20')}
        dateInnerContent={date => (
          <p style={{ background: 'greenyellow', height: '50px' }}>{date.format('YYYY年MM月DD日')}</p>
        )}
      />
    </>
  );
}

export default App;
