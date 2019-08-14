'use strict';
import React from 'react';
import {View} from 'react-native';
import CitationHeader from './CitationHeader'
import CitationImg from './CitationImg'
import CitationFooter from './CitationFooter'

export default function Citation(props) {
    return (
        <View className='c-citation-container'>
            <CitationHeader
                onBack={props.onBack}
                onUndo={props.onUndo}
                onRedo={props.onRedo}
            />
            <CitationImg/>
            <CitationFooter
                onSave={props.onSave}
            />
        </View>
    )
}