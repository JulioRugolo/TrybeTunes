import { Component } from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistInput: '',
      isButtonDisable: true,
      // loading: true,
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
    // this.setState({ buttonActivated: true });
    await searchAlbumsAPI(artistInput);
    // this.setState({ loading: false });
  };

  render() {
    const { artistInput, isButtonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
    );
  }
}

export default Search;
