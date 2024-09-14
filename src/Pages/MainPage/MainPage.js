import React, {useEffect} from "react";
import { useSelector, useStore } from "react-redux";
import { createSelector } from "reselect";
import { getCars } from "../../utils/reducer";
import { useDispatch } from "react-redux";
import CarsCard from "../../Components/CarsCard/CarsCard";
import './MainPage.css'
const selector = createSelector(
    state => state.filter,
    state => state.filteredCars,
    state => state.loadStatus,
    (filter, filteredCars, loadStatus) => { return  {loadStatus,filter, filteredCars}}
)
export default function MainPage() { 
    const cars = useSelector((state) => state.cars);
    const cars1 = useStore().getState().cars;
    console.log('cars1',cars1)
    const {loadStatus,filter, filteredCars} = useSelector(selector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!cars.length) {
            dispatch(getCars());
        } else { 
            // запускаем фильтрацию, туда передам активный фильтр(он либ пустой либо фильтр имеет значение)
            // всеравно будет лишний перередер либо с пустым фильтром либо со значением
        }
    }, [filter]);

    let RenderData = null;
    switch (loadStatus) { 
        case 'load':
            RenderData = 'loading';
            break;
        case 'error':
            RenderData = 'error';
            break;
        case 'idle':
            RenderData = 'my component was loaded without error';
            // [ <CarsCard/>, <CarsCard/>, <CarsCard/>, <CarsCard/>]
            RenderData = filteredCars.map(carInfo => { 
                const {
                    brand,
                    id,
                    price,
                    rating,
                    title,
                    thumbnail: image } = carInfo;
                return <CarsCard
                    key={ id }
                    { ...{brand, price, rating, title, image} }
                />
            })
            break;
    }
    if (loadStatus === 'idle') { 
        console.log('filteredCars', filteredCars)
    }
    return (
        <div className="main-page__cars cars">
            <form className="cars__filter-search" onSubmit={(e) => e.preventDefault()}>
                <label>
                    <span className="cars__search-name-dependecies">
                        Brand
                    </span>
                    <input className="cars__search-dependencies" type="text" placeholder="Search by brand"/>
                </label>
                <label>
                    <span className="cars__search-name-dependecies">
                        Rating
                    </span>
                    <input type="text" placeholder="the max rait is 5"/>
                </label>
                <label>
                    <span className="cars__search-name-dependecies">
                        Price
                    </span>
                    <input type="text" placeholder="write max price"/>
                </label>
                <button>
                    Search
                </button>
            </form>
             <div className="cars__cars-content">
                {RenderData}
            </div>
        </div>
    )
}


