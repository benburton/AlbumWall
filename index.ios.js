import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Sonos from './sonos';

/**
 * You need to statically define the routes for images, because react-native
 * doesn't handle dynamic image paths for performance reasons.
 */
const imageMap = {
  0: require('./images/0.png'),
  1: require('./images/1.png'),
  2: require('./images/2.png'),
  3: require('./images/3.png'),
  4: require('./images/4.png'),
  5: require('./images/5.png'),
  6: require('./images/6.png'),
  7: require('./images/7.png'),
  8: require('./images/8.png')
};

const colors = [
  "#222224", "#2B386B", "#EEC249", "#E6CAA7", "#2F2F31", "#B5182F", "#222224", "#2E3B58", "#5E9AAC"
];

function chunk(array, n) {
  if (!array.length) {
    return [];
  }
  return [array.slice(0, n)].concat(chunk(array.slice(n), n));
}

const albums = require('./albums.json');
const albumRows = chunk(albums, 3);

class AlbumBlock extends Component {

  constructor(props) {
    super(props);
  }

  _onPress() {
    Sonos.playFavorite(this.props.album);
  }

  render() {
    return <Col style={{backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableHighlight onPress={this._onPress.bind(this)}>
        <Image source={imageMap[this.props.index]} style={{width: 90, height: 90}} />
      </TouchableHighlight>
    </Col>;
  }
}

export default class AlbumWall extends Component {

  size() {
    return Dimensions.get('window').width / 3;
  }

  render() {
    return <View style={{height: this.size() * 3}}>
      <Grid style={{marginTop: 20}}>
        {
          albumRows.map((albumRow, rowIndex) => {
            return <Row key={rowIndex}>
              {
                albumRow.map((album, colIndex) => {
                  console.log(album.tracks);
                  return <AlbumBlock 
                    album={album} key={colIndex} color={colors[rowIndex * 3 + colIndex]} index={rowIndex * 3 + colIndex}>
                  </AlbumBlock>;
                })
              }
            </Row>;
          })
        }
      </Grid>
    </View>;
  }
}

AppRegistry.registerComponent('AlbumWall', () => AlbumWall);
