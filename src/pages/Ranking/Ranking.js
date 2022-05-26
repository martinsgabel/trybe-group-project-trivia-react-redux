import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <article>
        {/* <Header /> */}
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Logout
        </button>
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
