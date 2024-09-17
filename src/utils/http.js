export default async function getData ()  {
    try {
        const resp = await fetch("https://dummyjson.com/products/category/vehicle");
        if (resp.ok) {
            const data = await resp.json();
            console.log(data.products)
            return addReviewsToCarsFromStorage('comment', data.products)
        }
    } catch (error) {
        console.log('error with server', error);
        return Promise.reject('error')
    }

}

function addReviewsToCarsFromStorage(key, data) { 
    const reviewsFromStorage = localStorage.getItem(key);
    const reviewsFromStorageParsed = reviewsFromStorage ? JSON.parse(reviewsFromStorage) : null;
    let carWithReviewsComments = data;
    if (reviewsFromStorageParsed) { 
         carWithReviewsComments = data.map((car) => { 
            const reviewsData = reviewsFromStorageParsed[car.id];
             if (reviewsData) { 
                car.reviews.length ? car.reviews.push(...reviewsData) : car.reviews = reviewsData;
            }
            return car;
        })
        
    }
    return carWithReviewsComments
}