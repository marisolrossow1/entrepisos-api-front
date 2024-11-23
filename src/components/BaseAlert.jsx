import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

/**
 * /**
 * Componente `BaseAlert`
 * Un componente de alerta reutilizable basado en Material-UI para mostrar
 * mensajes de distintos niveles de severidad, con un título y descripción personalizados.
 *
 * @param {string} severity - Nivel de severidad de la alerta. Valores posibles: 'error' (por defecto), 'warning', 'info', 'success'. Controla el color y estilo de la alerta.
 * @param {string} title - Título de la alerta. Por defecto, se muestra "Error".
 * @param {string} description - Descripción o mensaje de la alerta. Por defecto, se muestra "Hubo un problema". Puede incluir detalles adicionales.
 * 
 * @returns {JSX.Element} Un elemento `Alert` de Material-UI con un título y mensaje de descripción.
 *                        El diseño y color del componente se ajustan según el nivel de severidad indicado.
 * 
 * @example
 * <BaseAlert 
 *     severity="error" 
 *     title="Error de conexión" 
 *     description="No se pudo conectar al servidor. Intente nuevamente más tarde."
 * />
 */
const BaseAlert = ({ severity = 'error', title = 'Error', description = 'Hubo un problema' }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  )
}

export default BaseAlert