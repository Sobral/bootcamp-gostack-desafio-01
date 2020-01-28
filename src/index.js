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

function checkTasks(req, res, next){
  const tasks = req.body;
  if(!tasks){
    req.body.tasks = []
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

app.put('/projects/:id', checkTitle, (req, res)=>{
  
  const {id} = req.params;
  const {title} = req.body;

  if(projects.length < id) {return res.status(204).send();}

  const temp = projects.filter(a => a.id == id);
 
  if(!temp){
    return res.status(204);
  }
  const index = projects.indexOf(temp[0]);
  projects[index].title = title;
  return res.json(projects);
  
});

app.delete('/projects/:id', (req, res)=>{
  
  const {id} = req.params;

  if(projects.length < 1) {return res.status(204).send();}

  const temp = projects.filter(a => a.id == id);
 
  if(!temp){
    return res.status(204);
  }
  const index = projects.indexOf(temp[0]);

  projects.splice(index, 1);

  return res.status(204).send();
  
});

app.post('/projects/:id/tasks', checkTitle, checkTasks, (req, res)=>{
  const {id} = req.params;
  const {title} = req.body; 

  if(projects.length < id) {return res.status(204).send();}

  const temp = projects.filter(a => a.id == id);
 
  if(!temp){
    return res.status(204);
  }
  const index = projects.indexOf(temp[0]);
  projects[index].tasks.push(title);
  return res.json(projects);
});

app.listen(PORT);
console.log(`Server is running in PORT ${PORT}`);