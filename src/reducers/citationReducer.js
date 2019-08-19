import * as actions from '../actions/actionTypes'

const initialState = {
    activePhotoURI: '',
    highlightedText: {
        past: [],
        present: '',
        future: []
    }
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