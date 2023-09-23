import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {useState} from 'react';

function Datepicker() {
  const [value, setValue] = useState(new Date());
    return (
        <div className='p-5'>
            <DateTimePicker onChange={setValue} value={value} />
        </div>
    )
}

export default Datepicker;