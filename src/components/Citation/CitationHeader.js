'use strict';
import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function CitationHeader(props) {
    return (
        <View className='c-citation-header' style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={props.onBack}>
                <Button style={styles.button}
                    title="Back"
                    color="#FFFFFF"
                />
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.button} onPress={props.onUndo}>
                    <Button
                        onPress={props.onUndo}
                        title="Undo"
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-between'
    },

    button: {
        backgroundColor: '#a8a2a7',
    }
});