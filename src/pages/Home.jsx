import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinkButton from '../components/LinkButton';
import { Grid2 } from '@mui/material'; 
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Home = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: `calc(100vh - 65px)`,
                padding: '2rem',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" gutterBottom 
                sx={{
                    color: theme.palette.primary.main,
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                }}>
                Bienvenido a la API de EntrePisos
            </Typography>

            <Typography variant="h2" gutterBottom
                sx={{
                    color: theme.palette.secondary.error,
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
            >
                Donde podés gestionar la información de edificios y usuarios de manera eficiente.
            </Typography>

            <Grid2 container spacing={4} justifyContent="center" sx={{ marginTop: '2rem' }}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}> {/* Usando Grid2 correctamente */}
                    <Card sx={{ width: '100%', boxShadow: 1 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Gestión de Usuarios
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                                Consultá, agregá, editá o eliminá toda la información de los usuarios en la plataforma.
                            </Typography>
                            <Link to={`/usuarios`}>
                                <LinkButton text="Ver Usuarios" sx={{ width: '100%' }} />
                            </Link>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ width: '100%', boxShadow: 1 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Gestión de Edificios
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                                Consultá, agregá, editá o eliminá los datos de los edificios administrados por EntrePisos.
                            </Typography>
                            <Link to={`/edificios`}>
                                <LinkButton text="Ver Edificios" sx={{ width: '100%' }} />
                            </Link>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Home;