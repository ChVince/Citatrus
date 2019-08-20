import * as actions from './actionTypes'

export default {
    setPhotoForCitation(uri) {
        return {
            type: actions.SET_PHOTO_FOR_CITATION,
            payload: uri
        }
    }
}