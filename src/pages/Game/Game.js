import React from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
// import getToken from '../../functions/api/getToken';
// import shuffleArray from '../../functions/randomArray';
import './Game.css';
import Timer from '../../components/Timer';

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
    };
  }

  componentDidMount = () => {
    this.verifyToken();
  }

  handleClick = () => {
    this.setState({
      colorBorder: true,
    });
    console.log('oi');
  }

  verifyToken = async () => {
    const { history } = this.props;
    const { index } = this.state;

    const five = 5;
    const three = 3;
    const half = 0.5;

    const savedToken = localStorage.getItem('token');
    const gameQuestions = await fetch(`https://opentdb.com/api.php?amount=${five}&token=${savedToken}`);
    const questionsReturn = await gameQuestions.json();

    if (questionsReturn.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      console.log(questionsReturn);
      this.setState({
        questions: questionsReturn,
        category: questionsReturn.results[index].category,
        answers: [
          {
            answer: questionsReturn.results[index].correct_answer,
            id: 'correct-answer',
          },
          ...questionsReturn.results[index].incorrect_answers.map((iAnswer, i) => ({
            answer: iAnswer,
            id: `wrong-answer-${i}`,
          }))].sort(() => half - Math.random()),
        question: questionsReturn.results[index].question,
      });
    }
  }

  render() {
    const { questions, answers, category, question, colorBorder } = this.state;
    return (
      <article>
        <Timer />
        <Header />
        {questions === {} ? <h1>Loading</h1> : (
          <section>
            <h1 data-testid="question-category">
              {category}
            </h1>
            <h3 data-testid="question-text">
              {question}
            </h3>
            <section data-testid="answer-options">
              {answers.map((a, i) => (
                <button
                  data-testid={a.id}
                  key={i}
                  type="button"
                  className={colorBorder && answers
                    .some((element) => element.correct_answer === a)
                    ? 'green' : 'red'}
                  onClick={() => this.handleClick()}
                >
                  {a.answer}
                </button>
              ))}
            </section>
          </section>)}
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
