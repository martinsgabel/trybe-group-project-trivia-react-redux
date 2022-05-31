import React from "react";
import { cleanup, findByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import Ranking from '../../pages/Ranking/Ranking';
import App from '../../App'

describe('Testa o componente Ranking', () => {
  test('Testa se o pathname do componente está correto', async () => {
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

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const rankingPath = history.location.pathname
    expect(rankingPath).toBe('/ranking')
  })

  test('Testa se renderiza o título "Ranking"', () => {
    renderWithRouterAndRedux(<Ranking />);
    const heading = screen.getByRole('heading', { level: 1, name: "Ranking" });
    expect(heading).toBeInTheDocument();
  })

  test('Testa se há um botão de logout na página', () => {
    renderWithRouterAndRedux(<Ranking />);
    const button = screen.getByRole('button', { name: "Logout"})
    expect(button).toBeInTheDocument();
  })

  test('Testa se renderiza há uma lista no ranking', async () => {
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

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)

    const ul = screen.getByRole('list');
    expect(ul).toBeInTheDocument();
  })

  test('Testa se o jogador aparece no ranking após jogar', async () => {
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

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const searchName = 'triviers';
    const playerName = screen.getAllByText(searchName)[0];
    expect(playerName).toBeInTheDocument();
  })

  test('Verifica se os jogadores são renderizados no ranking', async () => {
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
    const typeName = 'danilo';
    const typeEmail = 'dansdeiro@gmail.com'

    const inputName = screen.getByRole('textbox', { name: 'Name' });
    userEvent.type(inputName, typeName);

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
    userEvent.type(inputEmail, typeEmail);

    const buttonPlay = screen.getByRole('button', { name: 'Play' })
    userEvent.click(buttonPlay);
    expect(await screen.findByText('danilo')).toBeInTheDocument();

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

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const rankingPath = history.location.pathname
    expect(rankingPath).toBe('/ranking')

    const name = 'danilo';
    const playerName = screen.getByText(name);
    expect(playerName).toBeInTheDocument();

    expect(await screen.findByText('danilo')).toBeInTheDocument();

    const logout = screen.getByRole('button', { name: "Logout"})
    userEvent.click(logout);
    expect(await screen.findByText('Name')).toBeInTheDocument();
  })

  test('Testa os data-testids', () => {
    renderWithRouterAndRedux(<Ranking />);

    const dataTest0 = screen.getByTestId('player-name-0');
    expect(dataTest0).toBeInTheDocument();

    // const dataTest1 = screen.getByTestId('player-name-1');
    // expect(dataTest1).toBeInTheDocument();

    const scoreTest0 = screen.getByTestId('player-score-0')
    expect(scoreTest0).toBeInTheDocument();

    // const scoreTest1 = screen.getByTestId('player-score-1')
    // expect(scoreTest1).toBeInTheDocument();
  })

  test('Testa se não há nomes no Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.removeItem('ranking');
    history.push('/ranking');
    expect(await screen.findByText('Não há jogadores aqui')).toBeInTheDocument();
  })
})