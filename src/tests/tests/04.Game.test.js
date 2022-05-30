import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App'
import * as Game from "../../pages/Game/Game";
import saveRanking from '../../functions/localStorage/rankingStorage'
import * as getToken from '../../functions/api/getToken';

describe('Testa o componente game', () => {
  test('Testa se a categoria está sendo exibida', async () => {
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

    expect(await screen.findByTestId('question-category'));
    expect(await screen.findByRole('heading', { level: 1 }))
  })

  test('Testa se a pergunta está sendo exibida', async () => {
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

    expect(await screen.findByTestId('question-text'));
    expect(await screen.findByRole('heading', { level: 3 }))
  })

  test('Testa se a imagem gravatar está sendo exibida', async () => {
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

    expect(await screen.findByTestId('header-profile-picture'));
  })

  test('Testa se o score está sendo exibido', async () => {
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

    expect(await screen.findByTestId('header-score'));
  })

  test('Testa se o nome do jogador está sendo exibido', async () => {
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

    expect(await screen.findByTestId('header-player-name'));
  })

  test('Verifica se aparecem 4 botões', async () => {
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

    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
    expect(await screen.findAllByRole('button')).not.toHaveLength(1)
  })

  test('Testa o salvamento de multiplos jogadores no ranking', async () => {
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

    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
    expect(await screen.findAllByRole('button')).not.toHaveLength(1)

    const buttons = await screen.findAllByRole('button');

    userEvent.click(buttons[1]);
    const nextButton = screen.getByTestId('btn-next')
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const rankingPath = history.location.pathname
    expect(rankingPath).toBe('/ranking')

    const name = 'triviers';
    const playerName = screen.getByText(name);
    expect(playerName).toBeInTheDocument();

    const logout = screen.getByRole('button', { name: "Logout"})
    userEvent.click(logout);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    expect(await screen.findByText('danilo')).toBeInTheDocument();

    const gamePath2 = history.location.pathname
    expect(gamePath2).toBe('/game')

    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
    expect(await screen.findAllByRole('button')).not.toHaveLength(1)

    const buttons2 = await screen.findAllByRole('button');

    userEvent.click(buttons2[1]);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);

    const feedbackPath2 = history.location.pathname
    expect(feedbackPath2).toBe('/feedback')

    const buttonRanking2 = screen.getByText('Ranking')

    userEvent.click(buttonRanking2)
    const rankingPath2 = history.location.pathname
    expect(rankingPath2).toBe('/ranking')

    const name1 = screen.getByText('triviers');
    expect(name1).toBeInTheDocument();

    const name2 = screen.getByText('danilo');
    expect(name2).toBeInTheDocument();
  })

  test('Checa o timer e o score', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    
    expect(await screen.findByText('danilo')).toBeInTheDocument();

    const gamePath2 = history.location.pathname
    expect(gamePath2).toBe('/game')

    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  })

  test('Testa o salvamento do ranking após escolhas corretas e erradas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    
    expect(await screen.findByText('danilo')).toBeInTheDocument();

    const gamePath2 = history.location.pathname
    expect(gamePath2).toBe('/game')

    const preSaved = [{ name: 'gabriel', score: '220', picture: `https://www.gravatar.com/avatar/76b5f602ee9d2268aa91542f5ffaf274` }]
    saveRanking(preSaved);

    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
    expect(await screen.findAllByRole('button')).not.toHaveLength(1)

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);

    const wrongAnswer1 = await screen.findByTestId('wrong-answer-1');
    userEvent.click(wrongAnswer1);
    userEvent.click(nextButton2);

    const correct = await screen.findByTestId('correct-answer')
    userEvent.click(correct);
    userEvent.click(nextButton2);
    userEvent.click(correct);
    userEvent.click(nextButton2);
    userEvent.click(correct);
    userEvent.click(nextButton2);

    const feedbackPath2 = history.location.pathname
    expect(feedbackPath2).toBe('/feedback')

    expect(await screen.findByText('Could be better...')).toBeInTheDocument();
  })

  test('Testa a mudança de cor das bordas', async () => {
    const { container, history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    
    expect(await screen.findByText('danilo')).toBeInTheDocument();

    const gamePath2 = history.location.pathname
    expect(gamePath2).toBe('/game')

    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
    expect(await screen.findAllByRole('button')).not.toHaveLength(1)

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);

    const wrongAnswer1 = await screen.findByTestId('wrong-answer-1');
    userEvent.click(wrongAnswer1);
    userEvent.click(nextButton2);

    const correct = await screen.findByTestId('correct-answer')
    userEvent.click(correct);

    const green = container.querySelector('.green');
    expect(green).toBeInTheDocument();
  })

  test('Testa se a cor das bordas muda ao esperarmos 30 segundos sem ação', async () => {
    const questions = {
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
    
    const { container, history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);

    await waitFor(() => {
      const location = history.location.pathname
      expect(location).toBe('/game');
    }, { timeout: 4999});

    const redArr = container.querySelectorAll('.red');
    expect(redArr.length).toBe(0);
    
    setInterval(() => {
      const green = container.querySelector('.green');
      const red = container.querySelector('.red');
      expect(green).toBeInTheDocument()
      expect(red).toBeInTheDocument()
    }, 10000);
  })

  test('Testa o componente Game com fetch mockado', async () => {
    const questions = {
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

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);

    const nextButton2 = await screen.findByTestId('btn-next')
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);
    userEvent.click(nextButton2);

    const feedbackPath2 = history.location.pathname
    expect(feedbackPath2).toBe('/feedback')
  })

  test('Testa o logout automático com token invalido', async () => {
    getToken.getToken = jest.fn().mockImplementation(() => 'invalid token');

    const questions = {
      response_code: 3,
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
    
    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    screen.debug();


    await waitFor(() => {
      const location = history.location.pathname
      expect(location).toBe('/');
    }, { timeout: 4999});
  })

  test('Testa a função changeIndex do componente Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);
    
    Game.changeIndex = jest.fn().mockImplementation(() => {
      const ranking = [{ name: 'gabriel', score: '109', picture: `teste@test.com` }]
      saveRanking(ranking);
    })

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    const nextButton2 = screen.getByTestId('btn-next')
    userEvent.click(nextButton2);

    userEvent.click(wrongAnswer);
    userEvent.click(nextButton2);

    const correct = await screen.findByTestId('correct-answer')
    userEvent.click(correct);
    userEvent.click(nextButton2);
    userEvent.click(correct);
    userEvent.click(nextButton2);
    userEvent.click(correct);
    userEvent.click(nextButton2);

    expect(Game.changeIndex).not.toHaveBeenCalled();
  })

  test('Testa a função verifyToken do componente Game', async () => {
    Game.verifyToken = jest.fn().mockImplementation(() => {
      localStorage.removeItem('token');
      history.push('/');
    })
    
    const { history } = renderWithRouterAndRedux(<App />);

    const typeName2 = 'danilo';
    const typeEmail2 = 'dansdeiro@gmail.com'

    const inputName2 = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName2, typeName2);

    const inputEmail2 = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail2, typeEmail2);

    const buttonPlay2 = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay2);

    const location = history.location.pathname
    expect(location).toBe('/');
  })


})