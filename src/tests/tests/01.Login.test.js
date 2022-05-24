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