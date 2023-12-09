// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// export default function BSDateTimePicker(a) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker']}>
//         <DateTimePicker label="Basic date time picker" onChange={a.onChange} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BSDateTimePicker(props) {
    const { value, onChange } = props;

    return (
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //   <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        //     <DateTimePicker
        //       label="Pick-Up Time"
        //       value={value}
        //       onChange={(newValue) => setValue(newValue)}
        //     />
        //   </DemoContainer>
        // </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <DateTimePicker
                    value={value}
                    label="Pick-Up Time"
                    onChange={(newValue) => {
                        // Call the parent component's onChange handler to update the state
                        if (onChange) {
                            onChange(newValue);
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}