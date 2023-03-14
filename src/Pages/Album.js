import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
// import Carregando from '../Components/Carregando';

class Album extends Component {
  state = {
    albumInfo: {},
    tracks: [],
  };

  async componentDidMount() {
    const { params: { id } } = this.props;
    const musics = await getMusics(id);
    const [albumInfo, ...albumMusics] = await musics;
    this.setState({ albumInfo, tracks: albumMusics });
    // this.setState({ didUpdated: true });
  }

  render() {
    const { albumInfo, tracks } = this.state;
    console.log(tracks);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
          <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
          {tracks.map((music) => (
            <MusicCard
              key={ music.trackName }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />
          ))}
        </div>
      </>
    );
    // return <Carregando />;
  }
}

Album.propTypes = {
  id: PropTypes.number,
}.required;

export default Album;
