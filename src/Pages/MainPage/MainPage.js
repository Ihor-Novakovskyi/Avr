import React, {useEffect, useState} from "react";
import { useSelector, useStore } from "react-redux";
import { createSelector } from "reselect";
import { getCars, filterCars } from "../../utils/reducer";
import { useDispatch } from "react-redux";
import CarsCard from "../../Components/CarsCard/CarsCard";
import './MainPage.css'
const selector = createSelector(
    state => state.filteredCars,
    state => state.loadStatus,
    (filteredCars, loadStatus) => { return  {loadStatus, filteredCars}}
)
export default function MainPage() { 
    const [filter, setFilter] = useState(null);
    const cars = useSelector((state) => state.cars);
    const cars1 = useStore().getState().cars;
    console.log('cars1',cars1)
    const {loadStatus, filteredCars} = useSelector(selector);
    const dispatch = useDispatch();
    function setFilterValue(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFilter((prevFilter) => { 
            return {
                ...prevFilter,
                [name]: value,
            }
        })
    }
    console.log(filter)
    // useEffect(() => {
    //     if (!cars.length) {
    //         dispatch(getCars());
    //     } else { 
    //         // запускаем фильтрацию, туда передам активный фильтр(он либ пустой либо фильтр имеет значение)
    //         // всеравно будет лишний перередер либо с пустым фильтром либо со значением
    //         dispatch(filterCars(null));
    //     }
    // }, []);
    useEffect(() => {
        if (cars.length) { 
            dispatch(filterCars(null));
        }
    }, []);
    console.log('loadStatus', loadStatus)
    let RenderData = null;
    switch (loadStatus) { 
        case 'load':
            RenderData = 'loading';
            break;
        case 'error':
            RenderData = 'error';
            break;
        case 'idle':
            console.log('loadStatus - idle')
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
                    { ...{brand, price, rating, title, image, id} }
                />
            })
            break;
    }
 
    return (
        <div className="main-page__cars cars">
            <form className="cars__filter-search" onSubmit={ (e) => { 
                e.preventDefault();
                if (filter) {
                    dispatch(filterCars(filter))
                } else { 
                    dispatch(filterCars(null))
                }
            } }>
                <label>
                    <span className="cars__search-name-dependecies">
                        Brand
                    </span>
                    <input
                        onChange={ setFilterValue }
                        value={filter !== null ? filter.brand: ''}
                        name="brand"
                        className="cars__search-dependencies"
                        type="text"
                        placeholder="Search by brand" />
                </label>
                <label>
                    <span className="cars__search-name-dependecies">
                        Rating
                    </span>
                    <input
                        onChange={setFilterValue}
                        value={filter !== null ? filter.rating : ''}
                        name="rating"
                        type="text"
                        placeholder="the max rait is 5"
                    />
                </label>
                <label>
                    <span className="cars__search-name-dependecies">
                        Price
                    </span>
                    <input
                        onChange={ setFilterValue }
                        value={filter !== null ? filter.price: ''}
                        name="price"
                        type="text"
                        placeholder="write max price"
                    />
                </label>
                <button>
                    Search
                </button>
                <button onClick={ () => { 
                    setFilter(null)
                    console.log('click')
                } }>
                    Reset filter
                </button>
            </form>
             <div className="cars__cars-content">
                {RenderData}
            </div>
        </div>
    )
}


function createFilter(e) { 
    const name = e.target.name;
    setFilter((prevFilter) => { 

    })
}
function validateData(filter) { 
    return {
        brand: filter.brand
    }
}