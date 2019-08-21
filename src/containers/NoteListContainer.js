import noteListActions from '../actions/noteListActions'
import { connect } from 'react-redux'

import React, {Component} from 'react'
import NoteList from "../components/NoteList";

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state) => {
    return {
        noteList: state.noteList.list
    }
};

class NoteListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <NoteList/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);