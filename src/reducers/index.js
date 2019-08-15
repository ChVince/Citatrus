import {combineReducers} from 'redux'
import noteList from './noteListReducer'
import camera from './cameraReducer'
import citation from './citationReducer'

const reducers = combineReducers({
    noteList,
    camera,
    citation
});

export default reducers