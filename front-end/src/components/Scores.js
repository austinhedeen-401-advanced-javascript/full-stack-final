import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:7000';

const Scores = ({ scores, loadScores, addScore }) => {
  const [formName, setFormName] = useState('');
  const [formScore, setFormScore] = useState('');

  useEffect(() => {
    superagent.get(`${API_URL}/scores`)
      .then(response => {
        loadScores(response.body);
      });
  }, []);

  const handleDelete = (id) => {
    superagent.delete(`${API_URL}/scores/${id}`)
      .then(response => {
        loadScores(response.body);
      })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    superagent.post(`${API_URL}/scores`)
      .send({name: formName, score: formScore})
      .then(response => {
        addScore(response.body);
      });
    setFormName('');
    setFormScore('');
  };

  return (
    <>
      <ul>
        {scores.map(score => (
          <li key={score._id}>
            <span>{score.name} - {score.score}</span>
            <button onClick={(e) => handleDelete(score._id, e)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Enter name"
          onChange={(e) => setFormName(e.target.value)}
          value={formName}
        />
        <label htmlFor="score">Score</label>
        <input
          id="score"
          placeholder="Enter score"
          onChange={(e) => setFormScore(e.target.value)}
          value={formScore}
        />
        <button type="submit">Add Score</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  scores: state.scores,
});

const mapDispatchToProps = (dispatch) => ({
  loadScores: (scores) => {
    dispatch({
      type: 'SCORES_LOAD',
      payload: scores,
    });
  },
  addScore: (score) => {
    dispatch({
      type: 'SCORE_ADD',
      payload: score,
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Scores);
