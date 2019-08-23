import noteListActions from '../actions/noteListActions'
import { connect } from 'react-redux'

import React, {Component} from 'react'
import NoteList from "../components/NoteList";
import Note from "../components/Note";

const mapDispatchToProps = (dispatch) => {
    return {
        openNote: (id) => {
            dispatch(noteListActions.setActiveNote(id));
        },

        releaseNote: () => {
            dispatch(noteListActions.releaseActiveNote());
        },

        updateActiveNote: (text) => {
            dispatch(noteListActions.updateActiveNote(text))
        },

        removeActiveNote: () => {
            dispatch(noteListActions.removeActiveNote())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        noteList: state.noteList.list,
        activeNoteIdx: state.noteList.activeNoteIdx
    }
};

class NoteListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.activeNoteIdx !== null ?
                <Note {...this.props}/> :
                <NoteList {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);