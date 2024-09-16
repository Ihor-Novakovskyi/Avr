import './DetailInfo.css';
export default function DetailInfo({ car }) {
    const {
        title,
        description,
        brand,
        dimensions: {
            width,
            height
        },
        weight,
        warrantyInformation,
        rating,
        returnPolicy,
        discountPercentage,
        price
        
    } = car;
    return (
        <div className="car__info">
            <h2 className="car__model-name">
                { title }
            </h2>
            <h4 className="car__slogan">
                { description }
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
                                { brand }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Model
                            </span>
                            <span className="car__info-item">
                                { title }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Width
                            </span>
                            <span className="car__info-item">
                                {width }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Height
                            </span>
                            <span className="car__info-item">
                                { height }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Weight
                            </span>
                            <span className="car__info-item">
                                { weight }
                            </span>
                        </div>
                    </div>
                    <div className="car__info-list-items2">
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Warranty
                            </span>
                            <span className="car__info-item">
                                { warrantyInformation }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Rating
                            </span>
                            <span className="car__info-item">
                                { rating }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Return policy
                            </span>
                            <span className="car__info-item">
                                { returnPolicy }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Discount
                            </span>
                            <span className="car__info-item">
                                { discountPercentage }
                            </span>
                        </div>
                        <div className="car__info-list-item">
                            <span className="car__info-item">
                                Price
                            </span>
                            <span className="car__info-item">
                                { price }
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
                    { price }
                </span>
            </div>
        </div>
    )
}