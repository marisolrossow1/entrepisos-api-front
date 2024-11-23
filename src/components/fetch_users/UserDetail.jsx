import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid2, Box, Button } from '@mui/material';
import BaseLoader from '../loader/BaseLoader.jsx';
import BaseAlert from '../BaseAlert.jsx';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton.jsx';
import perfil from '../../assets/perfil.png';
import { getUserId } from '../../services/users.service.js';

const UserDetail = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getUserId(userId);
            setUser(userData);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error?.mensaje || error);
            setError(`Error al cargar los datos del usuario. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUser() }, [userId]);

    // Muestra el loader si está cargando
    if (loading) {
        return <BaseLoader />;
    }

    // Si hubo un error, muestra el mensaje de error
    if (error) {
        return (
            <BaseAlert 
                severity="error" 
                title="Error" 
                description={error}
            />
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Card sx={{ maxWidth: 600, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: '600' }}>
                        Detalles del Usuario
                    </Typography>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <img 
                            src={perfil} 
                            alt="Foto de perfil" 
                            style={{ width: '40px', height: '40px' }} 
                        />
                    </Box>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Nombre:</span> {user?.name} {user?.surname}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Email:</span> {user?.email}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>DNI:</span> {user?.dni}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Edad:</span> {user?.age}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Descripción:</span> {user?.description || "Sin especificar."}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Tipo de edificio:</span> {user?.buildings?.[0]?.type || "Sin especificar."}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Link to={`/usuarios`}>
                            <LinkButton text="Volver a la lista de usuarios" />
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserDetail;