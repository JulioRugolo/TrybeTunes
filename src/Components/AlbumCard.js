import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { coverImg, artistName, albumName, collectionId } = this.props;
    return (
      <div data-testid="page-album" className="cardAlbum">
        <img src={ coverImg } alt={ artistName } />
        <div className="info">
          <p>{ albumName }</p>
          <p>{ artistName }</p>
          <Link
            to={ `/album/${collectionId}` }
            artist={ albumName }
            album={ albumName }
            data-testid={ `link-to-album-${collectionId}` }
            className="albumDetails"
          >
            Detalhes

          </Link>
        </div>
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
