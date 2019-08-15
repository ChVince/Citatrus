'use strict';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function CitationImg (props) {
    return (
        <View style={styles.image}>
            <Image style={{width: 300, height: 300}}
                source={{uri: props.uri}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
});