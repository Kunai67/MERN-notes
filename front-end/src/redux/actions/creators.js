import { 
    ADD_NOTE, DELETE_NOTE, UPDATE_NOTE,
    RECEIVE_USER, REQUEST_USER, RECEIVE_NOTES, REQUEST_NOTES 
} from '../actions/types';

// NOTES ACTION CREATORS
export function addNote(note) {
    return {
        type: ADD_NOTE,
        note
    }
}

export function deleteNote(note_id) {
    return {
        type: DELETE_NOTE,
        note_id
    }
}

export function updateNote(note_id, updateObj) {
    return {
        type: UPDATE_NOTE,
        note_id,
        updateObj
    }
}

export function requestNotes(user_id) {
    return {
        type: REQUEST_NOTES,
        user_id,
        isFetching: true
    }
}

export function requestUser(user_id) {
    return {
        type: REQUEST_USER,
        user_id,
        isFetching: true
    }
}

export function receiveNotes(notes) {
    return {
        type: RECEIVE_NOTES,
        notes,
        isFetching: false
    }
}

export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        user,
        isFetching: false
    }
}