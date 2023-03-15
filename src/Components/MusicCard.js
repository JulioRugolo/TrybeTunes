import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import './MusicCard.css';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
    favoritedSongs: [],
    manualCheck: false,
  };

  async componentDidMount() {
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  handleChecked = async ({ target }) => {
    const { checked } = this.state;
    if (target.checked && checked === false) {
      this.setState({ loading: true, checked: true, manualCheck: true });
      await addSong(this.props);
      this.setState({ loading: false, favoritedSongs: await getFavoriteSongs() });
    } else {
      this.setState({ loading: true });
      await removeSong(this.props);
      this.setState(
        {
          loading: false,
          manualCheck: false,
          favoritedSongs: await getFavoriteSongs(),
        },
      );
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoritedSongs, manualCheck } = this.state;
    return (
      <div className="musics">
        <div className="trackName">
          <p>{ trackName }</p>
        </div>
        <div className="player">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <label data-testid={ `checkbox-music-${trackId}` } className="heart">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            onChange={ this.handleChecked }
            checked={
              manualCheck
                ? true
                : favoritedSongs.some((music) => music.trackName === trackName)
            }

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
