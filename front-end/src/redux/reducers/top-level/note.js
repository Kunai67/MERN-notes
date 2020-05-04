import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE, RECEIVE_NOTES } from '../../actions/types';

export function notesReducer(state = [], action) {
    switch (action.type) {
        case ADD_NOTE:
            return [...state, action.note]
        case DELETE_NOTE:
            return state.filter(val => val._id !== action.note_id);
        case UPDATE_NOTE:
            return state.map((val) => {
                if (val._id === action.note_id) return Object.assign({}, val, action.updateObj);
                return val;
            });
        case RECEIVE_NOTES:
            return [...action.notes, ...state];
        default:
            return state;
    }
}