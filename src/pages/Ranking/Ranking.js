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
        <header className="heading-section">
          <h1 className="heading" data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Logout
          </button>
          <div className="header-detail">
            <div className="detail-pink" />
            <div className="detail-yellow" />
            <div className="detail-blue" />
            <div className="detail-green" />
            <div className="detail-red" />
            <div className="detail-purple" />
          </div>
        </header>
        { ranking.length === 0 ? <h1>Não há jogadores aqui</h1> : (
          <ul className="podio-ranking">
            { ranking.map((player, i) => (
              <li key={ player.name } className={ `item-ranking r${ranking.length}` }>
                <span className="order">{i + 1}</span>
                <h3 data-testid={ `player-score-${i}` }>{ player.score }</h3>
                <h1
                  className="player-name-ranking"
                  data-testid={ `player-name-${i}` }
                >
                  { player.name }
                </h1>
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
