import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import { createUser } from '../services/userAPI';

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
    this.setState({ buttonActivated: true });
    await createUser({ name: nameInput });
    this.setState({ loading: false });
  };

  render() {
    const { isButtonDisable, nameInput, loading, buttonActivated } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nameInput">
            <input
              type="text"
              data-testid="login-name-input"
              id="nameInput"
              name="nameInput"
              onChange={ this.handleChange }
              value={ nameInput }
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
