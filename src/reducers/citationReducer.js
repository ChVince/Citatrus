import * as actions from '../actions/actionTypes'

const initialState = {
    activePhoto: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PHOTO_FOR_CITATION: {
            return {
                ...state,
                activePhoto: action.payload
            };
        }
        case actions.STOP_PHOTO_CITATION: {
            return {
                ...state,
                activePhoto: ''
            };
        }
        default:
            return state;
    }
}