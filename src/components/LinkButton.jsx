import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

/**
 * LinkButton
 * Botón que actúa como enlace, adecuado para acciones como "Agregar usuario".
 * 
 * @param {function} handleClick - Función a ejecutar cuando se hace clic en el botón.
 * @param {string} text - Texto a mostrar en el botón.
 * 
 * @returns {JSX.Element} Un botón estilo enlace.
 */
const LinkButton = ({ handleClick, text = 'Agregar usuario', sx = {} }) => {
    const theme = useTheme();

    return (
        <Button
            onClick={handleClick}
            variant="text"
            // Agregar para evitar errores de semántica:
            // component="Link"
            // to={to}
            sx={{
                color: theme.palette.background.default,
                textTransform: 'none',  backgroundColor: theme.palette.primary.main, boxShadow: 'none', borderRadius:'0px', letterSpacing: '0.5px',
                '&:hover': {
                    backgroundColor: theme.palette.primary.light, color: theme.palette.background.default,
                    textDecoration: 'none', boxShadow: 'none', 
                },
                ...sx,
            }}
        >
            {text}
        </Button>
    );
};

export default LinkButton;