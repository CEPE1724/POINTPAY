
const API_BASE_URL = "http://192.168.2.124:3005/cobranza/api/v1/point/";
const SOCKET_BASE_URL = "http://192.168.2.124:3005"; 
export const APIURL = {
   
    senLogin: () => `${API_BASE_URL}login`,
    postAllCountGestiones : () =>`${API_BASE_URL}all`,
    getAllcliente : () =>`${API_BASE_URL}registro`,
    getAllclienteInsert : () =>`${API_BASE_URL}registroindividual`,
    socketEndpoint: () => `${SOCKET_BASE_URL}`,
    getAllVerificacionTerrena : () =>`${API_BASE_URL}ClientesVerificionTerrena/list`,
    postUbicacionesAPPlocation : () =>`${API_BASE_URL}UbicacionesAPP/location`,
    getUbicacionesAPPidUser: (idUser) =>`${API_BASE_URL}UbicacionesAPP/idUser/${idUser}`,
    /* API DE VERIFICACION TERRENA */
    getClientesVerificionTerrenacountEstado : () =>`${API_BASE_URL}ClientesVerificionTerrena/countEstado`,
    postTerrenaGestionDomicilioSave : () =>`${API_BASE_URL}TerrenaGestionDomicilio/save`,
    postTerrenaGestionTrabajoSave : () =>`${API_BASE_URL}TerrenaGestionTrabajo/save`,
};
