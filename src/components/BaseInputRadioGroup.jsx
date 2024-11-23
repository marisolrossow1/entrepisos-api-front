import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const BaseRadioInputGroup = ({ label, id, options = [], value, onChange }) => {
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby={id}
                value={value}
                name="radio-buttons-group"
                onChange={onChange}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default BaseRadioInputGroup;