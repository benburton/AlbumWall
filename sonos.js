export default class Sonos {

  static async play(tracks) {
    const spotifyUris = tracks.map((track) => { return track.spotify});
    try {
      await fetch('http://192.168.1.151:5005/clearqueue');
      spotifyUris.forEach(async (uri, index) => {
        await fetch(`http://192.168.1.151:5005/spotify/${index === 0 ? 'now' : 'queue'}/${uri}`);
      });
    } catch(error) {
      console.error(error);
    }
  }

  static async playFavorite(album) {
    try {
      let uri = album.tracks[album.favorite - 1].spotify;
      await fetch('http://192.168.1.151:5005/clearqueue');
      await fetch(`http://192.168.1.151:5005/spotify/now/${uri}`);
    } catch(error) {
      console.error(error);
    }
  }
  
}