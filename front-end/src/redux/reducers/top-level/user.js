import { RECEIVE_USER } from '../../actions/types';

export function statusReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}