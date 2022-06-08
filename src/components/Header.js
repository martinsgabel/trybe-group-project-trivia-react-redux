import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Header.css';
import Trivia from '../images/Trivia(light mode).png';

class Header extends Component {
  render() {
    const { email, nameState, score } = this.props;
    const emailCrypto = md5(email).toString();
    return (
      <header>
        <img src={ Trivia } alt="trivia team logo" className="trivia-logo" />
        <span data-testid="header-score">
          { score }
          {' '}
          pts
        </span>
        <section className="player-info-header">
          <span data-testid="header-player-name">{ nameState }</span>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
            alt={ nameState }
            className="profile-picture-header"
          />
        </section>
        <div className="header-detail">
          <div className="detail-pink" />
          <div className="detail-yellow" />
          <div className="detail-blue" />
          <div className="detail-green" />
          <div className="detail-red" />
          <div className="detail-purple" />
        </div>
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
