import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function BSSwitch(props) {
    const { label, checked, disabled, onChange } = props;

    return (
        <FormGroup>
            <FormControlLabel control={<Switch />} checked={checked} disabled={disabled} label={label} onChange={onChange} />
        </FormGroup>
    );
}

// for pass component

// <BSSwitch checked="true" label="check" />