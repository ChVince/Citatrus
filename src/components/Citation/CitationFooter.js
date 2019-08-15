'use strict';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function CitationFooter(props) {
    return (
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={props.onSave} style={styles.save}>
                <Text style={{fontSize: 14}}> Save </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    save: {
        flex: 0,
        backgroundColor: '#5397ff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 40
    }
});