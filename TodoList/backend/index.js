const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json()); // to accept json, so that req.body can accept json from client
app.use(cors());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    date: req.body.date,
  };

  todos.push(newTodo);

  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const idToRemove = req.params.id;
  todos = todos.filter((todo) => todo.id !== idToRemove);

  res.send(todos);
});

app.post("/todos/:id", (req, res) => {
  const idToToggle = req.params.id;
  const isChecked = req.body.checked;

  const todo = todos.find((todo) => todo.id === idToToggle);

  if (todo) {
    todo.completed = isChecked;
    res.send(todos);
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
