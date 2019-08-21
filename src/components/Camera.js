'use strict';
import React , {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';

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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteList')}>
                    <Icon name="right" size={20} color="white" style={styles.backButton}/>
                </TouchableOpacity>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.onSnapClick()} style={styles.captureOuter}>
                        <View  style={styles.captureInner}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-end',
        margin: 30
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureOuter: {
        flex: 0,
        backgroundColor: '#929292',
        borderRadius: 60/2,
        height: 60,
        width: 60,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    captureInner: {
        backgroundColor: '#fff',
        borderRadius: 40/2,
        alignSelf: 'center',
        marginTop: 10,
        height: 40,
        width: 40
    }
});

export default Camera;
