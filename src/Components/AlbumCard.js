import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  state = {
    artist: '',
    album: '',
  };

  componentDidMount() {
    const { artistName, albumName } = this.props;
    this.setState(
      {
        artist: artistName,
        album: albumName,
      },
    );
  }

  render() {
    const { coverImg, artistName, albumName, collectionId } = this.props;
    const { artist, album } = this.state;
    console.log(artist);
    console.log(album);
    return (
      <div data-testid="page-album" className="cardAlbum">
        <img src={ coverImg } alt={ artistName } />
        <p>{ albumName }</p>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          artist={ albumName }
          album={ albumName }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Detalhes

        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  coverImg: PropTypes.string,
  artistName: PropTypes.string,
  albumName: PropTypes.string,
  collectionId: PropTypes.number,
}.required;

export default AlbumCard;
