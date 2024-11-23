import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteBuildingForm from './DeleteBuildingForm.jsx';
import TextField from '@mui/material/TextField';
import CustomDataGrid from '../DataGrid.jsx';
import LinkButton from '../LinkButton.jsx';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BaseAlert from '../BaseAlert.jsx';
import BaseLoader from '../loader/BaseLoader.jsx';
import { getBuildings } from '../../services/buildings.service.js';
import { useBuildingList, useBuildings } from '../contexts/Buildings.context.jsx';

const ListBuildings = () => {
    const buildings = useBuildingList(); // Lista de edificios de context
    const { setBuildings } = useBuildings();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setError(null);
    };

    const fetchBuildings = async () => {
        setLoading(true);
        setError(null);
        try {
            const buildingsData = await getBuildings(searchTerm)

            setBuildings(buildingsData.length > 0 ? buildingsData : []);
            setError(buildingsData.length === 0 ? 'Ningún resultado coincide con la búsqueda.' : null);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error?.mensaje || error);
            setError(`Error al cargar los edificios. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
            setBuildings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBuildings(); }, [searchTerm]);

    const columns = [
        { field: 'location', headerName: 'Dirección', width: 180 },
        { field: 'type', headerName: 'Tipo', width: 130 },
        { field: 'district', headerName: 'Barrio', width: 130 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 240,
            renderCell: (params) => {
                return (
                    <div className="flex gap-2">
                        <Link to={`/edificios/${params.row.id}`}>
                            <LinkButton text="Ver"
                                sx={{
                                    color: theme.palette.background.default,
                                    textTransform: 'none',
                                    backgroundColor: theme.palette.primary.main,
                                    boxShadow: 'none',
                                    borderRadius: '0px',
                                    letterSpacing: '0.5px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.background.default,
                                        textDecoration: 'none', boxShadow: 'none',
                                    },
                                }}>
                            </LinkButton>
                        </Link>
                        <Link to={`/editar-edificios/${params.row.id}`}>
                            <LinkButton text="Editar"
                                sx={{
                                    color: theme.palette.text.default,
                                    textTransform: 'none',
                                    backgroundColor: theme.palette.secondary.main,
                                    boxShadow: 'none',
                                    borderRadius: '0px',
                                    letterSpacing: '0.5px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.light,
                                        color: theme.palette.text.default,
                                        textDecoration: 'none', boxShadow: 'none',
                                    },
                                }}>
                            </LinkButton>
                        </Link>

                        <DeleteBuildingForm buildingId={params.row.id} />
                    </div>
                );
            },
        },
    ];

    const rows = buildings.map(building => ({
        id: building.id,
        location: building.location,
        type: building.type,
        district: building.district,
    }));

    return (
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 mt-6 mb-10">
            <div className="items-center justify-between md:flex mb-4">
                <div className="max-w-lg">
                    <Typography variant="h1" gutterBottom sx={{ fontWeight: '600', fontSize: '1.5rem' }}>
                        Lista de edificios
                    </Typography>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: '400', fontSize: '1rem', marginTop: '1rem' }}>
                        Podés agregar, editar, eliminar y ver en detalle a los edificios.
                    </Typography>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link to={`/agregar-edificios`}>
                        <LinkButton text="Agregar Edificio"></LinkButton>
                    </Link>
                </div>
            </div>

            <div className="mb-4">
                <TextField
                    label="Buscar Edificio"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Calle"
                />
            </div>

            {error ? (
                <BaseAlert 
                    severity="error" 
                    title="Error" 
                    description={'Ningún resultado coincide con la búsqueda'}
                />
            ) : null}

            {!error && (
                <>
                    {loading ? (
                        <BaseLoader />
                    ) : (
                        <>
                            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                                <CustomDataGrid rows={rows} columns={columns} />
                            </div>
                        </>
                    )}
                </>
            )}
        </section>
    );
};

export default ListBuildings;