exports = async function(req, res){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "sandbox";

  // Update these to reflect your db/collection
  var dbName = "demo";
  var collName = "chats";
  

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var newResult;
  try {
    what = JSON.parse(req.body.text())['what']
    who = JSON.parse(req.body.text())['who']
    newResult = await collection.insertOne({'who':who, 'what':what, 'when': new Date()});

  } catch(err) {
    console.log("Error occurred while executing deleteOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return { result: newResult };
};