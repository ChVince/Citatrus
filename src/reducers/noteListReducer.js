import * as actions from '../actions/actionTypes'

const initialState = {
    activeNoteIdx: null,
    list: [
        {
            id: 1,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'one'
        },
        {
            id: 2,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'Two'
        },
        {
            id: 3,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '3'
        },
        {
            id: 4,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '4'
        },
        {
            id: 5,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '5'
        },
        {
            id: 6,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '6'
        },
        {
            id: 7,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '7'
        },
        {
            id: 8,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: '8'
        }
    ] // { date: time: header: text: 'full' }
};

export default function(state = initialState, action) {
    switch (action.type) {
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