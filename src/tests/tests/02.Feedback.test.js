import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Feedback from "../../pages/Feedback/Feedback";
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App'



describe('Testa o componente Feedback.', () => {
  test('1 - Verifica se o nome da pessoa usuária se encontra na tela', () => {
    renderWithRouterAndRedux(<Feedback />)
    const initialState = {
      player: {
        name: 'Danilo',
        gravatarEmail: 'dansdeiro@gmail.com',
        score: 0,
        assertions: 0,
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);

    const userName = screen.getByText('Danilo');
    expect(userName).toBeInTheDocument();
  })

  test('2 - Verifica se tem 2 botões na tela', () => {
    renderWithRouterAndRedux(<Feedback />)

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  })

  test('3 - Verifica se tem o botão com o texto Play Again', () => {
    renderWithRouterAndRedux(<Feedback />)

    const buttonPlayAgain = screen.getByText('Play Again');
    expect(buttonPlayAgain).toBeInTheDocument();
  })

  test('4 - Verifica se tem o botão com o texto Ranking', () => {
    renderWithRouterAndRedux(<Feedback />)

    const buttonRanking = screen.getByText('Ranking');
    expect(buttonRanking).toBeInTheDocument();
  })

  test('5 - Verifica se o botão "Play Again" redireciona para Game ao ser clicado', async () => {
    const questions = {
      response_code: 0,
      results: [
        {
          category: "Entertainment: Music",
          correct_answer: "Billie Joe Armstrong",
          difficulty: "easy",
          incorrect_answers: ["Mike Dirnt", "Sean Hughes", "Tr&eacute; Cool"],
          question: "Who is the lead singer of Green Day?",
          type: "multiple",
        },
        {
          category: "Entertainment: Film",
          correct_answer: "Wensleydale",
          difficulty: "medium",
          incorrect_answers: ["Cheddar", "Moon Cheese", "Edam"],
          question: "What type of cheese, loved by Wallace and Gromit, had it&#039;s sale prices rise after their successful short films?",
          type: "multiple",
        },
        {
          category: "Entertainment: Video Games",
          correct_answer: "False",
          difficulty: "easy",
          incorrect_answers: ["True"],
          question: "In Heroes of the Storm, the Cursed Hollow map gimmick requires players to kill the undead to curse the enemy team.",
          type: "boolean",
        },
        {
          category: "Science: Mathematics",
          correct_answer: "Parentheses, Exponents, Multiplication, Division, Addition, Subtraction",
          difficulty: "easy",
          incorrect_answers: ["Addition, Multiplication, Division, Subtraction, Addition, Parentheses",
          "Parentheses, Exponents, Addition, Substraction, Multiplication, Division",
          "The order in which the operations are written."],
          question: "What is the correct order of operations for solving equations?",
          type: "multiple",
        },
        {
          category: "Animals",
          correct_answer: "Hemocyanin",
          difficulty: "hard",
          incorrect_answers: ["Cytochrome", "Iron", "Methionine"],
          question: "What is the name of the copper-rich protein that creates the blue blood in the Antarctic octopus?",
          type: "multiple",
        },
      ]
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const typeName = 'triviers';
    const typeEmail = 'triviers@triviers.com'

    const inputName = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName, typeName);

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail, typeEmail);

    const buttonPlay = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay);
    expect(await screen.findByText('triviers')).toBeInTheDocument();

    const gamePath = history.location.pathname
    expect(gamePath).toBe('/game')
 
    const button = await screen.findByTestId('correct-answer');
    userEvent.click(button);
    const nextButton = screen.getByTestId('btn-next')
    userEvent.click(nextButton);
    const button2 = await screen.findByTestId('correct-answer');
    userEvent.click(button2);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);
    const button3 = await screen.findByTestId('correct-answer');
    userEvent.click(button3);
    const nextButton3 = screen.getByTestId('btn-next')
    userEvent.click(nextButton3);
    const button4 = await screen.findByTestId('correct-answer');
    userEvent.click(button4);
    const nextButton4 = screen.getByTestId('btn-next')
    userEvent.click(nextButton4);
    const button5 = await screen.findByTestId('correct-answer');
    userEvent.click(button5);
    const nextButton5 = screen.getByTestId('btn-next')
    userEvent.click(nextButton5);
    const feedbackPath = history.location.pathname

    expect(feedbackPath).toBe('/feedback')

    const buttonPlayAgain = screen.getByText('Play Again')

    userEvent.click(buttonPlayAgain)
    const loginPath = history.location.pathname
    expect(loginPath).toBe('/')
  })

  test('6 - Verifica se a imagem do gravatar é mostrada', async () => {

    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'dansdeiro@gmail.com',
        score: 0,
        assertions: 0,
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);

    const urlImage = '//www.gravatar.com/avatar/38adfb27e0081b8440ea833e29afc8a3'
    const imageGravatar = screen.getAllByRole('img', { src: urlImage });
    expect(imageGravatar[0]).toBeInTheDocument();
  })

  test('7 - Verifica se a frase "Could be better" é mostrada quando a pessoa acerta menos de 3 perguntas', async () => {

    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'dansdeiro@gmail.com',
        score: 0,
        assertions: 0,
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);

    const phrase = 'Could be better...'
    const element = screen.getByText(phrase)

    expect(element).toBeInTheDocument();
  })

  test('8 - Verifica se a frase "Well Done!" é mostrada quando a pessoa acerta 3 ou mais perguntas', async () => {

    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'dansdeiro@gmail.com',
        score: 0,
        assertions: 3,
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);

    const phrase = 'Well Done!'
    const element = screen.getByText(phrase)

    expect(element).toBeInTheDocument();
  })


  test('9 - Verifica os pontos do score', async () => {

    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'dansdeiro@gmail.com',
        score: 23,
        assertions: 1,
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);

    const numberScore = '23 points!'
    const score = screen.getByText(numberScore)

    expect(score).toBeInTheDocument();
  })

  test('10 - Verifica se o botão "Ranking" redireciona para Ranking ao ser clicado', async () => {
    const questions = {
      response_code: 0,
      results: [
        {
          category: "Entertainment: Music",
          correct_answer: "Billie Joe Armstrong",
          difficulty: "easy",
          incorrect_answers: ["Mike Dirnt", "Sean Hughes", "Tr&eacute; Cool"],
          question: "Who is the lead singer of Green Day?",
          type: "multiple",
        },
        {
          category: "Entertainment: Film",
          correct_answer: "Wensleydale",
          difficulty: "medium",
          incorrect_answers: ["Cheddar", "Moon Cheese", "Edam"],
          question: "What type of cheese, loved by Wallace and Gromit, had it&#039;s sale prices rise after their successful short films?",
          type: "multiple",
        },
        {
          category: "Entertainment: Video Games",
          correct_answer: "False",
          difficulty: "easy",
          incorrect_answers: ["True"],
          question: "In Heroes of the Storm, the Cursed Hollow map gimmick requires players to kill the undead to curse the enemy team.",
          type: "boolean",
        },
        {
          category: "Science: Mathematics",
          correct_answer: "Parentheses, Exponents, Multiplication, Division, Addition, Subtraction",
          difficulty: "easy",
          incorrect_answers: ["Addition, Multiplication, Division, Subtraction, Addition, Parentheses",
          "Parentheses, Exponents, Addition, Substraction, Multiplication, Division",
          "The order in which the operations are written."],
          question: "What is the correct order of operations for solving equations?",
          type: "multiple",
        },
        {
          category: "Animals",
          correct_answer: "Hemocyanin",
          difficulty: "hard",
          incorrect_answers: ["Cytochrome", "Iron", "Methionine"],
          question: "What is the name of the copper-rich protein that creates the blue blood in the Antarctic octopus?",
          type: "multiple",
        },
      ]
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const typeName = 'triviers';
    const typeEmail = 'triviers@triviers.com'

    const inputName = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName, typeName);

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail, typeEmail);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    expect(await screen.findByText('triviers')).toBeInTheDocument();

    const gamePath2 = history.location.pathname
    expect(gamePath2).toBe('/game')

    const button = await screen.findByTestId('correct-answer');
    userEvent.click(button);
    const nextButton = screen.getByTestId('btn-next')
    userEvent.click(nextButton);
    const button2 = await screen.findByTestId('correct-answer');
    userEvent.click(button2);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);
    const button3 = await screen.findByTestId('correct-answer');
    userEvent.click(button3);
    const nextButton3 = screen.getByTestId('btn-next')
    userEvent.click(nextButton3);
    const button4 = await screen.findByTestId('correct-answer');
    userEvent.click(button4);
    const nextButton4 = screen.getByTestId('btn-next')
    userEvent.click(nextButton4);
    const button5 = await screen.findByTestId('correct-answer');
    userEvent.click(button5);
    const nextButton5 = screen.getByTestId('btn-next')
    userEvent.click(nextButton5);

    const feedbackPath2 = history.location.pathname

    expect(feedbackPath2).toBe('/feedback')

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const rankingPath = history.location.pathname
    expect(rankingPath).toBe('/ranking')
  })

});




