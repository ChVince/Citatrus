import * as actions from "./actionTypes";

export default {

    addCitationLine(line) {
        return {
            type: actions.ADD_LINE_CITATION,
            payload: line
        }
    },

    updateCitationLine(line) {
        return {
            type: actions.UPDATE_LINE_CITATION,
            payload: line
        }
    },


    addNoteStart() {
        return {
            type: actions.ADD_NEW_NOTE_TO_LIST_START
        }
    },


    addNoteEnd() {
        return {
            type: actions.ADD_NEW_NOTE_TO_LIST_END
        }
    },

    setCitationLineWidth(value) {
        return {
            type: actions.SET_CITATION_LINE_WIDTH,
            payload: value
        }
    },

    releaseCitationLine() {
        return {
            type: actions.RELEASE_LINE_CITATION
        }
    },

    releasePhotoCitation() {
        return {
            type: actions.RELEASE_PHOTO_CITATION
        }
    },

    undoPhotoCitation() {
        return {
            type: actions.UNDO_PHOTO_CITATION
        }
    }
}