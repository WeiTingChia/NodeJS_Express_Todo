const express = require('express');
const router = express.Router();

const todos = [
  { id: 1, text: 'First todo', completed: false },
  { id: 2, text: 'Second todo', completed: false },
]

router.get('/todos', (req, res) => {
  res.send(todos);
})

  .post('/todos', (req, res) => {
    const { text } = req.body;
    console.log(text);

    if (!text) {
      res.status(400).send({ code: '0001', message: 'Invalid input' });
      return
    }

    const id = new Date().getTime().toString()
    const todo = {
      id,
      text
    }
    todos.push(todo);

    res.send(todo);
  })

  .delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    console.log('delete id', req.body, id)
    if (index === -1) {
      res.status(404).send({ code: '0002', message: 'Not found' });
      return;
    }

    todos.splice(index, 1);
    res.send({ id });
  })

  .put('/todos/:id', (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      res.status(404).send({ code: '0002', message: 'Not found' });
      return;
    }
    todos[index].text = text;
    res.send(todos[index]);
  })
module.exports = router;
