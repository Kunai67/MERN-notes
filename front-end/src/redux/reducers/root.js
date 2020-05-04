import { combineReducers } from 'redux';
import { notesReducer } from './top-level/note';
import { statusReducer } from './top-level/status';

const rootReducer = combineReducers({
    'notes': notesReducer, 
    'status': statusReducer
});

export default rootReducer;