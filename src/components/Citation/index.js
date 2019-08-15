'use strict';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import CitationHeader from './CitationHeader'
import CitationImg from './CitationImg'
import CitationFooter from './CitationFooter'

export default class Citation extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View className='c-citation-container' style={styles.container}>
                <CitationHeader
                    onBack={this.props.onBack}
                    onUndo={this.props.onUndo}
                    onRedo={this.props.onRedo}
                />
                <CitationImg uri={this.props.uri}/>
                <CitationFooter
                    onSave={this.props.onSave}
                    uri={this.props.uri}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});