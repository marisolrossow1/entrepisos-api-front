import { call } from "./api.service.js"; 

/**
 * Obtener los edificios existentes en base de datos.
 * Permite filtrar edificios mediante un query string.
 * 
 * @param {Object} search  - Término de búsqueda opcional.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function getBuildings(search  = ""){
    const uri = `edificios${search ? `?search=${search}` : ""}`;
    return call({
        uri,
        method: "GET",
    })
}

/**
 * Obtener el edificio existente en base de datos
 * por id enviado por params, perteneciente al edificio.
 * Realiza una solicitud GET a "api/edificios/:id".
 * 
 * @param {String} id - ID del edificio.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function getBuildingId(id){
    return call({
        uri: `edificios/${id}`,
        method: "GET",
    })
}

/**
 * Eliminar un edificio existente en base de datos
 * por id enviado por params, perteneciente al edificio.
 * Realiza una solicitud DELETE a "api/edificio/:id".
 * 
 * @param {String} id - ID del edificio.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function deleteBuilding(id){
    return call({
        uri: `edificio/${id}`,
        method: "DELETE",
    })
}

/**
 * Crear un edificio en la base de datos
 * Realiza una solicitud POST a "api/edificios".
 * 
 * @param {String} location - Dirección del edificio.
 * @param {String} type - Tipo de edificio.
 * @param {String} district - Barrio del edificio.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function addBuilding(location, type, district){
    return call({
        uri: `edificios`,
        method: "POST",
        body: {
            "location": location,
            "type": type,
            "district": district,
        }
    })
}

/**
 * Editar un edificio en la base de datos
 * Realiza una solicitud POST a "api/edificios/editar".
 * 
 * @param {String} location - Dirección del edificio.
 * @param {String} type - Tipo de edificio.
 * @param {String} district - Barrio del edificio.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function editBuilding(buildingId, location, type, district){
    return call({
        uri: `edificios/${buildingId}/editar`,
        method: "PUT",
        body: {
            "location": location,
            "type": type,
            "district": district
        }
    })
}