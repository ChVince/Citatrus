import * as actions from '../actions/actionTypes'

const initialState = {
    activeNoteId: null,
    list: [
        {
            id: 1,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla blas wwwwwwwwwwwwwwwwwwwwbla bla bla bla'
        },
        {
            id: 2,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'heślo world bla blawwww bla bla bla bla'
        },
        {
            id: 3,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        },
        {
            id: 4,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        },
        {
            id: 5,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        },
        {
            id: 6,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        },
        {
            id: 7,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        },
        {
            id: 8,
            date: '13.05.2018',
            time: '14:50',
            title: 'My First Note!',
            text: 'helo world bla bla bla bla bla bla'
        }
    ] // { date: time: header: text: 'full' }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.SET_ACTIVE_NOTE: {
            return {
                ...state,
                activeNoteId: action.payload
            }
        }
        case actions.RELEASE_ACTIVE_NOTE: {
            return {
                ...state,
                activeNoteId: null
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
            let activeNoteIdx = nextList.findIndex(note => note.id === state.activeNoteId);
            nextList.splice(activeNoteIdx, 1);

            let nextActiveNoteId = null;
            if (activeNoteIdx < nextList.length) {
                nextActiveNoteId = nextList[activeNoteIdx].id;
            }

            return {
                ...state,
                list: nextList,
                activeNoteId: nextActiveNoteId
            }

        }

        case actions.UPDATE_NOTE: {
            let nextList = state.list.slice();
            let activeNoteIdx = nextList.findIndex(note => note.id === state.activeNoteId);
            nextList[activeNoteIdx].text = action.payload;

            return {
                ...state,
                list: nextList
            };
        }
        default:
            return state;
    }
}