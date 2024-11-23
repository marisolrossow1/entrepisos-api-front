import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid2, Box } from '@mui/material';
import BaseLoader from '../loader/BaseLoader.jsx';
import BaseAlert from '../BaseAlert.jsx';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton.jsx';
import { getBuildingId } from '../../services/buildings.service.js';

const BuildingDetail = () => {
    const { buildingId } = useParams();
    const [building, setBuilding] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBuilding = async () => {
        setLoading(true);
        setError(null);
        try {
            const buildingData = await getBuildingId(buildingId);
            setBuilding(buildingData);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error?.mensaje || error);
            setError(`Error al cargar los datos del edificio. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => { fetchBuilding(); }, [buildingId]);

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
                description={`${error}`}
            />
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Card sx={{ maxWidth: 600, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: '600' }}>
                        Detalles del Edificio
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Dirección:</span> {building.location}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Tipo:</span> {building.type}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="subtitle1">
                                <span style={{ fontWeight: '600' }}>Barrio:</span> {building.district}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Link to={`/edificios`}>
                            <LinkButton text="Volver a la lista de edificios" />
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BuildingDetail;