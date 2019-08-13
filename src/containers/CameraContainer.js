import {setPhotoForCitation} from '../actions/cameraActions'
import CameraRoll from "@react-native-community/cameraroll/js/CameraRoll";
import { connect } from 'react-redux'
import Camera from '../components/Camera'

const mapDispatchToProps = dispatch => {
    return {
        onSnapClick: async (camera) => {
            if (camera) {
                let data = await camera.takePictureAsync();
                await CameraRoll.saveToCameraRoll(data.uri);
                dispatch(setPhotoForCitation(data.uri))
            }
        };
    }
};

const CameraContainer = connect(
    mapDispatchToProps
)(Camera);

export default CameraContainer