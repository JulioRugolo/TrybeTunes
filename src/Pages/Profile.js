import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';
import Carregando from '../Components/Carregando';

class Profile extends Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user: { name, email, image, description } } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="profile">
          { loading ? <Carregando /> : (
            <div className="fullProfile">
              <div>
                <p>
                  Seu perfil
                </p>
                <div className="pictureAndEdit">
                  <img data-testid="profile-image" src={ image } alt={ name } />
                  <Link to="/profile/edit" className="editButton">Editar perfil</Link>
                </div>
                <div className="nome">
                  <h1>{name}</h1>
                  <p>{email}</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
