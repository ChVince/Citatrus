'use strict';
import React, { Component }from 'react';
import {View, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default class CitationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View className='c-citation-header' style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={this.props.onRedo}>
                    <Button style={styles.button}
                            title="Redo"
                            color="#FFFFFF"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.props.onUndo}>
                    <Button
                        title="Undo"
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 0,
        alignSelf: 'stretch',
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-between'
    },

    button: {
        backgroundColor: '#a8a2a7',
    }
});