import React from "react";
import { cleanup, findByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App'
// import Game from "../../pages/Game/Game";
import saveRanking from '../../functions/localStorage/rankingStorage'

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
    expect(await screen.findByRole('heading', { level: 1}))
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
    expect(await screen.findByRole('heading', { level: 3}))
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

  test('Verifica se a função saveRanking foi chamada', async () => {
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

    const mockSave = jest.fn()

   expect(mockSave).toHaveBeenCalled();
  })
})