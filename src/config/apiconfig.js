
const API_BASE_URL = "http://192.168.2.124:3005/cobranza/api/v1/point/";
const SOCKET_BASE_URL = "http://192.168.2.124:3005"; 
export const APIURL = {
   
    senLogin: () => `${API_BASE_URL}login`,
    postAllCountGestiones : () =>`${API_BASE_URL}all`,
    getAllcliente : () =>`${API_BASE_URL}registro`,
    getAllclienteInsert : () =>`${API_BASE_URL}registroindividual`,
    socketEndpoint: () => `${SOCKET_BASE_URL}`,
    getAllVerificacionTerrena : () =>`${API_BASE_URL}ClientesVerificionTerrena/list`,
};
