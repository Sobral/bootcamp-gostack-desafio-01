const express = require('express');
const config = require('./config/config.json');

const app = express();
const PORT = config.port;


app.use(express.json());
const projects = [];


//Adiciona novo projeto a base de projetos
app.post('/projects', (req, res)=>{
  const project = req.body;
  projects.push(project);
  return res.status(201).json(projects);
});

app.listen(PORT);
console.log(`Server is up using PORT ${PORT}`);