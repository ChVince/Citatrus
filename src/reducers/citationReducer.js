import * as actions from '../actions/actionTypes'

const initialState = {
    activePhotoURI: null,
    activeLine: null,
    lines: { // past/present - implements 'Undo'
        past: [],
        present: []
    },  // {id: ; start:x1,y1 ; end:x2,y2; width; color},
    lineWidth: 10,
    showActivityIndicator: false,
    lineColor: '#12002559'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PHOTO_FOR_CITATION: {
            state = {
            ...state,
                activePhotoURI: action.payload
            };
            return state;
        }

        case actions.ADD_NEW_NOTE_TO_LIST_START: {
            state = {
                ...state,
                showActivityIndicator: true
            };
            return state;
        }

        case actions.ADD_NEW_NOTE_TO_LIST_END: {
            state = {
                ...state,
                showActivityIndicator: false
            };
            return state;
        }

        case actions.ADD_LINE_CITATION: {
            let nextPastState = state.lines.past.slice();
            let nextPresentLines = state.lines.present.slice();
            nextPastState.push(state.lines.present.slice());
            nextPresentLines.push(action.payload);

            let nextLines = {
                past: nextPastState,
                present: nextPresentLines
            };

            state = {
                ...state,
                lines: nextLines,
                activeLine: action.payload
            };
            return state;
        }

        case actions.UPDATE_LINE_CITATION: {
            let nextPastState = state.lines.past.slice();

            let nextPresentLines = state.lines.present.slice();
            let lineIdx = nextPresentLines.findIndex(line => line.id === action.payload.id);
            nextPresentLines[lineIdx] = action.payload;

            let nextLines = {
                past: nextPastState,
                present: nextPresentLines
            };

            state = {
                ...state,
                lines: nextLines,
                activeLine: action.payload
            };
            return state;
        }
        case actions.RELEASE_LINE_CITATION: {
            let nextPastState = state.lines.past.slice();
            let nextPresentLines = state.lines.present.slice();

            let nextLines = {
                past: nextPastState,
                present: nextPresentLines
            };

            state = {
                ...state,
                lines: nextLines,
                activeLine: null
            };
            return state;
        }
        case actions.UNDO_PHOTO_CITATION: {
            let nextPastState = state.lines.past.slice();
            let nextPresentLines = nextPastState.length > 0 ? nextPastState.pop() : [];

            let nextLines = {
                past: nextPastState,
                present: nextPresentLines
            };

            state = {
                ...state,
                lines: nextLines
            };

            return state;
        }
        case actions.RELEASE_PHOTO_CITATION: {
            return {
                ...state,
                lines: {past: [], present: []},
                activePhotoURI: null
            };
        }
        case actions.SET_CITATION_LINE_WIDTH: {
            return {
                ...state,
                lineWidth: action.payload
            }
        }
        default:
            return state;
    }
}