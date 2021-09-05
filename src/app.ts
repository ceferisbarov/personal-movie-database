import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var uri: string;
if(process.env.ATLAS_URI){
  uri = process.env.ATLAS_URI;
  }
else{
  uri = 'mongodb+srv://jafar_isbarov:cefer1999@cluster0.vzrcp.mongodb.net/movies?retryWrites=true&w=majority';
}; //y tho

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log("Database connected."))
  .catch((err: string) => console.log("Error: " + err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully.")
})

const listRouter = require('./routes/list');
const addRouter = require('./routes/add');
const updateRouter = require('./routes/update');
const deleteRouter = require('./routes/delete');

app.use('/list', listRouter);
app.use('/add', addRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
