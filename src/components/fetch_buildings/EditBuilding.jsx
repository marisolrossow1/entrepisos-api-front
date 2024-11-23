import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid2, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton';
import BaseInputRadioGroup from '../BaseInputRadioGroup';
import { useUpdateBuilding } from '../contexts/Buildings.context';
import { editBuilding, getBuildingId } from '../../services/buildings.service';

const districts = {
    Caba: ['Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito', 'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'Boca', 'Paternal', 'Liniers', 'Mataderos', 'Monte Castro', 'Montserrat', 'Pompeya', 'Nuñez', 'Palermo', 'Parque Avellaneda', 'Parque Chacabuco', 'Parque Chas', 'Parque Patricios', 'Puerto Madero', 'Recoleta', 'Retiro', 'Saavedra', 'San Cristóbal', 'San Nicolás', 'San Telmo', 'Versalles', 'Villa Crespo', 'Villa Devoto', 'Villa General Mitre', 'Villa Lugano', 'Villa Luro', 'Villa Ortúzar', 'Villa Pueryrredón', 'Villa Real', 'Villa Riachuelo', 'Villa Santa Rita', 'Villa Soldati', 'Villa Urquiza', 'Villa del Parque', 'Vélez Sarsfield'],
};

const EditBuilding = () => {
    const editBuildingContext = useUpdateBuilding();
    const { buildingId } = useParams();
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [district, setDistrict] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const fetchBuilding = async () => {
        try {
            const buildingData = await getBuildingId(buildingId);

            setLocation(buildingData.location);
            setType(buildingData.type);
            setDistrict(buildingData.district);
        } catch (error) {
            setError(`Error al editar el edificio. ${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
        }
    };
    useEffect(() => { fetchBuilding(); }, [buildingId]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedBuilding = await editBuilding(buildingId, location, type, district)

            console.log('Edificio actualizado con éxito:', updatedBuilding);
            editBuildingContext(updatedBuilding); // Actualiza en BuildingsContext

            setSnackbarMessage('Edificio actualizado con éxito');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setFormErrors({});
            setError(null);

            setTimeout(() => {
                setLocation('');
                setType('');
                setDistrict('');
                navigate('/edificios'); 
            }, 3000);

        } catch (error) {
            setError(`Error al editar edificio. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`)
            console.error('Error al actualizar el edificio:', error);
            setSnackbarMessage('Hubo un error al editar al edificio');
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
                Editar Edificio
            </Typography>

            <Grid2 container spacing={2}>
                {/* Dirección */}
                <Grid2 size={12}>
                    <BaseInput
                        id="location"
                        label="Dirección"
                        placeholder="Dirección"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required={true}
                    />
                    {formErrors.location && <p className="text-red-500 text-sm mt-2">{formErrors.location[0]}</p>}
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
                    {formErrors.type && <p className="text-red-500 text-sm mt-2">{formErrors.type[0]}</p>}
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
                    {formErrors.district && <p className="text-red-500 text-sm mt-2">{formErrors.district[0]}</p>}
                </Grid2>
            </Grid2>

            {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}

            <div className="flex justify-evenly mt-4">
                <Link to={`/edificios`}>
                    <LinkButton text="Volver" />
                </Link>
                <BaseButton handleClick={handleSubmit} text="Actualizar Edificio" loading={loading} />
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

export default EditBuilding;