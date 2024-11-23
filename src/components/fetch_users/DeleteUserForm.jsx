import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { deleteUser } from '../../services/users.service.js';
import { useDeleteUser } from '../contexts/Users.context.jsx';

const DeleteUserForm = ({ userId }) => {
    const deleteUserContext = useDeleteUser();
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
            await deleteUser(userId);

            setShowConfirmAlert(false);
            setShowSuccessAlert(true);

            deleteUserContext(userId); // Eliminar del context
        } catch (error) {
            setShowConfirmAlert(false);
            setShowErrorAlert(true);

            console.error(`Error al eliminar el usuario: ${error?.mensaje ? 'Detalle: ' + error.mensaje : ''}`);
        }
    }

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
                        <Button color="info.main" size="small" onClick={confirmDelete}>
                            Confirmar
                        </Button>
                    }
                >
                    ¿Está seguro de que quiere borrar el usuario?
                </Alert>
            </Snackbar>

            <Snackbar
                open={showSuccessAlert}
                onClose={() => setShowSuccessAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert severity="success">Usuario eliminado con éxito.</Alert>
            </Snackbar>

            <Snackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert severity="error">Error al eliminar el usuario.</Alert>
            </Snackbar>
        </>
    );
};


export default DeleteUserForm;