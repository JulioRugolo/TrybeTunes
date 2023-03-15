import { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoritedSongs: [],
  };

  async componentDidMount() {
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  async componentDidUpdate() {
    this.setState({ favoritedSongs: await getFavoriteSongs() });
  }

  render() {
    const { favoritedSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoritedSongs.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
