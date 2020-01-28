const express = require('express');
const config = require('./config/config.json');

const app = express();
const PORT = config.port;


app.use(express.json());
const projects = [];
let request_counter = 0;
app.use((req, res, next)=>{
  request_counter++;
  console.log(`${request_counter} requests hit the server until now.`);
  next();
});

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
  const {id, title, tasks} = req.body;

  let project = projects.find(p => p.id == id);
      
  if(project) {
    return res.status(200).json({message: "Project ID already exists !"});
  }

  if(!tasks){
    tasks = [];
  }
  
  project = {
    id,
    title,
    tasks
  };

  projects.push(project);
  return res.status(201).json(projects);
});

//Lista todos os projetos existentes
app.get('/projects', (req, res)=>{
  return res.json(projects);
});

app.put('/projects/:id', checkTitle, (req, res)=>{
  
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(proj => proj.id == id);

  if(!project) {
    return res.status(400).json({message: "Project not found !"});
  }

  project.title = title;
  return res.json(projects);
  
});

app.delete('/projects/:id', (req, res)=>{
  
  const {id} = req.params;

  const project = projects.find(proj => proj.id == id);

  if(!project) {
    return res.status(400).json({message: "Project not found !"});
  }

  const index = projects.indexOf(project);

  projects.splice(index, 1);

  return res.status(204).send();
  
});

app.post('/projects/:id/tasks', checkTitle, (req, res)=>{
  const {id} = req.params;
  const {title} = req.body; 

  const project = projects.find(proj => proj.id == id); 
   
  if(!project) {
    return res.status(400).json({message: "Project not found !"});
  }

  project.tasks.push(title);

  return res.json(projects);
});

app.listen(PORT);
console.log(`Server is running in PORT ${PORT}`);