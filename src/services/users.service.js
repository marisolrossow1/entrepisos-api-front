import { call } from "./api.service.js"; 

/**
 * Obtener los usuarios existentes en base de datos.
 * Permite filtrar usuarios mediante un query string.
 * 
 * @param {Object} search  - Término de búsqueda opcional.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function getUsers(search  = ""){
    const uri = `usuarios${search ? `?search=${search}` : ""}`;
    return call({
        uri,
        method: "GET",
    })
}

/**
 * Obtener el usuario existente en base de datos
 * por id enviado por params, perteneciente al usuario.
 * Realiza una solicitud GET a "api/usuarios/:id".
 * 
 * @param {String} id - ID del usuario.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function getUserId(id){
    return call({
        uri: `usuarios/${id}`,
        method: "GET",
    })
}

/**
 * Eliminar un usuario existente en base de datos
 * por id enviado por params, perteneciente al usuario.
 * Realiza una solicitud DELETE a "api/usuario/:id".
 * 
 * @param {String} id - ID del usuario.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function deleteUser(id){
    return call({
        uri: `usuario/${id}`,
        method: "DELETE",
    })
}

/**
 * Crear un usuario en la base de datos
 * Realiza una solicitud POST a "api/usuarios".
 * 
 * @param {String} name - Nombre del usuario.
 * @param {String} surname - Apellido del usuario.
 * @param {String} email - Correo electrónico del usuario.
 * @param {String} dni - DNI del usuario.
 * @param {Number} age - Edad del usuario.
 * @param {String} description - Descripción del usuario.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function addUser(name, surname, email, dni, age, description){
    return call({
        uri: `usuarios`,
        method: "POST",
        body: {
            "name": name,
            "surname": surname,
            "email": email,
            "dni": dni,
            "age": age,
            "description": description,
        }
    })
}

/**
 * Editar un usuario en la base de datos
 * Realiza una solicitud POST a "api/usuarios/editar".
 * 
 * @param {String} userId - ID del usuario.
 * @param {String} name - Nombre del usuario.
 * @param {String} surname - Apellido del usuario.
 * @param {String} email - Correo electrónico del usuario.
 * @param {String} dni - DNI del usuario.
 * @param {Number} age - Edad del usuario.
 * @param {String} description - Descripción del usuario.
 * @returns {Promise} - Respuesta del servidor en formato JSON.
 */
export async function editUser(userId, name, surname, email, dni, age, description){
    return call({
        uri: `usuarios/${userId}/editar`,
        method: "PUT",
        body: {
            "name": name,
            "surname": surname,
            "email": email,
            "dni": dni,
            "age": age,
            "description": description,
        }
    })
}