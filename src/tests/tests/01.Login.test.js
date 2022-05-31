import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login/Login";
import App from '../../App'

describe('Testa o componente Login.', () => {
  test('1 - Verifica a existência dos inputs de login', () => {
    renderWithRouterAndRedux(<Login />)

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  })

  test('2 - Verifica a existência do input de nome em Login', () => {
    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByRole('textbox', { name: 'Name'});
    expect(inputName).toBeInTheDocument();
  })

  test('3 - Verifica a existência do input de email em Login', () => {
    renderWithRouterAndRedux(<Login />)

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail'});
    expect(inputEmail).toBeInTheDocument();
  })

  test('4 - Verifica se o botão "play" está na tela, e desativado', () => {
    renderWithRouterAndRedux(<Login />)

    const buttonPlay = screen.getByRole('button', { name: 'Play' })
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
  })

  test('5 - Verifica se o botão "play" é habilitado ao digitar nos inputs', () => {
    renderWithRouterAndRedux(<Login />)
    
    const typeName = 'triviers';
    const typeEmail = 'triviers@triviers.com'

    const buttonPlay = screen.getByRole('button', { name: 'Play' })

    const inputName = screen.getByRole('textbox', { name: 'Name'});
    userEvent.type(inputName, typeName);
    expect(buttonPlay).toBeDisabled();

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail'});
    userEvent.type(inputEmail, typeEmail);
    expect(buttonPlay).not.toBeDisabled();
  })

  test('6 - Verifica se o botão "play" continua desabilitado com email incorreto', () => {
    renderWithRouterAndRedux(<Login />)
    
    const typeName = 'triviers';
    const typeEmail = 'triviers@triviers'

    const buttonPlay = screen.getByRole('button', { name: 'Play' })

    const inputName = screen.getByRole('textbox', { name: 'Name'});
    userEvent.type(inputName, typeName);
    expect(buttonPlay).toBeDisabled();

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail'});
    userEvent.type(inputEmail, typeEmail);
    expect(buttonPlay).toBeDisabled();
  })

  test('7 - Verifica se o botão "settings" está na tela', () => {
    renderWithRouterAndRedux(<Login />)

    const buttonSettings = screen.getByRole('button', { name: 'Settings' })
    expect(buttonSettings).toBeInTheDocument();
    expect(buttonSettings).not.toBeDisabled();
  })

  test('8 - Verifica se o botão "play" redireciona para Game ao ser clicado', async () => {
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
    
    renderWithRouterAndRedux(<App />)
    
    const typeName = 'triviers';
    const typeEmail = 'triviers@triviers.com'

    const buttonPlay = screen.getByRole('button', { name: 'Play' })

    const inputName = screen.getByRole('textbox', { name: 'Name'});
    userEvent.type(inputName, typeName);
    expect(buttonPlay).toBeDisabled();

    const inputEmail = screen.getByRole('textbox', { name: 'E-mail'});
    userEvent.type(inputEmail, typeEmail);
    expect(buttonPlay).not.toBeDisabled();

    userEvent.click(buttonPlay);

    expect(await screen.findByText('triviers')).toBeInTheDocument();
  })
})