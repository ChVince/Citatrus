'use strict';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function CitationImg (props) {
    return (
        <Image style={styles.image}
            source={{uri: props.uri}}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 3,
        alignSelf: 'stretch',
        backgroundColor: '#000'
    }
});