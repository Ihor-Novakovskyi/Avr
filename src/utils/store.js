import { configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
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