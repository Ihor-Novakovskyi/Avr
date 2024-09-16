import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
                <div className="car-slider slider">
                    <div className="slider-slides">
                        <div className="image-wrapper">
                            <img src={ images[0] } alt="" className="slider__image" />
                        </div>
                        <div className="image-wrapper">
                            <img src={ images[1] } alt="" className="slider__image" />
                        </div>
                        <div className="image-wrapper">
                            <img src={ images[2] } alt="" className="slider__image" />
                        </div>
                        <div className="image-wrapper">
                            <img src={ images[3] } alt="" className="slider__image" />
                        </div>

                        {/*                     
                    <img src={ images[1] } alt="" className="slider__image" />
                    <img src={ images[2] } alt="" className="slider__image" />
                    <img src={ images[3] } alt="" className="slider__image" /> */}
                    </div>
                </div>
                <div className="car__info">
                    <h2 className="car__model-name">
                        { car.title }
                    </h2>
                    <h4 className="car__slogan">
                        { car.description }
                    </h4>
                    <div className="car__info-list-wrapper">
                        <h4 className="info-list__header">
                            Overview
                        </h4>
                        <div className="car__info-list">

                            <div className="car__info-list-items1">
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Brand
                                    </span>
                                    <span className="car__info-item">
                                        { car.brand }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Model
                                    </span>
                                    <span className="car__info-item">
                                        { car.title }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Width
                                    </span>
                                    <span className="car__info-item">
                                        { car.dimensions.width }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Height
                                    </span>
                                    <span className="car__info-item">
                                        { car.dimensions.height }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Weight
                                    </span>
                                    <span className="car__info-item">
                                        { car.weight }
                                    </span>
                                </div>
                            </div>
                            <div className="car__info-list-items2">
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Warranty
                                    </span>
                                    <span className="car__info-item">
                                        { car.warrantyInformation }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Rating
                                    </span>
                                    <span className="car__info-item">
                                        { car.rating }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Return policy
                                    </span>
                                    <span className="car__info-item">
                                        { car.returnPolicy }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Discount
                                    </span>
                                    <span className="car__info-item">
                                        { car.discountPercentage }
                                    </span>
                                </div>
                                <div className="car__info-list-item">
                                    <span className="car__info-item">
                                        Price
                                    </span>
                                    <span className="car__info-item">
                                        { car.price }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="car__price-container">
                        <span className="car__price">
                            Price
                        </span>
                        <span className="car__price">
                            { car.price }
                        </span>

                    </div>
                </div>

            </>
        )
    }
    const comments = !!car ? (
        <div className="car__comments-block">
            <div className="car__comments">
                <span className="car__reviews">
                    Reviews
                </span>
                { car.reviews.map((el) => {
                    const { reviewerName, reviewerEmail, date, comment } = el;
                    return (
                        <div className="car__reviews-item">
                            <div className="car__reviewer-own-info">
                                <span className="car__reviewer-data">
                                    { reviewerName }
                                </span>
                                <span className="car__reviewer-data">
                                    { date.split('.')[0].split('T').reverse().join(' ') }
                                </span>
                                <span className="car__reviewer-data">
                                    { reviewerEmail }
                                </span>
                            </div>
                            <span className="car__reviewer-comment">
                                { comment }
                            </span>
                        </div>
                    )
                }) }
            </div>
            <div className="car__enter-comments-block">
                <div className="comments-label-container">
                    <label className="car__enter-reviewer-label">
                        <span className="car__enter-reviewer-type-info">
                            Name
                        </span>
                        <input type="text" className="car__enter-reviewer-info" />
                    </label>

                    <label className="car__enter-reviewer-label">
                        <span className="car__enter-reviewer-type-info">
                            Email
                        </span>
                        <input type="text" className="car__enter-reviewer-info" />
                    </label>
                </div>

                <textarea
                    className="car__enter-reviewers-comment"
                    onChange={ (e) => console.log('text enter') }
                    name="" id=""></textarea>
            </div>
        </div>

    ) :
        null;
    return (
        <div className="main-page-car car">
            <div className="car__main-content">
                {/* { vehicleId } */ }
                { RenderData }

            </div>
            { comments }

        </div>
    )
}