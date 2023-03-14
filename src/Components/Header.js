import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      getUserReturn: false,
      user: '',
    };
  }

  async componentDidMount() {
    const response = await getUser();
    this.setState({ getUserReturn: true, user: response.name });
    console.log(response);
  }

  render() {
    const { getUserReturn, user } = this.state;
    return (
      <header data-testid="header-component">
        <section data-testid="header-user-name">
          {getUserReturn ? user : <Carregando />}
        </section>
      </header>
    );
  }
}

export default Header;
