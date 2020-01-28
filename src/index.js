const express = require('express');
const config = require('./config/config.json');

const app = express();
const PORT = config.port;


app.use(express.json());
const projects = [];


function checkId(req, res, next){
  const {id} = req.body;
  if(!id){
    return res.status(400).json({message:"Project Id is required!"});
  }
  next();
}

function checkTitle(req, res, next){
  const {title} = req.body;
  if(!title){
    return res.status(400).json({message:"Project Title is required!"});
  }
  next();
}

//Adiciona novo projeto a base de projetos
app.post('/projects', checkId, checkTitle, (req, res)=>{
  const project = req.body;
  projects.push(project);
  return res.status(201).json(projects);
});

//Lista todos os projetos existentes
app.get('/projects', (req, res)=>{
  return res.json(projects);
});

app.listen(PORT);
console.log(`Server is running in PORT ${PORT}`);