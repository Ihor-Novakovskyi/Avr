import './Slider.css';
export default function Slider({ images}) {
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
                {/*                     
                    <img src={ images[1] } alt="" className="slider__image" />
                    <img src={ images[2] } alt="" className="slider__image" />
                    <img src={ images[3] } alt="" className="slider__image" /> */}
            </div>
        </div>
    )
}