import {stopPhotoCitation} from '../actions/citationActions'
import { connect } from 'react-redux'
import React, {Component, Fragment} from 'react'
import Citation from '../components/Citation/index'
import Camera from '../components/Camera'
import {setPhotoForCitation} from "../actions/cameraActions";
import CameraRoll from "@react-native-community/cameraroll/js/CameraRoll";

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => {
            this.props.navigation.goBack();
            dispatch(stopPhotoCitation())
        },
        onSave: () => {

        },
        onUndo: () => {

        },
        onRedo: () => {

        },
        onSnapClick: async (camera) => {
            if (camera) {
                let data = await camera.takePictureAsync();
                await CameraRoll.saveToCameraRoll(data.uri);
                dispatch(setPhotoForCitation(data.uri))
            }
        }
    }
};

const mapStateToProps = (state) => {
    return {
        uri: state.citation.activePhotoURI,
    }
};

class CitationContainer extends Component {
    static navigationOptions = {
        title: 'Playground'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>{
                this.props.uri ?
                <Citation {...this.props}/> :
                <Camera {...this.props}/>
            }
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitationContainer);