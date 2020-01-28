const express = require('express');
const config = require('./config/config.json');

const app = express();
const PORT = config.port;

app.get('/', (req, res)=>{
  return res.json({message:"Mensagem recebida com sucesso!"});
});

app.listen(PORT);
console.log(`Server is up using PORT ${PORT}`);