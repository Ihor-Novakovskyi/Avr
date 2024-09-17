import React, {useState} from 'react';
import './Slider.css';
import nextSlideArrow from './next.png';
export default function Slider({ images }) {
    const [indexSlide, setIndexSlider] = useState(0); 
    const slides = 6;
    const offsetToMove = (100 / 6).toFixed(2);
    function onNextSlide (){
        let indexCurrent = indexSlide + 1;
        if(indexCurrent === slides) {
            setIndexSlider(0)
            return;
        }
        setIndexSlider(indexCurrent)
    }

    function onPrevSlide() {
        let indexCurrent = indexSlide - 1;

        if(indexCurrent < 0) {
            setIndexSlider(slides - 1)
            return;
        }
        setIndexSlider(indexCurrent)
    
    }
    return (
        <div className="car-slider slider">
            <div
                style={ {
                    'transform': `translateX(-${offsetToMove * indexSlide}%)`
                } }
                className="slider-slides">
                { images.map((img) => {
                    return (
                        <div className="image-wrapper">
                            <img src={ img } alt="" className="slider__image" />
                        </div>
                    )
                }) }
            </div>
            <div className="slider__action-container">
                <div
                    onClick={onPrevSlide}
                    className='slider__prev-slider'>
                    <img src={nextSlideArrow} alt="arrow prev" />
                </div>
                <div
                    onClick={onNextSlide}    
                    className='slider__next-slider'
                >
                    <img src={nextSlideArrow} alt="arrow prev" />
                </div>
            </div>

        </div>
    )
}