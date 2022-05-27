import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../../components/Header';
import './Game.css';
import scoreUpdate from '../../actions/scoreUpdate';
import saveRanking from '../../functions/localStorage/rankingStorage';

const correctId = 'correct-answer';
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      index: 0,
      category: '',
      answers: [],
      question: '',
      colorBorder: false,
      timer: 30,
      difficulty: '',
      correct: '',
      next: false,
      ranking: [],
    };
  }

  componentDidMount = () => {
    this.verifyToken();
    this.getRanking();
    const second = 1000;
    this.timerID = setInterval(
      () => this.tick(), second,
    );
  };

  getRanking = () => {
    const savedRanking = localStorage.getItem('ranking');
    if (savedRanking !== null) this.setState({ ranking: JSON.parse(savedRanking) });
  }

  tick = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({ colorBorder: true });
    }
  }

  verifyToken = async () => {
    const { history } = this.props;
    const { index } = this.state;
    const number = { half: 0.5, three: 3, five: 5 };
    const savedToken = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=${number.five}&token=${savedToken}`;
    const gameQuestions = await fetch(url);
    const questionsReturn = await gameQuestions.json();
    if (questionsReturn.response_code === number.three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: questionsReturn,
        category: questionsReturn.results[index].category,
        difficulty: questionsReturn.results[index].difficulty,
        correct: questionsReturn.results[index].correct_answer,
        answers: [
          {
            answer: questionsReturn.results[index].correct_answer,
            id: correctId,
          },
          ...questionsReturn.results[index].incorrect_answers.map(
            (iAnswer, i) => ({
              answer: iAnswer,
              id: `wrong-answer-${i}`,
            }),
          ),
        ].sort(() => number.half - Math.random()),
        question: questionsReturn.results[index].question,
      });
    }
  };

  border = (answer, correctA) => {
    if (answer === correctA) {
      return 'green';
    }
    return 'red';
  };

  selectAnswer = (event) => {
    this.setState({ colorBorder: true, next: true });
    this.ponctuationFunction(event);
  }

  ponctuationFunction = (event) => {
    const number = { one: 1, two: 2, three: 3, ten: 10 };
    const { correct, difficulty, timer } = this.state;
    const { score } = this.props;
    if (event.target.name === correct) {
      if (difficulty === 'hard') {
        const scorePoints = number.ten + (timer * number.three);
        console.log(scorePoints);
        score(scorePoints);
      } else if (difficulty === 'medium') {
        const scorePoints = number.ten + (timer * number.two);
        console.log(scorePoints);
        score(scorePoints);
      } else {
        const scorePoints = number.ten + (timer * number.one);
        console.log(scorePoints);
        score(scorePoints);
      }
    }
  }

  changeIndex = () => {
    const four = 4;
    const { index } = this.state;
    const { history } = this.props;
    if (index === four) {
      this.saveInRanking();
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({ index: prevState.index + 1, colorBorder: false }));
      this.changeState();
    }
  }

  saveInRanking = () => {
    const { ranking } = this.state; const { name, scorePoints, email } = this.props;
    const emailCrypto = md5(email).toString();
    if (ranking === []) {
      const newRanking = [{ name, score: scorePoints, picture: `https://www.gravatar.com/avatar/${emailCrypto}` }];
      saveRanking(newRanking);
    } else {
      const newRanking = [...ranking, { name, score: scorePoints, picture: `https://www.gravatar.com/avatar/${emailCrypto}` }];
      saveRanking(newRanking);
    }
  }

  changeState = () => {
    const { questions } = this.state;
    const half = 0.5;
    this.setState((prevState) => ({
      category: questions.results[prevState.index].category,
      difficulty: questions.results[prevState.index].difficulty,
      correct: questions.results[prevState.index].correct_answer,
      answers: [
        {
          answer: questions.results[prevState.index].correct_answer,
          id: correctId,
        },
        ...questions.results[prevState.index].incorrect_answers.map(
          (iAnswer, i) => ({
            answer: iAnswer,
            id: `wrong-answer-${i}`,
          }),
        ),
      ].sort(() => half - Math.random()),
      question: questions.results[prevState.index].question,
    }));
  }

  render() {
    const { questions,
      answers, category, question, colorBorder, timer, next } = this.state;

    const correctAnswerElement = answers.find(
      (answer) => answer.id === 'correct-answer',
    );

    const correctAnswer = () => {
      if (correctAnswerElement !== undefined) {
        return correctAnswerElement.answer;
      }
      return '';
    };

    return (
      <article>
        <span>
          {timer}
        </span>
        <Header />
        {questions === {} ? (
          <h1>Loading</h1>
        ) : (
          <section>
            <h1 data-testid="question-category">{category}</h1>
            <h3 data-testid="question-text">{question}</h3>
            <section data-testid="answer-options">
              {answers.map((a, i) => (
                <button
                  data-testid={ a.id }
                  name={ a.answer }
                  key={ i }
                  type="button"
                  className={
                    colorBorder ? this.border(a.answer, correctAnswer()) : ''
                  }
                  onClick={ (event) => this.selectAnswer(event) }
                  disabled={ colorBorder }
                >
                  {a.answer}
                </button>
              ))}
            </section>
          </section>
        )}
        { next && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.changeIndex() }
          >
            Next
          </button>
        ) }
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  score: (state) => dispatch(scoreUpdate(state)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  scorePoints: state.player.score,
  email: state.player.gravatarEmail,
});

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  score: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  scorePoints: propTypes.number.isRequired,
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
