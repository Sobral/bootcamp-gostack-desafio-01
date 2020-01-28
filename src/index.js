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

//Adiciona novo projeto a base de projetos
app.post('/projects', checkId,(req, res)=>{
  const project = req.body;
  projects.push(project);
  return res.status(201).json(projects);
});

app.listen(PORT);
console.log(`Server is up using PORT ${PORT}`);