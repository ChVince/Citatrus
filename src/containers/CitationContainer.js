import {setPhotoForCitation} from '../actions/cameraActions'
import CameraRoll from "@react-native-community/cameraroll/js/CameraRoll";
import { connect } from 'react-redux'
import Citation from '../components/Citation'

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => {

        },
        onSave: () => {

        },
        onUndo: () => {

        },
        onRedo: () => {

        }
    }
};

const mapStateToProps = state => ({
    uri: state.uri
});

const CitationContainer = connect(
    mapDispatchToProps,
    mapStateToProps
)(Citation);

export default CitationContainer