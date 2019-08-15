import {stopPhotoCitation} from '../actions/citationActions'
import { connect } from 'react-redux'
import React, {Component} from 'react'
import Citation from '../components/Citation/index'
import citation from "../reducers/citationReducer";

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
        title: 'Citation'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Citation {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitationContainer);