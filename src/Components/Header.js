import { Component } from 'react';
import { Link } from 'react-router-dom';
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
  }

  render() {
    const { getUserReturn, user } = this.state;
    return (
      <header data-testid="header-component">
        <section data-testid="header-user-name">
          {getUserReturn ? user : <Carregando />}
        </section>
        <section>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </section>
      </header>
    );
  }
}

export default Header;
