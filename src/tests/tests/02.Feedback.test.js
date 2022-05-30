import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
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
    console.log(history);

    const gamePath = history.location.pathname
    expect(gamePath).toBe('/game')
 
    const buttons = await screen.findAllByRole('button');

    // fireEvent(buttons[1])
    userEvent.click(buttons[1]);
    const nextButton = screen.getByTestId('btn-next')
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
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
    const imageGravatar = screen.getByRole('img', { src: urlImage });
    expect(imageGravatar).toBeInTheDocument();
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

    const numberScore = '23'
    const score = screen.getAllByText(numberScore)

    expect(score).toHaveLength(2);
  })

  test('10 - Verifica se o botão "Ranking" redireciona para Ranking ao ser clicado', async () => {

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
    console.log(history);

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

  test('Testa o botão Play Again da página de Feedback', async () => {
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
    console.log(history);

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
  })

});




