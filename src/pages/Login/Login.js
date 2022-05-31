import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import getToken from '../../functions/api/getToken';
import localStorage from '../../functions/localStorage/localStorage';
import userInfo from '../../actions/userInfo';
import Trivia from '../../images/Trivia(light mode).png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disable: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.disableFunction);
  }

  disableFunction = () => {
    const { name, email } = this.state;
    const valid = this.isEmailValid();
    if (name === '' || email === '' || valid === false) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  isEmailValid = () => {
    const { email } = this.state;
    const emailValidation = (/^\w+@[a-z]+(\.[a-z]+){1,2}$/i);
    return emailValidation.test(email);
  }

  playFunction = async () => {
    const { name, email } = this.state;
    const { userDispatch, history } = this.props;
    const token = await getToken();
    localStorage(token);
    userDispatch({ name, email });
    history.push('/game');
  }

  render() {
    const { name, email, disable } = this.state;
    return (
      <form>
        <img src={ Trivia } alt="trivia team logo" />
        <label htmlFor="input-player-name">
          Name
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            id="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <section className="button-section">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disable }
            onClick={ () => this.playFunction() }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </section>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(userInfo(state)),
});

Login.propTypes = {
  userDispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
