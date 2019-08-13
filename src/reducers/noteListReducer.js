import * as actions from '../actions/actionTypes'

const initialState = {
    noteList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_NOTE: {
            let nextNoteList = [...state.noteList];
            nextNoteList.push(action.payload);

            return {
                ...state,
                noteList: nextNoteList
            };
        }
        case actions.REMOVE_NOTE: {
            let noteIdx = state.noteList.indexOf(action.payload);

            return {
                ...state,
                noteList: state.noteList.splice(noteIdx, 1)
            };
        }
        case actions.EDIT_NOTE: {
            let noteIdx = state.noteList.indexOf(action.payload.idx);

            return {
                ...state,
                noteList: state.noteList.splice(noteIdx, 1, action.payload.note)
            };
        }
        default:
            return state;
    }
}