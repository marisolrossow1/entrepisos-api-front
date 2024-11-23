import { createContext, useContext, useState, useCallback } from "react";

// 1. Declarar estado global.
// createContext() - Crea un context.
const UsersContext = createContext();

/**
 * Propio hook para llamar directamente al UsersContext.
 * @returns {} - Valor superglobal: UsersContext
 */
function useUsers(){
    return useContext(UsersContext)
}

/**
 * Hook para obtener la lista global de usuarios.
 * @returns {Array} - Lista de usuarios.
 */
function useUserList() {
    const { users } = useUsers();
    return users;
}

/**
 * Hook para agregar un nuevo usuario.
 * @returns {Function} - Función para agregar un usuario.
 */
function useAddUser() {
    const { addUser } = useUsers();
    return addUser;
}

/**
 * Hook para actualizar un usuario existente.
 * @returns {Function} - Función para actualizar un usuario.
 */
function useUpdateUser() {
    const { updateUser } = useUsers();
    return updateUser;
}

/**
 * Hook para eliminar un usuario.
 * @returns {Function} - Función para eliminar un usuario.
 */
function useDeleteUser() {
    const { deleteUser } = useUsers();
    return deleteUser;
}

function UsersProvider({ children }){
    const [users, setUsers] = useState([]);

    /**
     * Función para agregar un usuario.
     * @param {Object} newUser - Nuevo usuario a agregar.
     */
    const addUser = useCallback(
        (newUser) => {
            setUsers((prevUsers) => [...prevUsers, newUser]);
        },
        [setUsers]
    );

    /**
     * Función para actualizar un usuario existente.
     * @param {Object} updatedUser - Usuario actualizado.
     */
    const updateUser = useCallback(
        (updatedUser) => {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
        },
        [setUsers]
    );

    /**
     * Función para eliminar un usuario.
     * @param {Number} userId - ID del usuario a eliminar.
     */
    const deleteUser = useCallback(
        (userId) => {
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            );
        },
        [setUsers]
    );

    return (
        // A estos se accede como objeto:
        <UsersContext.Provider value={{ users, setUsers, addUser, updateUser, deleteUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export { UsersContext, UsersProvider, useUsers, useUserList, useAddUser, useUpdateUser, useDeleteUser };