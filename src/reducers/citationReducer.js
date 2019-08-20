import * as actions from '../actions/actionTypes'

const initialState = {
    activePhotoURI: 'http://www.rore-sanctifica.org/bibilotheque_rore_sanctifica/10-eglises_et_rites_orientaux_et_sources/testamentum_domini/1973-voobus-testamentum_domini/testamentum_traduit_(anglais)/English-38.jpg',
    lines: [], // {id: ; start:x1,y1 ; end:x2,y2},
    activeLine: null,
    lineWidth: '10',
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
        case actions.ADD_LINE_CITATION: {
            let nextLines = state.lines.slice();
            nextLines.push(action.payload);

            state = {
                ...state,
                lines: nextLines,
                activeLine: action.payload
            };
            return state;
        }
        case actions.UPDATE_LINE_CITATION: {
            let nextLines = state.lines.slice();
            let lineIdx = nextLines.findIndex(line => line.id === action.payload.id);
            nextLines[lineIdx] = action.payload;

            state = {
                ...state,
                lines: nextLines,
                activeLine: action.payload
            };
            return state;
        }
        case actions.RELEASE_LINE_CITATION: {
            state = {
                ...state,
                activeLine: null
            };
            return state;
        }
        case actions.STOP_PHOTO_CITATION: {
            return {
                ...state,
                activePhotoURI: ''
            };
        }
        default:
            return state;
    }
}