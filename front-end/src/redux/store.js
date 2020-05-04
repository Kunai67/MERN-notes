import { createStore } from 'redux';
import { addNote, deleteNote, updateNote, requestNotes, requestUser, receiveNotes, receiveUser } from './actions/creators';
import rootReducer from './reducers/root';
const store = createStore(rootReducer);

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addNote({
    '_id': 'bbb',
    'title': 'Note One',
    'body': 'This is note one body',
    tags: ['Education', 'Programming']
}));

store.dispatch(addNote({
    '_id': 'aaa',
    'title': 'Note Two',
    'body': 'This is note Two body',
    tags: ['Education', 'Programming']
}));

store.dispatch(requestNotes());

store.dispatch(receiveNotes([{
    '_id': 'zzz',
    'title': 'First ever note',
    'body': 'Ever note'
}]));

store.dispatch(updateNote('bbb', {
    'title': 'Note One updated'
}));

unsubscribe();

// let storeSchema = {
//     isFetching: false,
//     user: {},
//     notes: []
// }