import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterCars } from '../../utils/reducer';
export default function useFilter() {
    const [filter, setFilter] = useState(null);
    const [isError, setError] = useState({ brand: false, rating: false, price: false });
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
    function ShowFilterCar(e) {
        e.preventDefault();
        if (filter) {
            const isError = validateFiltersData(filter);
            if (!isError.brand && !isError.rating && !isError.price) {
                dispatch(filterCars(filter));
                return
            }
            setError(isError);
        } else {
            dispatch(filterCars(null))
        }
    }
    function resetError() { 
        setError({
            brand: false,
            rating: false,
            price: false 
        })
    }
    console.log('isError', isError)
    return {
        setFilterValue,
        filter,
        setFilter,
        ShowFilterCar,
        isError,
        resetError
    }
}
function validateFiltersData(filter) {
    const isError = { brand: false, price: false, rating: false };
    const numberPattern = /\d/;
    if (filter) {
        for (let key in filter) {
            switch (key) {
                case "brand":
                    const brand = filter[key].trim();
                    const isBrendError = filter[key].length !== 0 ? numberPattern.test(brand) : false;
                    isError[key] = isBrendError;
                    break;
                case "price":
                    const price = filter[key].trim();
                    const isPriceError = filter[key].length ? (!Number(price) || Number(price) <= 0) : false;
                    console.log('price')
                    isError[key] = isPriceError;
                    break;
                case "rating":
                    const rating = filter[key].trim();
                    const isErrorRating = rating.length ? (!Number(rating) || Number(rating) <= -1 || Number(rating) > 5) : false;
                    isError[key] = isErrorRating;
                    break;
            }
        }
    }
    console.log('isError in function checker', isError)
    return isError;
}