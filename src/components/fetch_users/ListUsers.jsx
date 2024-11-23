import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getUsers } from '../../services/users.service.js';
import DeleteUserForm from './DeleteUserForm';
import BaseLoader from '../loader/BaseLoader.jsx';
import BaseAlert from '../BaseAlert.jsx';
import LinkButton from '../LinkButton.jsx';
import CustomDataGrid from '../DataGrid.jsx';
import perfil from '../../assets/perfil.png';
import { useUserList, useUsers } from "../contexts/Users.context.jsx";

const ListUsers = () => {
    const users = useUserList(); // Acceso a la lista de usuarios
    const { setUsers } = useUsers(); // setear esa lista
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const theme = useTheme();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setError(null)
    };


    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const usersData = await getUsers(searchTerm);
            setUsers(usersData.length > 0 ? usersData : []);
            setError(usersData.length === 0 ? 'Ningún resultado coincide con la búsqueda.' : null);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error?.mensaje || error);
            setError(`Error al cargar los usuarios. Intenta nuevamente.${error?.mensaje ? " Detalle: " + error.mensaje : ""}`);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [searchTerm]);
    
    // Definir las columnas para el DataGrid
    const columns = [
        { field: 'profilePicture', headerName: 'Foto de Perfil', width: 110, renderCell: () => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img 
                    src={perfil} 
                    alt="Foto de perfil" 
                    style={{ width: '40px', height: '40px' }} 
                />
                </div>
            ),
        },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nombre', width: 180 },
        { field: 'surname', headerName: 'Apellido', width: 180 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'dni', headerName: 'DNI', width: 120 },
        { field: 'age', headerName: 'Edad', type: 'number', width: 110 },
        { field: 'actions', headerName: 'Acciones', width: 240, renderCell: (params) => {
            return  (
                <div className="flex gap-2">
                    <Link to={`/usuario/${params.row.id}`}>
                        <LinkButton text="Ver" 
                            sx={{
                                color: theme.palette.background.default,
                                textTransform: 'none',
                                backgroundColor: theme.palette.primary.main,
                                boxShadow: 'none', 
                                borderRadius:'0px', 
                                letterSpacing: '0.5px',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light, 
                                    color: theme.palette.background.default,
                                    textDecoration: 'none', boxShadow: 'none', 
                                },
                            }}>
                        </LinkButton>
                    </Link>
                    <Link to={`/editar-usuario/${params.row.id}`}>
                        <LinkButton text="Editar"
                            sx={{
                                color: theme.palette.text.default,
                                textTransform: 'none',
                                backgroundColor: theme.palette.secondary.main,
                                boxShadow: 'none', 
                                borderRadius:'0px', 
                                letterSpacing: '0.5px',
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.light, 
                                    color: theme.palette.text.default,
                                    textDecoration: 'none', boxShadow: 'none', 
                                },
                            }}>
                        </LinkButton>
                    </Link>
                    
                    <DeleteUserForm userId={params.row.id}/>
                </div>
            )  
         },
        }
    ];

    const rows = users.map(user => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        age: user.age,
        dni: user.dni,
        description: user.description,
    }));

    return (
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 mt-6 mb-10">
            <div className="items-center justify-between md:flex mb-4">
                <div className="max-w-lg">
                    <Typography variant="h1" gutterBottom sx={{ fontWeight: '600', fontSize: '1.5rem' }}>
                        Lista de usuarios
                    </Typography>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: '400', fontSize: '1rem', marginTop: '1rem' }}>
                    Podés agregar, editar, eliminar y ver en detalle a los usuarios.
                    </Typography>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link to={`/agregar-usuario`}>
                        <LinkButton text="Agregar Usuario"></LinkButton>
                    </Link>
                </div>
            </div>

            <div className="mb-4">
                <TextField
                    label="Buscar Usuario"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Nombre, email, apellido, etc."
                />
            </div>

            {error ? (
                <BaseAlert 
                    severity="error" 
                    title="Error" 
                    description={error}
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

export default ListUsers;