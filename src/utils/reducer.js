import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const getCars = createAsyncThunk(
    'cars/getCars',
    async () => { 
        try {
            const resp = await fetch("https://dummyjson.com/products/category/vehicle");
            if (resp.ok) {
                const data = await resp.json();
                // console.log(data)
                return data.products;
            }
        } catch (error) { 
            console.log('error with server',error);
            return Promise.reject('error')
        }
      
    }
)
// preloadedState: {
//     loadStatus: 'idle',
//     filtersCars: [],
//     cars:[],
//      filter: '',
// },

const slice = createSlice({
    name: 'cars',
    reducers: {
        filterCars: (state, { payload }) => {
            state.filter = payload;
            state.filteredCars = payload === '' ?
            state.cars
                :
            state.cars.filter((el) => el.element === payload)

        },
    },
    extraReducers: (builder) => { 
        builder
            .addCase(getCars.pending, (state) => {
                state.loadStatus = 'load';
            })
            .addCase(getCars.fulfilled, (state, { payload }) => {
                state.loadStatus = 'idle';
                state.cars = payload;
                state.filteredCars = payload;
            })
            .addCase(getCars.rejected, (state) => {
                state.loadStatus = 'error';
            })
    }
});
const { reducer, actions } = slice;
const {filterCars} = actions
export {reducer, filterCars, getCars}