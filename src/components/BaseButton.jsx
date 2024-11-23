import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';

/**
 * BaseButton
 * Botón personalizado reutilizable que muestra un indicador de carga.
 * 
 * @param {function} handleClick - Función a ejecutar cuando se hace clic en el botón.
 * @param {boolean} loading - Estado de carga del botón. Cuando es true, muestra el indicador de carga.
 * @param {string} text - Texto a mostrar en el botón.
 * 
 * @returns {JSX.Element} Un botón con un indicador de carga si está en proceso.
 */
const BaseButton = ({ loading, text = 'Enviar' }) => {
    const theme = useTheme();

    return (
        <LoadingButton
            loading={loading}
            type="submit"
            // onClick={handleClick}
            variant="contained"
            sx={{ color: theme.palette.background.default, backgroundColor: '#FF5200', borderRadius:'0px', boxShadow: 'none', textTransform: 'none', letterSpacing: '0.5px',
            '&:hover': {
                backgroundColor: '#FF8226',
                color: '#0E0E0E',
                boxShadow: 'none', 
            }, }}
        >
            {text}
        </LoadingButton>
    );
};

export default BaseButton;