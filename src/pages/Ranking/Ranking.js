import React from 'react';
import propTypes from 'prop-types';
import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount = () => {
    this.getRanking();
  }

  getRanking = () => {
    const savedRanking = localStorage.getItem('ranking');
    if (savedRanking !== null) {
      const parseRanking = JSON.parse(savedRanking);
      const orderedRanking = parseRanking.sort((a, b) => b.score - a.score);
      this.setState({ ranking: orderedRanking });
    }
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <article className="ranking-article">
        <section className="heading-section">
          <h1 className="heading" data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Logout
          </button>
        </section>
        { ranking.length === 0 ? <h1>Não há jogadores aqui</h1> : (
          <ul>
            { ranking.map((player, i) => (
              <li key={ player.name }>
                <div>
                  <h1
                    className="player-name-ranking"
                    data-testid={ `player-name-${i}` }
                  >
                    { player.name }
                  </h1>
                  <h3 data-testid={ `player-score-${i}` }>{ player.score }</h3>
                </div>
                <img
                  src={ player.picture }
                  alt={ `${player.name} pic` }
                />
              </li>
            ))}
          </ul>
        )}
      </article>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Ranking;
