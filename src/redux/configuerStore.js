import { createStore } from 'redux';  
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
            Reducer, //reducer
            initialState ,//our initial state from reducer
    );
    return store;
} 

