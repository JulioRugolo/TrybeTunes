import { Component } from 'react';
import AlbumCard from '../Components/AlbumCard';
import Carregando from '../Components/Carregando';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistInput: '',
      isButtonDisable: true,
      artistResult: [],
      loading: true,
      buttonActivated: false,
      artistSearch: '',
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
    const MIN = 2;
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
    const { artistInput } = this.state;
    this.setState({ buttonActivated: true, artistSearch: artistInput });
    const arrayArtists = await searchAlbumsAPI(artistInput);
    this.setState(
      { artistInput: '',
        artistResult: arrayArtists,
        loading: false,
        buttonActivated: false },
    );
  };

  render() {
    const { artistInput,
      artistSearch,
      isButtonDisable,
      artistResult,
      loading,
      buttonActivated } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="search">
          <div className="form">
            <input
              data-testid="search-artist-input"
              placeholder="Pesquise um artista"
              value={ artistInput }
              onChange={ this.handleChange }
              name="artistInput"
            />
            <button
              data-testid="search-artist-button"
              name="artistInput"
              onClick={ this.submitButton }
              disabled={ isButtonDisable }
            >
              Pesquisar
            </button>
          </div>
          <div className="resultOf">{`Resultado de álbuns de: ${artistSearch}`}</div>
          {buttonActivated ? <Carregando /> : ''}
          <div className="albunsResult">
            {(!loading && artistResult.length > 0) ? artistResult.map((artist) => (
              <AlbumCard
                key={ artist.collectionId }
                coverImg={ artist.artworkUrl100 }
                albumName={ artist.collectionName }
                artistName={ artist.artistName }
                collectionId={ artist.collectionId }
              />
            )) : <p>Nenhum álbum foi encontrado é exibida</p>}
          </div>
        </div>
      </>
      // coverImg, artistName, albumName, collectionId
    );
  }
}

export default Search;
