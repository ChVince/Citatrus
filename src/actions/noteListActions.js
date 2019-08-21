import * as actions from './actionTypes'

export default {
    addNote(note) {
        return {
            type: actions.ADD_NOTE,
            payload: note
        }
    },

    removeNote(idx) {
        return {
            type: actions.REMOVE_NOTE,
            payload: idx
        }
    },

    editNote(note) {
        return {
            type: actions.EDIT_NOTE,
            payload: note
        }
    }
}