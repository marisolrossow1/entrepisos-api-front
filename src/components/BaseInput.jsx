import React from 'react';
import TextField from '@mui/material/TextField';

const BaseInput = ({id = 'IdEjemplo', required = false, label= 'Label', placeholder='Ejemplo', value = '', onChange, type = 'text' }) => {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      fullWidth
    />
  )
}

export default BaseInput