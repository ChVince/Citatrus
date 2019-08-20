import * as actions from "./actionTypes";

export default {
    stopPhotoCitation() {
        return {
            type: actions.STOP_PHOTO_CITATION
        }
    },

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

    releaseCitationLine() {
        return {
            type: actions.RELEASE_LINE_CITATION
        }
    }
}