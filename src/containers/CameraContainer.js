import {setPhotoForCitation} from '../actions/cameraActions'
import CameraRoll from "@react-native-community/cameraroll/js/CameraRoll";
import { connect } from 'react-redux'
import React, {Component} from 'react'
import Camera from '../components/Camera'


const mapDispatchToProps = (dispatch) => {
    return {
        onSnapClick: async (camera) => {
            if (camera) {
                let data = await camera.takePictureAsync();
                await CameraRoll.saveToCameraRoll(data.uri);
                dispatch(setPhotoForCitation(data.uri))
            }
        }
    }
};


class CameraContainer extends Component {
    static navigationOptions = {
        title: 'Camera'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Camera {...this.props}/>
        )
    }
}

export default connect(null, mapDispatchToProps)(CameraContainer);