import { REQUEST_NOTES, REQUEST_USER, RECEIVE_NOTES, RECEIVE_USER } from '../../actions/types';

export function statusReducer(state = { isFetching: false }, action) {
    switch (action.type) {
        case REQUEST_NOTES:
        case REQUEST_USER:
        case RECEIVE_NOTES:
        case RECEIVE_USER:
            return Object.assign({}, state, { isFetching: action.isFetching });
        default:
            return state;
    }
}