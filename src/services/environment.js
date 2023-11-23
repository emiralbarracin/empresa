export const environment = {
  //nombre de dominio de la dirección web
  dominio: 'https://censys-sa.com.ar',
  dominioBird: 'https://rest.messagebird.com',
  baseUrlMessageBird: 'https://rest.messagebird.com',
  //principio del endpoint (dirección a la que se envían las solicitudes para realizar una acción específica en el servidor)
  //baseRuta: 'IBAPI_BMR_MH',
  //baseRuta: 'IBAPI_BANCA_EMPRESA', //desa
  baseRuta: 'IBAPI_BANCA_EMPRESA_TEST', //test
  //propiedad que contiene la carga útil (payload) que se enviará junto con la solicitud HTTP para obtener el token de acceso. Aqui se especifica el tipo de conexion (grant_type), el identificador de cliente (client_id) y el secreto de cliente (client_secret) que se usarán para autenticar la solicitud.
  payload:
    'grant_type=' +
    'client_credentials&' +
    'client_id=' +
    '{578305F0-CB6A-45AA-B571-65C28D12F32C}&' +
    'client_secret=' +
    'secretbf4f76c2e0d2d76b475f23ddd569408776d173aaca294bfdb16cf8899c4485a1',
  banco: 'BMR',
  //banco: "VOII"
  //banco: "SUCREDITO",
  //banco: "PIANO",
  //banco: "PIOLA" ,
  //banco: "BSE"
  //banco: "MONEDAUNO",
  //banco: "MERCEDES"
  //banco: "CMF"
  //banco: "CMF"
};

/* 
https:// - Protocolo de comunicación utilizado para acceder al servidor web
censys-sa.com.ar - Nombre de dominio del servidor web al que se está accediendo
/IBAPI_BANCA_EMPRESA/api/ - Ruta base de la API a la que se está accediendo
BancaDigitalClientePerfil/RecuperarBancaDigitalClientePerfil - Endpoint específico de la API que se está accediendo
?CodigoSucursal=20&IdMensaje=test - Query string o cadena de consulta que se está pasando a la API. En este caso, se están enviando dos parámetros: CodigoSucursal con valor 20 e IdMensaje con valor test
*/
