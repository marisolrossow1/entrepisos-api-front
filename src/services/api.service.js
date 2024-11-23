/**
 * Servicio para llamar a la API de EntrePisos.
 * @param {Object} - uri luego de "/api/", method = "GET", body = undefined
 * @returns {Promise} - JSON del fetch.
 * @throws Si el fetch falla o si es un 401 (no autorizado), elimina el token.
 */
export async function call( { uri, method = "GET", body = undefined } ){
    // fetch() por defecto manda un GET.
    // Si necesitamos un POST, tenemos
    // que enviar una atributo adicional.
    // También transformar los datos a JSON.
    // Y aclarar por headers el tipo de dato.
    // Si necesitamos: Obtenemos el token del usuario.
    return fetch(`http://127.0.0.1:8000/api/${uri}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            // Para mensajes de validación:
            "Accept": "application/json"
            // "auth-token": localStorage.getItem("token")
        }
    })
        .then( async(response) =>{
            // Si no está bien devuelve simplemente un error.
            if(!response.ok){
                // Si no es autorizado, elimina el token.
                // if( response.status == 401){
                //     localStorage.removeItem("token")
                // }
                // Tira un error pero lo transforma en json.
                throw await response.json()
            }
            return response.json()
        } )
        .catch((error) => {
            throw { mensaje: error?.mensaje || "Fallo al recibir respuesta de la API." };
        });
}