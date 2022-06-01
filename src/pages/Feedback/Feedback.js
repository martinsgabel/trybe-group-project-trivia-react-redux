import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import scoreUpdate from '../../actions/scoreUpdate';
import reset from '../../actions/reset';
import './Feedback.css';

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
    const { score, assertions, history, reset } = this.props;
    return (
      <article className="feedback-article">
        <Header />
        <section className="feedback-section">
          <h1 data-testid="feedback-text">{feedback}</h1>
          <section className="points-feedback">
            <h3 data-testid="feedback-total-score">
              {score}
              {' '}
              points!
            </h3>
            <h3 data-testid="feedback-total-question">
              {assertions}
              {' '}
              assertions!
            </h3>
          </section>
          <section className="buttons-feedback">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={() => {
                reset();
                history.push('/');
              }}
              className="btn-play"
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={() => {
                reset();
                history.push('/ranking');
              }}
              className="btn-ranking"
            >
              Ranking
            </button>
          </section>
        </section>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  scorePoints: (state) => dispatch(scoreUpdate(state)),
  reset: (state) => dispatch(reset(state))
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  scorePoints: propTypes.func.isRequired,
  reset: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
