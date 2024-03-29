'use strict';
import React, {Component, Fragment} from 'react';
import Svg, {Line} from 'react-native-svg';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Button,
    ImageBackground,
    PanResponder,
    ActivityIndicator
} from 'react-native';
import Slider from '@react-native-community/slider';
import RNIosTesseract from 'react-native-ios-tesseract';
import Icon from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';


let VIEW_HEIGHT = '';
let VIEW_WIDTH = '';

//TODO incorrect scaleH
function _normalizeDataByScale(lines, scaleH, scaleW) {
    return lines.map((line) => {
        let nextLine = {...line};
        nextLine.start.x1 *= scaleW;
        nextLine.start.y1 = nextLine.start.y1 * scaleH - 25;

        nextLine.end.x2 *= scaleW;
        nextLine.end.y2 = nextLine.end.y2 * scaleH - 25;
        return nextLine
    })
}

//TODO incorrect  algoritm
//http://qaru.site/questions/17109/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
function pointIsInPoly(p, polygon) {
    let isInside = false;
    let minX = polygon[0].x;
    let maxX = polygon[0].x;
    let minY = polygon[0].y;
    let maxY = polygon[0].y;
    for (let n = 0; n < polygon.length; n++) {
        let node = polygon[n];
        minX = Math.min(node.x, minX);
        maxX = Math.max(node.x, maxX);
        minY = Math.min(node.y, minY);
        maxY = Math.max(node.y, maxY);
    }

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
        return false;
    }

   /* let i = 0;
    let j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
            p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
            isInside = !isInside;
        }
    }*/

    return true;
}

function _getWordCenter(bounding) {
    return {
        x: bounding.left + bounding.width/2,
        y: bounding.top + bounding.height/2
    }
}

function _getWordsByIntersection(lines, words, scale) {
    let result = [];
    for (let line of lines) {
        let boundaries = [
            {
                x: line.start.x1,
                y: line.start.y1
            },
            {
                x: line.end.x2,
                y: line.end.y2
            },
            {
                x: line.start.x1,
                y: line.start.y1 + (line.width * scale)
            },
            {
                x: line.end.x2,
                y: line.end.y2 + (line.width * scale)
            }
        ];
        for (let word of words) {
            let wordCenter = _getWordCenter(word.bounding);
            if (pointIsInPoly(wordCenter, boundaries)) {
                result.push(word.text);
            }
        }
    }

    return result.join(' ');
}

function _createNote(words) {
    return {
        id: Math.floor(Math.random() * 100000),
        date: moment(),
        text: words
    }
}

class CitationFooter extends Component {
    constructor(props) {
        super(props);
    }

    async onNoteCreate() {
        //TODO: bugfix Algoritm
        this.props.onCreateNoteStart();
        let {imageDimensions, recognizedText} = await RNIosTesseract.recognize(this.props.uri);
        let scaleH = imageDimensions.imageHeight / VIEW_HEIGHT;
        let scaleW = imageDimensions.imageWidth / VIEW_WIDTH;
        let normalizedLines = _normalizeDataByScale(this.props.lines, scaleH, scaleW);
        let words = _getWordsByIntersection(normalizedLines, recognizedText, scaleH);
        let note = _createNote(words);
        this.props.onCreateNoteEnd();
        this.props.onNoteCreate(note)
    }

    render() {
        let {lineWidth, lineColor} = this.props;
        let isProcessingDisabled = this.props.lines.length === 0;
        return (
        <View style={styles.footer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Slider
                    style={[styles.widthSlider]}
                    minimumValue={10}
                    maximumValue={25}
                    minimumTrackTintColor={'#ffd73e'}
                    value={lineWidth}

                    onSlidingComplete={(value) => this.props.setCitationLineWidth(value)}
                />
                <View style={StyleSheet.flatten(styles.widthIndicator(lineWidth, lineColor))}/>
            </View>
            <TouchableOpacity  disabled={isProcessingDisabled} style={[isProcessingDisabled ? styles.disabledButton : '']} onPress={() => this.onNoteCreate()}>
                <Icon name="check" size={35} color="#ffd73e"/>
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
            color: this.props.lineColor,
            width: this.props.lineWidth,
            start: {
                x1: start.x,
                y1: start.y
            },
            end: end ? {
                x2: end.x,
                y2: end.y
            } : {
                //show new line as text cursor
                x2: start.x + 2,
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
                stroke={line.color}
                strokeWidth={line.width}
            />
        );
        return (
            <View {...this._panResponder.panHandlers} style={{flex: 1}} onLayout={(event) => {
                let layout = event.nativeEvent.layout;
                VIEW_WIDTH = layout.width;
                VIEW_HEIGHT = layout.height;
            }}>
                <ActivityIndicator style={styles.createNoteIndicator} size="large" color="#ffd73e" animating={this.props.showActivityIndicator}/>
                <ImageBackground resizeMode={'stretch'} source={{uri: this.props.uri}} style={{width: '100%', height: '100%'}}>
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

    headerButton: {
        position: 'absolute',
        zIndex: 1,
        top: 35
    },

    disabledButton: {
        opacity: 0.5
    },

    closeButton: {
        left: 15,
    },

    undoButton: {
        right: 15
    },

    buttonShadow: {
        textAlign: 'center',
        shadowOpacity: 0.8,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    },

    widthSlider: {
        marginRight: 5,
        height: 15,
        width: 75
    },

    createNoteIndicator: {
        top: '50%',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
        shadowOpacity: 0.3,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    },

    widthIndicator: (lineWidth) => ({
        height: lineWidth,
        width: lineWidth,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: lineWidth/2
    })
});