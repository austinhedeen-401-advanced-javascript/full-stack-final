'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const router = express.Router();

let db = [];

/**
 * Returns an array of scores, sorted by `score` in descending order.
 */
router.get('/scores', (request, response) => {
  response.status(200).json(db);
});

/**
 * Adds a new score into storage.
 */
router.post('/scores', (request, response) => {
  const data = request.body;
  data._id = uuid();
  db.push(data);
  db.sort((a, b) => b.score - a.score);
  response.status(200).json(db);
});

/**
 * Removes a score from storage.
 *
 * TODO - The specification did not have a :id param in this path
 */
router.delete('/scores/:id', (request, response) => {
  const id = request.params.id;
  db = db.filter((item) => item._id !== id);
  response.status(200).json(db);
});

/**
 * Returns an array of all scores bigger than the given value.
 */
router.get('/scores-bigger-than/:value', (request, response) => {
  const value = request.params.value;
  const result = db.filter((item) => item.score > value);
  response.status(200).json(result);
});

module.exports = router;
