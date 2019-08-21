import * as actions from '../actions/actionTypes'

const initialState = {
    list: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_NOTE: {
            let nextNoteList = [...state.list];
            nextNoteList.push(action.payload);

            return {
                ...state,
                list: nextNoteList
            };
        }
        case actions.REMOVE_NOTE: {
            let noteIdx = state.list.indexOf(action.payload);

            return {
                ...state,
                list: state.list.splice(noteIdx, 1)
            };
        }
        case actions.EDIT_NOTE: {
            let noteIdx = state.list.indexOf(action.payload.idx);

            return {
                ...state,
                list: state.list.splice(noteIdx, 1, action.payload.note)
            };
        }
        default:
            return state;
    }
}