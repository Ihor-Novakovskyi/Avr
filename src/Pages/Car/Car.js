import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "../../Components/Slider/Slider";
import DetailInfo from "../../Components/DetailInfoCar/DetailInfo";
import CommentsBlock from "../../Components/CommentsBlock/CommentsBlock";
import './Car.css';
export default function Car() {
    const vehicleId = Number(useParams().vehicleId);
    console.log(useParams())
    const car = useSelector((state) => state.cars.find((car) => {
        console.log(car)
        console.log(car.id, vehicleId)
        console.log(car.id === vehicleId)
        return car.id === vehicleId
    }));
    const loadStatus = useSelector(state => state.loadStatus);
    console.log(car)
    let RenderData = null;
    if (loadStatus === 'load') {
        RenderData = 'loading'
    } else if (loadStatus === 'idle' && car) {
        const { images } = car;
        RenderData = (
            <>
                <div className="car__main-content">
                    <Slider images={ images } />
                    <DetailInfo car={ car } />
                </div>
                <CommentsBlock car={ car } />
            </>

        )
    }
    return (
        <div className="main-page-car car">
            { RenderData }
        </div>
    )
}