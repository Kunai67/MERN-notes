import { combineReducers } from 'redux';
import { notesReducer } from './top-level/note';
import { statusReducer } from './top-level/status';
import { userReducer } from './top-level/user';
import { authReducer } from './top-level/auth';

const rootReducer = combineReducers({
    'notes': notesReducer, 
    'status': statusReducer,
    'user': userReducer,
    'auth': authReducer
});

export default rootReducer;