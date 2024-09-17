import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getData from "./http";
const getCars = createAsyncThunk(
    'cars/getCars',
    async () => getData()
)

const slice = createSlice({
    name: 'cars',
    reducers: {
        filterCars: (state, { payload: filter }) => {
            state.filteredCars = filter === null ?
                state.cars
                :
                fiterByValue(state.cars,filter)

        },
        addCommentsInCarProps: (state, {payload}) => { 
            setCommentsInCarProperties(state, payload)
        }
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

function fiterByValue(cars, filter) {
    const brand = filter.brand;
    const price = Number(filter.price);
    const rating = Number(filter.rating);
    return cars.filter((car) => {
        const isEqualBrand = !!brand ? car.brand.toLowerCase().includes(brand.toLowerCase()) : true;
        const isRatingCarMoreThenFilterRating = !!rating ? Number(car.rating) >= rating : true;
        const isCarPriceLessThenFilterPrice = !!price ? Number(car.price) <= price : true;
        return isEqualBrand && isRatingCarMoreThenFilterRating && isCarPriceLessThenFilterPrice;
    })
}


function setCommentsInCarProperties(state,{id, comment}) { 
    const car = state.cars.find((car) => car.id === id)
    car.reviews.length ? car.reviews.push(comment) : car.reviews = [comment];
}

const { reducer, actions } = slice;
const { filterCars, addCommentsInCarProps } = actions
export { reducer, filterCars, getCars, addCommentsInCarProps }