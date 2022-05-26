import React from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import './Game.css';
// import Timer from '../../components/Timer';

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

  handleClick = () => {
    this.setState({
      colorBorder: true,
    });
    console.log('oi');
  };

  verifyToken = async () => {
    const { history } = this.props;
    const { index } = this.state;

    const five = 5;
    const three = 3;
    const half = 0.5;

    const savedToken = localStorage.getItem('token');
    const gameQuestions = await fetch(
      `https://opentdb.com/api.php?amount=${five}&token=${savedToken}`,
    );
    const questionsReturn = await gameQuestions.json();

    if (questionsReturn.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: questionsReturn,
        category: questionsReturn.results[index].category,
        answers: [
          {
            answer: questionsReturn.results[index].correct_answer,
            id: 'correct-answer',
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

  selectAnswer = () => {
    this.setState({ colorBorder: true });
  }

  render() {
    const { questions, answers, category, question, colorBorder, timer } = this.state;
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
        {/* <Timer /> */}
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
                  key={ i }
                  type="button"
                  className={
                    colorBorder ? this.border(a.answer, correctAnswer()) : ''
                  }
                  onClick={ this.selectAnswer }
                  disabled={ colorBorder }
                >
                  {a.answer}
                </button>
              ))}
            </section>
          </section>
        )}
      </article>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

// .sort((a, b) => {
//   const one = -1;
//   if (a.answer < b.answer) {
//     return one;
//   }
//   return true;
// }

export default Game;
