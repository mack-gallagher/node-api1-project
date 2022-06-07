// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  User.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    })
});

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'user not found' });
        return;
      }
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    })
});

server.post('/api/users', (req, res) => {
  User.insert(req.body)
    .then(result => {
      res.status(201).json({ message: 'user created' });
    })
    .catch(err => {
      res.json(err);
    })
});

server.put('/api/users/:id', (req, res) => {
  User.update(req.params.id, req.body)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'user not found' });
        return;
      }
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    })
});

server.delete('/api/users/:id', (req, res) => {
  User.remove(id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'user not found' });
        return;
      }
      res.json(result);
    })
});

module.exports = server // EXPORT YOUR SERVER instead of {}
