// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contactList');
// getting-started.js

// require the library
const mongoose = require('mongoose');

// connect to the database
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/cryptoView360');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// aquire the connection (to check if it is succesfull )
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then pint messsage
db.once('open',function(){
console.log("Succesfully connected to the database");
});
module.exports = db;