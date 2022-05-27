import React from "react";
import { cleanup, findByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import Ranking from '../../pages/Ranking/Ranking';
import App from '../../App'

describe('Testa o componente Ranking', () => {
  test('Testa se o pathname do componente está correto', async () => {
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

    const buttons = await screen.findAllByRole('button');

    userEvent.click(buttons[1]);
    const nextButton = screen.getByTestId('btn-next')
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
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

  test('Testa se renderiza há uma lista no ranking', () => {
    renderWithRouterAndRedux(<Ranking />);
    const ul = screen.getByRole('list');
    expect(ul).toBeInTheDocument();
  })

  test('Testa se o jogador aparece no ranking após jogar', async () => {
    renderWithRouterAndRedux(<Ranking />);
    const typeName = 'triviers';
    const playerName = screen.getByText(typeName);
    expect(playerName).toBeInTheDocument();
  })

  test('Verifica se os jogadores são renderizados na ordem', async () => {
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
    userEvent.click(button);
    userEvent.click(nextButton);
    userEvent.click(button);
    userEvent.click(nextButton);
    userEvent.click(button);
    userEvent.click(nextButton);
    userEvent.click(button);
    userEvent.click(nextButton);
    const feedbackPath = history.location.pathname

    expect(feedbackPath).toBe('/feedback')

    const buttonRanking = screen.getByText('Ranking')

    userEvent.click(buttonRanking)
    const rankingPath = history.location.pathname
    expect(rankingPath).toBe('/ranking')

    const name = 'danilo';
    const playerName = screen.getByText(name);
    expect(playerName).toBeInTheDocument();

    const logout = screen.getByRole('button', { name: "Logout"})
    userEvent.click(logout);
    expect(await screen.findByText('Name')).toBeInTheDocument();
  })

  test('Testa os data-testids', () => {
    renderWithRouterAndRedux(<Ranking />);

    const dataTest0 = screen.getByTestId('player-name-0');
    expect(dataTest0).toBeInTheDocument();

    const dataTest1 = screen.getByTestId('player-name-1');
    expect(dataTest1).toBeInTheDocument();

    const scoreTest0 = screen.getByTestId('player-score-0')
    expect(scoreTest0).toBeInTheDocument();

    const scoreTest1 = screen.getByTestId('player-score-1')
    expect(scoreTest1).toBeInTheDocument();
  })

  test('Testa se não há nomes no Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.removeItem('ranking');
    history.push('/ranking');
    expect(await screen.findByText('Não há jogadores aqui')).toBeInTheDocument();
  })
})