const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const cors = require('cors');
function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

json = getConfig('./TopSellingGames.json');

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
	//if (whitelist.indexOf(origin) !== -1) {
    //  callback(null, true)
    //} else {
    //  callback(new Error('Not allowed by CORS'))
    //}
  }
}
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../build')))

app.get('/games', (req, res) => {
  const parm = req.query.s; 
  if(parm){
    return res.send(json.filter( x => x.Name.toUpperCase().includes(parm.toUpperCase()) ) );
  }
  return res.send(json)
})

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build', 'index.html'))
})

app.listen(9090)
