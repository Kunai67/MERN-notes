import { combineReducers } from 'redux';
import { notesReducer } from './top-level/note';
import { statusReducer } from './top-level/status';
import { userReducer } from './top-level/user';
import { authReducer } from './top-level/auth';

const allReducer = combineReducers({
    'notes': notesReducer, 
    'status': statusReducer,
    'user': userReducer,
    'auth': authReducer
});

const rootReducer = function(state, action) {
    if (action.type === 'RESET_APP') {
        state = undefined;
    }

    return allReducer(state, action);
}

export default rootReducer;