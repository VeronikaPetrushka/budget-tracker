import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = styles.icon;

  switch (type) {
    case 'add':
        imageSource = require('../assets/common/add.png');
        break;
    case 'minus':
        imageSource = require('../assets/common/minus.png');
        break;

    // case 'close':
    //   imageSource = require('../assets/common/close.png');
    //   iconStyle = styles.closeIcon;
    //   break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#8b7e56',
  }
});

export default Icons;
