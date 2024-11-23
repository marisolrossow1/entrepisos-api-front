import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid2, Typography, Snackbar, Alert } from '@mui/material';
import BaseButton from '../BaseButton.jsx';
import BaseInput from '../BaseInput.jsx';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton.jsx';
import { editUser, getUserId } from '../../services/users.service.js';
import { useUpdateUser } from '../contexts/Users.context.jsx';

const EditUser = () => {
    const editUserContext = useUpdateUser();
    const { userId } = useParams();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const userData = await getUserId(userId);
            setName(userData.name);
            setSurname(userData.surname);
            setEmail(userData.email);
            setDni(userData.dni);
            setAge(userData.age);
            setDescription(userData.description);
            
        } catch (error) {
            setError(`Error al editar el usuario. ${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
        }
    };

    useEffect(() => { fetchUser(); }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedUser = await editUser(userId, name, surname, email, dni, age, description)

            console.log('Usuario actualizado con éxito:', updatedUser);
            editUserContext(updatedUser); // Actualiza en UsersContext

            setSnackbarMessage('Usuario actualizado con éxito');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setFormErrors({});
            setError(null);
            
            setTimeout(() => {
                navigate('/usuarios');
    
                setName('');
                setSurname('');
                setEmail('');
                setDni('');
                setAge('');
                setDescription('');
            }, 3000);
        } catch (error) {
            setError(`Error al editar usuario. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`)
            console.error('Error al actualizar el usuario:', error);
            setSnackbarMessage('Hubo un error al editar al usuario');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4 mt-6">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                Editar Usuario
            </Typography>

            <Grid2 container spacing={2}>
                {/* Nombre y Apellido en dos columnas */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="name"
                        label="Nombre"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="surname"
                        label="Apellido"
                        placeholder="Apellido"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required={true}
                    />
                </Grid2>

                {/* Correo electrónico */}
                <Grid2 size={12}>
                    <BaseInput
                        id="email"
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        type="email"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-2">{formErrors.email[0]}</p>}
                </Grid2>

                {/* DNI */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="dni"
                        label="DNI"
                        placeholder="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        required={true}
                        type="text"
                    />
                    {formErrors.dni && <p className="text-red-500 text-sm mt-2">{formErrors.dni[0]}</p>}
                </Grid2>

                {/* Edad */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="age"
                        label="Edad"
                        placeholder="Edad"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required={true}
                        type="number"
                    />
                    {formErrors.age && <p className="text-red-500 text-sm mt-2">{formErrors.age[0]}</p>}
                </Grid2>

                {/* Descripcion */}
                <Grid2 size={12}>
                    <BaseInput
                        id="description"
                        label="Descripción"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                        type="text"
                    />
                    {formErrors.description && <p className="text-red-500 text-sm mt-2">{formErrors.description[0]}</p>}
                </Grid2>
            </Grid2>

            {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}

            <div className="flex justify-evenly mt-4">
                <Link to={`/usuarios`}>
                    <LinkButton text="Volver" />
                </Link>
                <BaseButton
                    loading={loading} 
                    text="Actualizar Usuario"
                />
            </div>

            <Snackbar
            open={snackbarOpen}
            autoHideDuration={60000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: snackbarSeverity === 'success' ? 'success.light' : 'error', color: 'text.default'}}>
                {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default EditUser;