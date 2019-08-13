import * as actions from './actionTypes'

export function addNote(note) {
    return {
        type: actions.ADD_NOTE,
        payload: note
    }
}

export function removeNote(idx) {
    return {
        type: actions.REMOVE_NOTE,
        payload: idx
    }
}

export function editNote(note) {
    return {
        type: actions.EDIT_NOTE,
        payload: note
    }
}