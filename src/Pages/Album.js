import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import './Album.css';
// import Carregando from '../Components/Carregando';

class Album extends Component {
  state = {
    albumInfo: {},
    tracks: [],
  };

  async componentDidMount() {
    const { params: { id } } = this.props;
    console.log(id);
    const musics = await getMusics(id);
    const [albumInfo, ...albumMusics] = await musics;
    this.setState({ albumInfo, tracks: albumMusics });
    // this.setState({ didUpdated: true });
  }

  render() {
    const { albumInfo, tracks } = this.state;
    console.log(albumInfo.artworkUrl100);
    return (
      <>
        <Header />
        <div data-testid="page-album" className="albumContent">
          <div className="albumInfo">
            <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.artistName } />
            <div className="info">
              <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
              <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
            </div>
          </div>
          <div className="tracks">
            {tracks.map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            ))}
          </div>
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
