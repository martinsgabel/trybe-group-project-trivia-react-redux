import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, nameState, score } = this.props;
    const emailCrypto = md5(email).toString();
    console.log(emailCrypto);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
          alt={ nameState }
        />
        <span data-testid="header-player-name">{ nameState }</span>
        <span data-testid="header-score">
          {' '}
          { score }
          {' '}
        </span>
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
