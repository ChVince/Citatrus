'use strict';
import React, {Component, Fragment} from 'react';
import Svg, {Line} from 'react-native-svg';
import {View, StyleSheet, TouchableOpacity, Text, Button, ImageBackground, PanResponder} from 'react-native';
import RNIosTesseract from "react-native-ios-tesseract";
import Icon from 'react-native-vector-icons/EvilIcons';


let VIEW_HEIGHT = '';
let VIEW_WIDTH = '';

function normalizeDataByScale(lines, scaleH, scaleW) {
    return lines.map((line) => {
        let nextLine = {...line};
        nextLine.start.x1 *= scaleW;
        nextLine.start.y1 *= scaleH;

        nextLine.end.x2 *= scaleW;
        nextLine.end.y2 *= scaleH;
        return nextLine
    })
}

function isLineContainWord(line, wordCenter, accuracy) {
    let res = (wordCenter.x - line.start.x1)/(line.end.x2 - line.start.x1) - (wordCenter.y - line.start.y1)/(line.end.y2 - line.start.y1)
    return 10 >= Math.abs(res)
}

function _getWordCenter(bounding) {
    return {
        x: bounding.left + bounding.width/2,
        y: bounding.top + bounding.height/2
    }
}

function getWordsByIntersection(lines, words, accuracy) {
    let result = [];
    for (let line of lines) {
        for (let word of words) {
            let wordCenter = _getWordCenter(word.bounding);
            if (isLineContainWord(line, wordCenter, accuracy)) {
                result.push(word.text);
            }
        }
    }
}

class CitationFooter extends Component {
    constructor(props) {
        super(props);
    }

    nextStrokeWidth() {
        //TODO:// Implement
    }

    async onAnnotate() {
        //TODO: bugfix Algoritm
        let {imageDimesions, recognizedText} = await RNIosTesseract.recognize(this.props.uri);
        let scaleH = imageDimesions.imageHeight / VIEW_HEIGHT;
        let scaleW = imageDimesions.imageWidth / VIEW_WIDTH;
        let normalizedLines = normalizeDataByScale(this.props.lines, scaleH, scaleW);
        let words = getWordsByIntersection(normalizedLines, recognizedText, this.props.lineWidth);

    }

    render() {
        let {lineWidth} = this.props;
        return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.onAnnotate()} style={[styles.footerButton, styles.widthButton]}>
                <Text style={{fontSize: 14}}> Width </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onAnnotate()} style={[styles.footerButton, styles.annotateButton]}>
                <Text style={{fontSize: 14}}> Annotate </Text>
            </TouchableOpacity>
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
            <Fragment>
                <TouchableOpacity style={[styles.headerButton, styles.closeButton, styles.buttonShadow]} onPress={() => this.props.onPhotoRelease()}>
                    <Icon name="close" size={35} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headerButton, styles.undoButton, styles.buttonShadow]} onPress={() => this.props.onCitationUndo()}>
                    <Icon name="undo" size={35} color="white"/>
                </TouchableOpacity>
            </Fragment>
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
            <View {...this._panResponder.panHandlers} style={{flex: 1}} onLayout={(event) => {
                let layout = event.nativeEvent.layout;
                VIEW_WIDTH = layout.width;
                VIEW_HEIGHT = layout.height;
            }}>
                <ImageBackground  resizeMode={'stretch'} source={{uri: this.props.uri}} style={{width: '100%', height: '100%'}}>
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

    render() {
        return (
            <View style={styles.container}>
                <CitationHeader {...this.props} />
                <CitationSVG {...this.props} />
                <CitationFooter {...this.props} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    footer: {
        height: 55,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    footerButton: {
        height: 30,
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5
    },

    headerButton: {
        position: 'absolute',
        zIndex: 1,
        top: 35
    },

    closeButton: {
        left: 15,
    },

    undoButton: {
        right: 15
    },

    buttonShadow: {
        textAlign: 'center',
        shadowOpacity: 0.4,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    },

    annotateButton: {
        backgroundColor: '#ffd73e'
    },

    widthButton: {
        backgroundColor: '#f3f3f3'
    }
});