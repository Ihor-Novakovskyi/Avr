import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { createSelector } from "reselect";
import { filterCars } from "../../utils/reducer";
import { useDispatch } from "react-redux";
import CarsCard from "../../Components/CarsCard/CarsCard";
import FilterCars from "../../Components/FilterCars/FilterCars";
import './MainPage.css'
import { isFluxStandardAction } from "@reduxjs/toolkit";
const selector = createSelector(
    state => state.filteredCars,
    state => state.loadStatus,
    state => state.cars,
    (filteredCars, loadStatus, cars) => { return { loadStatus, filteredCars, cars } }
)
export default function MainPage() {
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


    return (
        <div className="main-page__cars cars">
            <FilterCars disabled={ loadStatus === 'error' || loadStatus === 'load' } />
            { RenderData }
        </div>
    )
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