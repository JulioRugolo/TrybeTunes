import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
    favoritedSongs: [],
  };

  async componentDidMount() {
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  handleChecked = async ({ target }) => {
    const { checked } = this.state;
    if (target.checked && checked === false) {
      this.setState({ loading: true, checked: true });
      await addSong(this.props);
      this.setState({ loading: false });
    } else {
      await removeSong(this.props);
      this.setState({ loading: false });
    }
  };

  render() {
    console.log(this.props);
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoritedSongs } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            onChange={ this.handleChecked }
            checked={ favoritedSongs.some((music) => music.trackName === trackName) }

          />
        </label>
        {loading ? <Carregando /> : ''}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.required;

export default MusicCard;
