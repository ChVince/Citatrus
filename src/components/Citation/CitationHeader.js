'use strict';
import React from 'react';
import {View, Button} from 'react-native';

export default function CitationHeader(props) {
    return (
        <View className='c-citation-header'>
            <Button
                onPress={props.onBack}
                title="Back"
                color="#841584"
            />
            <Button
                onPress={props.onUndo}
                title="Undo"
                color="#841584"
            />
            <Button
                onPress={props.onRedo}
                title="Redo"
                color="#841584"
            />
        </View>
    )
}