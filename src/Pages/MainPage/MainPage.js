import React, { useEffect, useState } from "react";
import FilterCars from "../../Components/FilterCars/FilterCars";
import CarsList from "../../Components/CarsList/CarsList";
import './MainPage.css'


export default function MainPage() {
    return (
        <div className="main-page__cars cars">
            <FilterCars/>
            <CarsList/>
        </div>
    )
}


