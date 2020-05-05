import { combineReducers } from 'redux';
import { notesReducer } from './top-level/note';
import { statusReducer } from './top-level/status';
import { authReducer } from './top-level/auth';

const rootReducer = combineReducers({
    'notes': notesReducer, 
    'status': statusReducer,
    'auth': authReducer
});

export default rootReducer;