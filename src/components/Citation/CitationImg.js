'use strict';
import React from 'react';
import {View, Image} from 'react-native';

export default function CitationFooter(props) {
    return (
        <View className='c-citation-img'>
            <Image
                style={{width: 66, height: 58}}
                source={{uri: props.uri }}
            />
        </View>
    )
}