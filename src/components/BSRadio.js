import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function BSRadio(props) {
    const { title, options, onChange, defaultValue } = props

    return (
        <FormControl sx={{ m: 1 }}>
            <FormLabel>{title}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={defaultValue}
            >
                {options.map((x, i) => (
                    <FormControlLabel value={x.displayName} control={<Radio />} key={i} label={x.displayName} onChange={onChange} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

{/* <BSRadio title="Gender" options={
    [
        {
            displayName: "User Name",
            key: "name",
        },
        {
            displayName: "User Email",
            key: "email",
        },
    ]} /> */}
