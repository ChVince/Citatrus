'use strict';
import React, {Component, Fragment} from 'react';
import Dimensions from 'Dimensions'
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import RNIosTesseract from "react-native-ios-tesseract";


let VIEW_HEIGHT = '';
let VIEW_WIDTH = '';
export default class Citation extends Component {
    constructor(props) {
        super(props);
    }

    async onSave() {
        let paths = this.canvas.getPaths();
        //TODO: norm
        let {imageDimensions, recognizedText} = await RNIosTesseract.recognize(this.props.uri);
        let scaleH = imageDimensions.height / VIEW_HEIGHT;
        let scaleW = imageDimensions.width / VIEW_WIDTH;
        this.props.onSave(paths, recognizedText);
    }

    render() {
        return (
            <Fragment>
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
                <View style={{ flex: 1, flexDirection: 'row' }} onLayout={(event) => {
                    let layout = event.nativeEvent.layout;
                    VIEW_WIDTH = layout.width;
                    VIEW_HEIGHT = layout.height;
                }}>
                    <SketchCanvas
                        ref={ref => this.canvas = ref}
                        localSourceImage={{ filename: this.props.uri, directory: null, mode: 'ScaleToFill' }}
                        style={{ flex: 1 }}
                        strokeColor={'#12002559'}
                        strokeWidth={1}
                    />
                </View>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.onSave()} style={styles.save}>
                        <Text style={{fontSize: 14}}> Save </Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
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
    },
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