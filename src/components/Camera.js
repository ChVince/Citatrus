'use strict';
import React , {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/EvilIcons';

class Camera extends Component {
    constructor(props) {
        super(props);
    }

    onSnapClick() {
        this.props.navigation.navigate('Citation');
        this.props.onSnapClick(this.camera);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.toListButton, styles.buttonShadow]} onPress={() => this.props.navigation.navigate('NoteList')}>
                    <Icon name="chevron-right" size={35} color="white"/>
                </TouchableOpacity>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                />

                    <TouchableOpacity onPress={() => this.onSnapClick()} style={styles.captureOuter}>
                       <View  style={styles.captureInner}/>
                    </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    toListButton: {
        position: 'absolute',
        right: 25,
        top: 35,
        zIndex: 1
    },

    preview: {
        height: '100%'
    },

    captureOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#929292',
        borderRadius: 60/2,
        height: 60,
        width: 60,
        zIndex: 10,
        opacity: 0.8,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 30
    },

    captureInner: {
        backgroundColor: '#fff',
        borderRadius: 40/2,
        height: 40,
        width: 40
    },

    buttonShadow: {
        textAlign: 'center',
        shadowOpacity: 0.4,
        textShadowOffset: {
            width: 0,
            height: 1
        }
    }
});

export default Camera;
