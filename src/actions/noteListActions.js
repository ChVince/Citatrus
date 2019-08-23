import * as actions from './actionTypes'

export default {
    setActiveNote(id) {
        return {
            type: actions.SET_ACTIVE_NOTE,
            payload: id
        }
    },

    releaseActiveNote() {
        return {
            type: actions.RELEASE_ACTIVE_NOTE
        }
    },

    addNote(note) {
        return {
            type: actions.ADD_NEW_NOTE_TO_LIST,
            payload: note
        }
    },

    removeNote(idx) {
        return {
            type: actions.REMOVE_NOTE,
            payload: idx
        }
    },

    removeActiveNote() {
        return {
            type: actions.REMOVE_ACTIVE_NOTE
        }
    },

    updateActiveNote(text) {
        return {
            type: actions.UPDATE_ACTIVE_NOTE,
            payload: text
        }
    }
}