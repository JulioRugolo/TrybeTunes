import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';
import Carregando from '../Components/Carregando';

class Profile extends Component {
  state = {
    userInfo: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ userInfo: user, loading: false });
  }

  render() {
    const { loading, userInfo: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile" className="profile">
        <Header />
        <div className="fullProfile">
          { loading ? <Carregando /> : (
            <div>
              <h1>
                Seu perfil
              </h1>
              <div className="pictureAndEdit">
                <img src={ image } alt={ name } />
                <Link to="/profile/edit" className="editButton">Editar perfil</Link>
              </div>
              <div className="nome">
                <h1>{name}</h1>
                <p>{email}</p>
                <p>{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
