import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../BaseButton.jsx';
import BaseInput from '../BaseInput.jsx';
import { Grid2, Typography, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton.jsx';
import { addUser, getUsers } from '../../services/users.service.js';
import { useAddUser, useUserList, useUsers } from '../contexts/Users.context.jsx';

const AddUser = () => {
    const addUserContext = useAddUser(); // Agregar desde context
    const users = useUserList(); // Acceso a la lista de usuarios
    const { setUsers } = useUsers(); // setear esa lista
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [dni, setDni] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const fetchUsers = async () => {
        setError(null);
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            setError(`Error al cargar los usuarios. ${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const emailExists = users.some((user) => user.email === email);
        const phoneNumberExists = users.some((user) => user.phone_number === phone_number);
        const dniExists = users.some((user) => user.dni === dni);

        if (emailExists) {
            setError('El correo electrónico ya está registrado.');
            setLoading(false);
            return;
        }

        if (phoneNumberExists) {
            setError('El celular ya está registrado.');
            setLoading(false);
            return;
        }

        if(dniExists) {
            setError('El DNI ya está registrado.');
            setLoading(false);
            return;
        }

        if (age < 18) {
            setError('El usuario debe ser mayor de 18 años.');
            setLoading(false);
            return;
        }

        try {
            const newUser = await addUser(name, surname, email, phone_number, dni, age, description)

            addUserContext(newUser); // Agregar para contexto

            
            setSnackbarMessage('Usuario agregado con éxito');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            
            setTimeout(() => {
                navigate('/usuarios');
                
                setName('');
                setSurname('');
                setEmail('');
                setPhoneNumber('');
                setDni('');
                setAge('');
                setDescription('');
                setError(null);
            }, 3000);
            
        } catch (error) {
            setError(`Error al crear usuario. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`)
            console.error('Error al agregar el usuario:', error);
            setSnackbarMessage('Hubo un error al agregar el usuario');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose =  () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4 mt-6">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                Agregar Usuario
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
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="email"
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        type="email"
                    />
                </Grid2>

                {/* Celular */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <BaseInput
                        id="phone_number"
                        label="Celular"
                        placeholder="11 3806 4499"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={true}
                        type="tel"
                    />
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
                        type="number"
                    />
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
                </Grid2>

                {/* Descripcion */}
                <Grid2 size={12}>
                    <BaseInput
                        id="description"
                        label="Descripción"
                        placeholder="Descripción corta"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                    />
                </Grid2>
            </Grid2>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-evenly mt-4">
                <Link to={`/usuarios`}>
                    <LinkButton text="Volver" />
                </Link>
                <BaseButton 
                    loading={loading} 
                    text="Agregar Usuario" 
                />
            </div>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={60000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            >

                <Alert
                onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: snackbarSeverity === 'success' ? 'success.light' : 'error', color: 'text.default'}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default AddUser;