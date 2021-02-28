// MANAGES CALLS FROM IBM WATSON ASSISTANT
// GETS DATA FROM A MONGO DB ATLAS INSTANCE
// YOU MUST PROVIDE THE PARAMETER 'URI' WITH THE MONGODB URI


const mongodb = require('mongodb');

let client = null;

async function main(params) {
  // Check for cached mongodb client instance
  const funcion = params.Funcion;
  console.log(funcion);
  
  let res;
  
  switch (funcion) {
  case 'localizacion':
    res = localizacion(params);
    break;
  case 'horario':
    res = horario(params);
    break;
  case 'inventario':
    res = inventario(params);
    break;
  default:
    console.log(`La función '${funcion}' no se ha reconocido.`);
 }
  
  return res;
  
}


async function localizacion(params) {
  // Check for cached mongodb client instance
  const funcion = params.Funcion;
  console.log(funcion);
  
  
  const uri = params.URI;
  const reused = client != null;
  if (client == null) {
    client = await mongodb.MongoClient.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true});  
  }

  // Get collection
  const docs = await client.db('BobiDB').collection('FAQ').find({'pregunta': 'localizacion'}).toArray();

  // Return
   return { body: { result: docs} };
  
}



async function horario(params) {
  // Check for cached mongodb client instance
  const uri = params.URI;
  const reused = client != null;
  if (client == null) {
    client = await mongodb.MongoClient.connect(uri);  
  }

  // Get collection
  const docs = await client.db('BobiDB').collection('FAQ').find({'pregunta': 'horario'}).toArray();

  // Return
  return { body: { result: docs} };
}


async function inventario(params) {
  // Check for cached mongodb client instance
  const funcion = params.Funcion;
  console.log(funcion);
  
  
  const uri = params.URI;
  const reused = client != null;
  if (client == null) {
    client = await mongodb.MongoClient.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true});  
  }

  // Get collection
  const docs = await client.db('BobiDB').collection('Articulo').find().toArray();
  
  let res = "";
  docs.map(item => {
    res += " \n " + item['nombre'];
  })
  

  // Return
   return { body: { result: res} };
  
}


exports.main = main;