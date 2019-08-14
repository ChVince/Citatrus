'use strict';
import React from 'react';
import {View, Button} from 'react-native';

export default function CitationFooter(props) {
    return (
        <View className='c-citation-footer'>
            <Button
                onPress={props.onSave}
                title="Save"
                color="#841584"
            />
        </View>
    )
}