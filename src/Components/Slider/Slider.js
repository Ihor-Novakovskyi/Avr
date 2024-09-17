import './Slider.css';
import nextSlideArrow from './next.png';
export default function Slider({ images }) {

    return (
        <div className="car-slider slider">
            <div className="slider-slides">
                { images.map((img) => {
                    return (
                        <div className="image-wrapper">
                            <img src={ img } alt="" className="slider__image" />
                        </div>
                    )
                }) }
            </div>
            <div className="slider__action-container">
                <div className='slider__prev-slider'>
                    <img src={nextSlideArrow} alt="arrow prev" />
                </div>
                <div className='slider__next-slider'>
                    <img src={nextSlideArrow} alt="arrow prev" />
                </div>
            </div>

        </div>
    )
}