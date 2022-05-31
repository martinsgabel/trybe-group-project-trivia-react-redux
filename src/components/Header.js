import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Header.css';
import Trivia from '../images/Trivia.png';

class Header extends Component {
  render() {
    const { email, nameState, score } = this.props;
    const emailCrypto = md5(email).toString();
    return (
      <header>
        <img src={ Trivia } alt="trivia team logo" className="trivia-logo" />
        <section className="player-info-header">
          <span data-testid="header-player-name">{ nameState }</span>
          <span data-testid="header-score">
            {' '}
            { score }
            {' '}
            pts
          </span>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
            alt={ nameState }
            className="profile-picture-header"
          />
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nameState: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  nameState: propTypes.string,
  score: propTypes.number,
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
