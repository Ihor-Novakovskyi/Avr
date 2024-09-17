import React, { useState } from 'react';
import useFilter from './useFilters';
import { useSelector } from 'react-redux';
import './FilterCars.css'

export default function FilterCars() {
    const loadStatus = useSelector(state => state.loadStatus);
    const isDisabled = loadStatus === 'error' || loadStatus === 'load';
    const {
        setFilterValue,
        filter,
        setFilter,
        ShowFilterCar,
        isError,
        resetError
    } = useFilter()

    return (
        <form className="cars__filter-search" onSubmit={ ShowFilterCar }>
            <label
                className='cars-filter-search-item'
                onClick={ resetError }
            >
                <span className="cars__search-name-dependecies">
                    Brand
                </span>
                <div className="cars__search-dependencies-wrapper">
                    <input
                        className='cars__search-filter'
                        onChange={ setFilterValue }
                        value={ filter !== null ? filter.brand : '' }
                        name="brand"
                        type="text"
                        placeholder="Search by brand" />
                    {
                        isError.brand
                        &&
                        <span className='cars__search-filter-error'>
                            Field is not valid
                        </span> }
                </div>

            </label>
            <label
                className='cars-filter-search-item'
                onClick={ resetError }
            >
                <span className="cars__search-name-dependecies">
                    Rating
                </span>
                <div className="cars__search-dependencies-wrapper">
                    <input
                        className='cars__search-filter'
                        onChange={ setFilterValue }
                        value={ filter !== null ? filter.rating : '' }
                        name="rating"
                        type="text"
                        placeholder="Search by rating"
                    />
                    {
                        isError.rating
                        &&
                        <span className='cars__search-filter-error'>
                            Field is not valid
                        </span> }
                </div>
            </label>
            <label
                className='cars-filter-search-item'
                onClick={ resetError }
            >
                <span className="cars__search-name-dependecies">
                    Price
                </span>
                <div className="cars__search-dependencies-wrapper">
                    <input
                        className='cars__search-filter'
                        onChange={ setFilterValue }
                        value={ filter !== null ? filter.price : '' }
                        name="price"
                        type="text"
                        placeholder="Search by max price"
                    />
                    {
                        isError.price
                        &&
                        <span className='cars__search-filter-error'>
                            Field is not valid
                        </span> }
                </div>

            </label>
            <button
                disabled={ isDisabled }
                className='car__filter-button'
            >
                Search
            </button>
            <button
                disabled={ isDisabled }
                className='car__filter-button'
                onClick={ () => {
                    setFilter(null)
                    resetError()
                } }>
                Reset filter
            </button>
        </form>
    )
}
