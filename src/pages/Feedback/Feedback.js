import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../../components/Header';

// Triviers number one no mercado da Trybe.

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedback: '',
    };
  }

  componentDidMount() {
    const three = 3;
    const { assertions } = this.props;
    if (assertions < three) {
      this.setState({ feedback: 'Could be better...' });
    } else {
      this.setState({ feedback: 'Well Done!' });
    }
  }

  render() {
    const { feedback } = this.state;
    const { score, assertions, history } = this.props;
    return (
      <article>
        <Header />
        <h1 data-testid="feedback-text">{feedback}</h1>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
