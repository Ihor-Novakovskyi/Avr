import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCars } from '../../utils/reducer';
import { createSelector } from 'reselect';
import CarsCard from "../../Components/CarsCard/CarsCard";
import './CarsList.css';
const selector = createSelector(
    state => state.filteredCars,
    state => state.loadStatus,
    state => state.cars,
    (filteredCars, loadStatus, cars) => { return { loadStatus, filteredCars, cars } }
)
export default function CarsList() {
    const { loadStatus, filteredCars, cars } = useSelector(selector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cars.length) {
            dispatch(filterCars(null));
        }
    }, []);
    let RenderData = null;
    switch (loadStatus) {
        case 'load':
            RenderData = 'loading';
            break;
        case 'error':
            RenderData = 'error';
            break;
        case 'idle':
            RenderData = <RenderCars cars={ filteredCars } />
            break;
    }
    return RenderData;
}
function RenderCars({ cars }) {
    console.log('cars', cars)
    const carsList = cars.map(carInfo => {
        const {
            brand,
            id,
            price,
            rating,
            title,
            thumbnail: image } = carInfo;
        return <CarsCard
            key={ id }
            { ...{ brand, price, rating, title, image, id } }
        />
    })
    return (
        <div className="cars__cars-content">
            { carsList }
        </div>
    )
}