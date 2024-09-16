import { configureStore, combineReducers, } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
console.log('thunk',thunk)
const store = configureStore({
    reducer,
    middleware: [thunk],
    preloadedState: {
            loadStatus: 'idle',
            filteredCars: [],
            cars:[],
    },
})


export default store;