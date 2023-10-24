import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BSInput(props) {
    const { label, variant, required, disabled, type, size, fullWidth, onChange, placeholder } = props

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField label={label} variant={variant} required={required} disabled={disabled}
                type={type} size={size} fullWidth={fullWidth} onChange={onChange} placeholder={placeholder} />
        </Box>
    );
}

// for pass component

// <BSInput fullWidth="true" />