import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisable: true,
      nameInput: '',
      loading: true,
      buttonActivated: false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
    const MIN = 3;
    if (target.value.length >= MIN) {
      this.setState({
        isButtonDisable: false,
      });
    }
    if (target.value.length < MIN) {
      this.setState({
        isButtonDisable: true,
      });
    }
  };

  submitButton = async (event) => {
    event.preventDefault();
    const { nameInput } = this.state;
    const user = { name: nameInput };
    this.setState({ buttonActivated: true });
    await createUser(user);
    this.setState({ loading: false });
  };

  render() {
    const { isButtonDisable, nameInput, loading, buttonActivated } = this.state;
    return (
      <div data-testid="page-login" className="loginPage">
        <h1>Faça Login</h1>
        <form>
          <label htmlFor="nameInput">
            <input
              type="text"
              data-testid="login-name-input"
              id="nameInput"
              name="nameInput"
              onChange={ this.handleChange }
              value={ nameInput }
              placeholder="Digite seu nome"
            />
            <button
              data-testid="login-submit-button"
              disabled={ isButtonDisable }
              onClick={ this.submitButton }
            >
              Entrar
            </button>
          </label>
          {buttonActivated && <Carregando />}
          {!loading && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  enableButton: PropTypes.bool,
}.required;

export default Login;
