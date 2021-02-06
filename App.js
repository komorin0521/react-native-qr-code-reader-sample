
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get("window").height;
    this.state = { 
      data: 'now scanning...',
      startDate: null,
      processTime: ''
   };
  }

  onSuccess(e) {
    const endDate = new Date();

    let processTime = '';
    if(this.state.startDate) {
      processTime = endDate.getTime() - this.state.startDate.getTime();
    }

    end = new Date()
    this.setState({
      data: e.data,
      processTime
    });
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  onPress(scanner) {
    this.setState({
      data: 'now scanning...',
      startDate: new Date(),
      processTime: ''
    });
    scanner.reactivate()
  }
  

  render() {
    return (
      <QRCodeScanner ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess.bind(this)}
        showMarker={true}
        cameraStyle={{height: this.height * 0.6}}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}> {this.state.data} {"\n"} processTime: {this.state.processTime} msec </Text> 
          </Text>
                   

        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => {this.onPress(this.scanner)}} >
            <Text style={styles.buttonText}>再アクティブ</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});