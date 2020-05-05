import { AUTHENTICATE } from '../../actions/types';

export function authReducer(state = false, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return action.isAuthenticated;
        default:
            return state;
    }
}