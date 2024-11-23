import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { deleteBuilding } from '../../services/buildings.service.js';
import { useDeleteBuilding } from '../contexts/Buildings.context.jsx';

const DeleteBuildingForm = ({ buildingId }) => {
    const deleteBuildingContext = useDeleteBuilding();
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const theme = useTheme();

    const handleDelete = async (e) => {
        e.preventDefault();
        setShowConfirmAlert(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteBuilding(buildingId);

            setShowConfirmAlert(false);
            setShowSuccessAlert(true);
            deleteBuildingContext(buildingId); // Borra del context
        } catch (error) {
            setShowConfirmAlert(false);
            setShowErrorAlert(true);
            console.error(`Error al eliminar el edificio: ${error?.mensaje ? 'Detalle: ' + error.mensaje : ''}`);
        }
    };

    return (
        <>
            <form onSubmit={handleDelete}>
                <Button
                    type="submit"
                    variant="text"
                    sx={{
                        color: theme.palette.background.default,
                        textTransform: 'none',
                        backgroundColor: '#FF5200',
                        boxShadow: 'none',
                        borderRadius: '0px',
                        letterSpacing: '0.5px',
                        '&:hover': {
                            backgroundColor: '#FF8226',
                            color: '#0E0E0E',
                            textDecoration: 'none',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Borrar
                </Button>
            </form>

            <Snackbar
                open={showConfirmAlert}
                onClose={() => setShowConfirmAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
            >
                <Alert
                    severity="warning"
                    action={
                        <Button color="inherit" size="small" onClick={confirmDelete}>
                            Confirmar
                        </Button>
                    }
                >
                    ¿Está seguro de que quiere borrar el edificio?
                </Alert>
            </Snackbar>

            <Snackbar
                open={showSuccessAlert}
                onClose={() => setShowSuccessAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert severity="success">Edificio eliminado con éxito.</Alert>
            </Snackbar>

            <Snackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert severity="error">Error al eliminar el edificio.</Alert>
            </Snackbar>
        </>
    );
};

export default DeleteBuildingForm;