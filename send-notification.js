// SENDS A NOTIFICATION TO ALL USERS SUBSCRIBED IN THE DATABASE
// USES TELEGRAM BOT API
// YOU MUST PROVIDE THE MONGO DB URI AS A PARAMETER WHEN CALLING THE FUNCTION
// NAMED 'URI' 

const mongodb = require('mongodb');
var request = require('request');

let client = null;
  
async function main(params) {
  const clientID = params.clientID;
    
  const uri = params.URI;
  const reused = client != null;
  if (client == null) {
    client = await mongodb.MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});  
  }

  // Get collection
  const docs = await client.db('BobiDB').collection('Usuario').find().toArray();


  let res = "";
  docs.map(user => {
    var options = {
      'method': 'GET',
      'url': 'https://api.telegram.org/bot'+params.BotToken+'/sendMessage?chat_id='+user['nombre']+'&text='+params.message+'&parse_mode=HTML',
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    
    
  })
  
  


  

  // Return
   return { body: { result: res} };
  
}