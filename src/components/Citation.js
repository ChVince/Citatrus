'use strict';
import React, {Component, Fragment} from 'react';
import Svg, {Line} from 'react-native-svg';
import {View, StyleSheet, TouchableOpacity, Text, Button, ImageBackground, PanResponder} from 'react-native';
import RNIosTesseract from "react-native-ios-tesseract";


let VIEW_HEIGHT = '';
let VIEW_WIDTH = '';

class CitationFooter extends Component {
    constructor(props) {
        super(props);
    }

    nextStrokeWidth() {
        //TODO:// Implement
    }

    render() {
        let {lineWidth} = this.props;
        return (
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.onSave()} style={styles.save}>
                <Text style={{fontSize: 14}}> Save </Text>
            </TouchableOpacity>
           {/* <TouchableOpacity onPress={() => this.nextStrokeWidth()}>
                <View style={styles.strokeWidthButton}>
                    <View style={{
                        backgroundColor: 'white', marginHorizontal: 2.5,
                        width: Math.sqrt(lineWidth / 3) * 10,
                        height: Math.sqrt(lineWidth / 3) * 10,
                        borderRadius: Math.sqrt(lineWidth / 3) * 10 / 2
                    }} />
                </View>
            </TouchableOpacity>*/}
        </View>
       )
    }
}

class CitationHeader extends Component{
    constructor(props) {
        super(props);
    }

    render() {
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


class CitationSVG extends Component{
    constructor(props) {
        super(props);
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                let start = this._getPoint(this._getOffset(evt), gestureState.x0, gestureState.y0);
                let line = this._createLine(start);
                this.props.onCitationStart(line);

            },
            onPanResponderMove: (evt, gestureState) => {
                let start = this._getPoint(this._getOffset(evt), gestureState.x0, gestureState.y0);
                let end = this._getPoint(this._getOffset(evt), gestureState.moveX, gestureState.moveY);
                let line = this._createLine(start, end);
                this.props.onCitationUpdate(line);

            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.props.onCitationRelease();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.props.onCitationRelease();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    _getOffset(evt) {
        const e = evt.nativeEvent;
        return {
            x: e.pageX - e.locationX,
            y: e.pageY - e.locationY
        };
    }

    _getPoint(offset, x, y) {
        return {
            x: parseFloat((x - offset.x).toFixed(2)),
            y: parseFloat((y - offset.y).toFixed(2))
        };
    }

    _createLine(start, end) {
        //init line as point
        return {
            id: this.props.activeLine ? this.props.activeLine.id : Math.floor(Math.random() * 100000),
            start: {
                x1: start.x,
                y1: start.y
            },
            end: end ? {
                x2: end.x,
                y2: end.y
            } : {
                x2: start.x,
                y2: start.y
            }
        }
    }

    render() {
        let lines = this.props.lines.map((line, idx) =>
            <Line
                key={idx}
                x1={line.start.x1}
                y1={line.start.y1}
                x2={line.end.x2}
                y2={line.end.y2}
                stroke={this.props.lineColor}
                strokeWidth={this.props.lineWidth}
            />
        );
        return (
            <View {...this._panResponder.panHandlers} style={{ flex: 1, flexDirection: 'row' }} onLayout={(event) => {
                let layout = event.nativeEvent.layout;
                VIEW_WIDTH = layout.width;
                VIEW_HEIGHT = layout.height;
            }}>
                <ImageBackground source={{uri: this.props.uri}} style={{width: '100%', height: '100%'}}>
                    <Svg
                        height="100%"
                        width="100%"
                    >
                        {lines}
                    </Svg>
                </ImageBackground>
            </View>
        )
    }
}



export default class Citation extends Component {
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
                <CitationHeader {...this.props} />
                <CitationSVG {...this.props} />
                <CitationFooter {...this.props} />
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
    },
    strokeWidthButton: {
        marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
    }
});