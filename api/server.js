// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  User.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
        return;
      }
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'The users information could not be retrieved' });
    })
});

server.post('/api/users', (req, res) => {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('bio')) {
    res.status(400).json({ message: 'Please provide name and bio for the user' });
    return;
  }
  User.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.put('/api/users/:id', (req, res) => {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('bio')) {
    res.status(400).json({ message: 'Please provide name and bio for the user' });
    return;
  }
  User.update(req.params.id, req.body)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
        return;
      }
      res.json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
        return;
      }
      res.status(200).json(result);
    })
});

module.exports = server // EXPORT YOUR SERVER instead of {}
