import { createContext, useContext, useState, useCallback } from "react";

// 1. Declarar estado global.
const BuildingsContext = createContext();

/**
 * Propio hook para llamar directamente al BuildingsContext.
 * @returns {} - Valor superglobal: BuildingsContext
 */
function useBuildings() {
    return useContext(BuildingsContext);
}

/**
 * Hook para obtener la lista global de edificios.
 * @returns {Array} - Lista de edificios.
 */
function useBuildingList() {
    const { buildings } = useBuildings();
    return buildings;
}

/**
 * Hook para agregar un nuevo edificio.
 * @returns {Function} - Función para agregar un edificio.
 */
function useAddBuilding() {
    const { addBuilding } = useBuildings();
    return addBuilding;
}

/**
 * Hook para actualizar un edificio existente.
 * @returns {Function} - Función para actualizar un edificio.
 */
function useUpdateBuilding() {
    const { updateBuilding } = useBuildings();
    return updateBuilding;
}

/**
 * Hook para eliminar un edificio.
 * @returns {Function} - Función para eliminar un edificio.
 */
function useDeleteBuilding() {
    const { deleteBuilding } = useBuildings();
    return deleteBuilding;
}

function BuildingsProvider({ children }) {
    const [buildings, setBuildings] = useState([]);

    /**
     * Función para agregar un edificio.
     * @param {Object} newBuilding - Nuevo edificio a agregar.
     */
    const addBuilding = useCallback(
        (newBuilding) => {
            setBuildings((prevBuildings) => [...prevBuildings, newBuilding]);
        },
        [setBuildings]
    );

    /**
     * Función para actualizar un edificio existente.
     * @param {Object} updatedBuilding - Edificio actualizado.
     */
    const updateBuilding = useCallback(
        (updatedBuilding) => {
            setBuildings((prevBuildings) =>
                prevBuildings.map((building) =>
                    building.id === updatedBuilding.id ? updatedBuilding : building
                )
            );
        },
        [setBuildings]
    );

    /**
     * Función para eliminar un edificio.
     * @param {Number} buildingId - ID del edificio a eliminar.
     */
    const deleteBuilding = useCallback(
        (buildingId) => {
            setBuildings((prevBuildings) =>
                prevBuildings.filter((building) => building.id !== buildingId)
            );
        },
        [setBuildings]
    );

    return (
        <BuildingsContext.Provider value={{ buildings, setBuildings, addBuilding, updateBuilding, deleteBuilding }}>
            {children}
        </BuildingsContext.Provider>
    );
}

export { BuildingsContext, BuildingsProvider, useBuildings, useBuildingList, useAddBuilding, useUpdateBuilding, useDeleteBuilding };
