const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexRepository = repositories.findIndex((item) => {
    return item.id === id;
  });

  if (indexRepository < 0) {
    return response.status(400).json({ error: "Repository not found." });
  } 

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[indexRepository] = newRepository;

  return response.status(200).json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexRepository = repositories.findIndex((item) => {
    return item.id === id;
  });

  if (indexRepository < 0) {
    return response.status(400).json({ error: "Repository not found." });
  } 

  repositories.splice(indexRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexRepository = repositories.findIndex((item) => {
    return item.id === id;
  });

  if (indexRepository < 0 ) {
    return response.status(400).json({ error: 'Repository not found.'});
  }

  const repository = repositories.find((item) => {
    return item.id === id;
  });

  repository.likes = ++repository.likes;

  return response.status(200).json(repository);
});

module.exports = app;
