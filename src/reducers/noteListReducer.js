import * as actions from '../actions/actionTypes'

const initialState = {
    activeNoteIdx: null,
    list: [] // { date: text: 'full' }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.PERSIST_REHYDRATE_ACTION_TYPE: {
            return {
                ...state,
                list: action.payload.noteList.list,
                activeNoteIdx: null
            }
        }
        case actions.SET_ACTIVE_NOTE: {
            let activeNoteIdx = state.list.findIndex(note => note.id === action.payload);
            return {
                ...state,
                activeNoteIdx: activeNoteIdx
            }
        }
        case actions.RELEASE_ACTIVE_NOTE: {
            return {
                ...state,
                activeNoteIdx: null
            }
        }
        case actions.ADD_NEW_NOTE_TO_LIST: {
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
        case actions.REMOVE_ACTIVE_NOTE: {
            let nextList = state.list.slice();
            let activeNoteIdx = state.activeNoteIdx;
            nextList.splice(activeNoteIdx, 1);

            let nextActiveNoteIdx = null;
            if (activeNoteIdx < nextList.length) {
                nextActiveNoteIdx = activeNoteIdx;
            }

            return {
                ...state,
                list: nextList,
                activeNoteIdx: nextActiveNoteIdx
            }

        }

        case actions.UPDATE_ACTIVE_NOTE: {
            let nextList = state.list.slice();
            nextList[state.activeNoteIdx].text = action.payload;

            return {
                ...state,
                list: nextList
            };
        }
        default:
            return state;
    }
}