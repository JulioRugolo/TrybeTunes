import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Header.css';

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
      <header data-testid="header-component" className="header">
        <section className="navbar">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            Search

          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favorites

          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            Profile

          </Link>
        </section>
        <section data-testid="header-user-name" className="welcome">
          {getUserReturn ? user : <Carregando />}
          <Link to="/" className="logout">(logout)</Link>
        </section>
      </header>
    );
  }
}

export default Header;
