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
            console.log('error with server', error);
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
function fiterByValue(cars, filter) {
    // const { brand, price, rating } = filter;
    const brand = filter.brand;
    const price = Number(filter.price);
    const rating = Number(filter.rating);
    return cars.filter((car) => {
        const isEqualBrand = !!brand ? car.brand.toLowerCase().includes(brand.toLowerCase()) : true;
        const isRatingCarMoreThenFilterRating = !!rating ? Number(car.rating) >= rating : true;
        const isCarPriceLessThenFilterPrice = !!price ? Number(car.price) <= price : true;
        console.log(isEqualBrand,)
        return isEqualBrand && isRatingCarMoreThenFilterRating && isCarPriceLessThenFilterPrice;
    })
}
const slice = createSlice({
    name: 'cars',
    reducers: {
        filterCars: (state, { payload: filter }) => {
            state.filteredCars = filter === null ?
                state.cars
                :
                fiterByValue(state.cars,filter)

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
const { filterCars } = actions
export { reducer, filterCars, getCars }