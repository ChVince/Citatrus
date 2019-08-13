import {combineReducers} from 'redux'
import noteListReducer from './noteListReducer'
import cameraReducer from './cameraReducer'
import citationReducer from './citationReducer'

const reducers = combineReducers({
    noteListReducer,
    cameraReducer,
    citationReducer
});

export default reducers