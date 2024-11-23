import React, { useState } from 'react';
import { Grid2, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BaseInputRadioGroup from '../BaseInputRadioGroup.jsx';
import BaseButton from '../BaseButton.jsx';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton.jsx';
import { addBuilding } from '../../services/buildings.service.js';
import { useAddBuilding, useBuildingList, useBuildings } from '../contexts/Buildings.context.jsx';

const districts = {
    Caba: ['Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito', 'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'Boca', 'Paternal', 'Liniers', 'Mataderos', 'Monte Castro', 'Montserrat', 'Pompeya', 'Nuñez', 'Palermo', 'Parque Avellaneda', 'Parque Chacabuco', 'Parque Chas', 'Parque Patricios', 'Puerto Madero', 'Recoleta', 'Retiro', 'Saavedra', 'San Cristóbal', 'San Nicolás', 'San Telmo', 'Versalles', 'Villa Crespo', 'Villa Devoto', 'Villa General Mitre', 'Villa Lugano', 'Villa Luro', 'Villa Ortúzar', 'Villa Pueryrredón', 'Villa Real', 'Villa Riachuelo', 'Villa Santa Rita', 'Villa Soldati', 'Villa Urquiza', 'Villa del Parque', 'Vélez Sarsfield'],
};

const AddBuilding = () => {
    const addBuildingContext = useAddBuilding(); // Agregar desde context
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Departamento');
    const [district, setDistrict] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  

        if (!location || !type || !district) {
            setError('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }

        try {
            const newBuilding = await addBuilding(location, type, district)

            addBuildingContext(newBuilding);
            setSnackbarMessage('Edificio agregado con éxito');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            
            setTimeout(() => {
                navigate('/edificios');
                setLocation('');
                setType('');
                setDistrict('');
                setError(null);
            }, 3000);
        } catch (error) {
            setError(`Error al crear edificio. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`)
            console.error('Error al agregar el edificio:', error);
            setSnackbarMessage('Hubo un error al agregar el edificio');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally{
            setLoading(false)
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4 mt-6">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                Agregar Edificio
            </Typography>

            <Grid2 container spacing={2}>
                {/* Dirección con input de texto normal */}
                <Grid2 size={12}>
                    <TextField
                        label="Dirección"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </Grid2>

                {/* Tipo de Edificio */}
                <Grid2 size={12}>
                    <BaseInputRadioGroup
                        label="Tipo de edificio:"
                        id="type-select"
                        value={type}
                        options={[
                            { value: 'Departamento', label: 'Departamento' },
                            { value: 'PH', label: 'PH' },
                        ]}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Grid2>

                {/* Barrio */}
                <Grid2 size={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="district-label">Barrio</InputLabel>
                        <Select
                            labelId="district-label"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            label="Barrio"
                        >
                            {districts.Caba.map((district) => (
                                <MenuItem key={district} value={district}>
                                    {district}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
            </Grid2>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-evenly mt-4">
                <Link to={`/edificios`}>
                    <LinkButton text="Volver" />
                </Link>
                <BaseButton handleClick={handleSubmit} loading={loading} text="Agregar Edificio" />
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={60000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: snackbarSeverity === 'success' ? 'success.light' : 'error', color: 'text.default'}}>
                {snackbarMessage}
            </Alert>
            </Snackbar>
        </form>
    );
};

export default AddBuilding;