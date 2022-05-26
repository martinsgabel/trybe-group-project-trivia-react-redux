import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import './Game.css';
import scoreUpdate from '../../actions/scoreUpdate';

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
    };
  }

  componentDidMount = () => {
    this.verifyToken();
    const second = 1000;
    this.timerID = setInterval(
      () => this.tick(), second,
    );
  };

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
    const five = 5;
    const three = 3;
    const half = 0.5;

    const savedToken = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=${five}&token=${savedToken}`;
    const gameQuestions = await fetch(url);
    const questionsReturn = await gameQuestions.json();

    if (questionsReturn.response_code === three) {
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
        ].sort(() => half - Math.random()),
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
    const one = 1;
    const two = 2;
    const three = 3;
    const ten = 10;
    const { correct, difficulty, timer } = this.state;
    const { score } = this.props;
    if (event.target.name === correct) {
      if (difficulty === 'hard') {
        const scorePoints = ten + (timer * three);
        console.log(scorePoints);
        score(scorePoints);
      } else if (difficulty === 'medium') {
        const scorePoints = ten + (timer * two);
        console.log(scorePoints);
        score(scorePoints);
      } else {
        const scorePoints = ten + (timer * one);
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
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({ index: prevState.index + 1, colorBorder: false }));
      this.changeState();
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

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  score: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
