import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './CarsCard.css';
const object = { 
    brand: "Chrysler",
    id: 167,
    price: 28999.99,
    raiting: 4.56,
    title: "300 Touring",
    thumbnail: "https://cdn.dummyjson.com/products/images/vehicle/Durango%20SXT%20RWD/thumbnail.png"
}
export default function CarsCard(props) { 
    const navigate = useNavigate();
    const {
        brand,
        price,
        rating,
        title,
        image,
        id
    } = props;
    console.log(id)
    return (
        <div
            className="cars__card"
            onClick={() => navigate(`/vehicle/${id}`)}
        >
            <img src={ image } alt="" className="cars__image" />
            <span className="cars__brand">
                {brand}
            </span>
            <span className="cars__model">
                {title}
            </span>
            <span className="cars__raiting">
                {rating}
            </span>
            <span className="cars__price">
                {price}
            </span>
        </div>
    )
}