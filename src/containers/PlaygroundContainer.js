import citationActions from '../actions/citationActions'
import cameraActions from "../actions/cameraActions";

import { connect } from 'react-redux'

import React, {Component, Fragment} from 'react'
import Citation from '../components/Citation'
import Camera from '../components/Camera'
import CameraRoll from "@react-native-community/cameraroll/js/CameraRoll";

const mapDispatchToProps = (dispatch) => {
    return {
        onPhotoRelease: () => {
            dispatch(citationActions.releasePhotoCitation());
        },

        onCitationUndo: () => {
            dispatch(citationActions.undoPhotoCitation());
        },

        onCitationStart: (line) => {
            dispatch(citationActions.addCitationLine(line));
        },

        onCitationRelease: () => {
            dispatch(citationActions.releaseCitationLine());
        },

        onCitationUpdate: (line) => {
            dispatch(citationActions.updateCitationLine(line));
        },

        setCitationLineWidth: (value) => {
            dispatch(citationActions.setCitationLineWidth(value));
        },

        onSnapClick: async (camera) => {
            if (camera) {
                let data = await camera.takePictureAsync();
                await CameraRoll.saveToCameraRoll(data.uri);
                dispatch(cameraActions.setPhotoForCitation(data.uri));
            }
        }
    }
};

const mapStateToProps = (state) => {
    return {
        uri: state.citation.activePhotoURI,
        lines: state.citation.lines.present,
        activeLine: state.citation.activeLine,
        lineWidth: state.citation.lineWidth,
        lineColor: state.citation.lineColor
    }
};

class CitationContainer extends Component {
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