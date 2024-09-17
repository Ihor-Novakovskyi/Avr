import React, {useState} from 'react';
import { addCommentsInCarProps } from '../../utils/reducer';
import { useDispatch } from 'react-redux';
export default function useComments(car) { 
    const [reviewerInfo, setReviewerInfo] = useState({ reviewerName: '', reviewerEmail: '', comment: '', rating: '' });
    const [isError, setError] = useState({ reviewerName: false, reviewerEmail: false, comment: false, rating: false })
    
    const dispatch = useDispatch();
    const { id } = car;

    function setComment(e) {
        const { target: { value, name } } = e;
        setReviewerInfo(currentInfo => ({ ...currentInfo, [name]: value }))
    }
    function resetError() {
        setError({ reviewerName: false, reviewerEmail: false, comment: false, rating: false });
    }
    function addComment(e) {
        e.preventDefault();
        const isErrors = checkData(reviewerInfo);
        if (!isErrors.reviewerName && !isErrors.reviewerEmail && !isErrors.comment && !isErrors.rating) {
             const commentToSave = {
                ...reviewerInfo,
                date: new Date().toISOString(),
            };
            setDataToLocalStorage('comment', id, commentToSave)
            dispatch(addCommentsInCarProps({id,comment:commentToSave}))
        } else {
            setError(isErrors)
        }
    }
    return {
        isError,
        reviewerInfo,
        setComment,
        resetError,
        addComment
    }
}


function setDataToLocalStorage(key, id, data) {
    const comments = !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : { [id]: [] };
    `${id}` in comments ? comments[id].push(data) : (comments[id] = [], comments[id].push(data));
    localStorage.setItem(key, JSON.stringify(comments))
}
function checkData(data) { 
    const error = { reviewerName: false, reviewerEmail: false, comment: false, rating: false };
    for (let key in data) { 
        switch (key) { 
            case "reviewerName":
                const name = data[key].trim();
                const isErrorName = !(name.length > 2);
                error[key] = isErrorName;
                break;
            case "reviewerEmail":
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const email = data[key].trim();
                const isErrorEmail = !emailPattern.test(email);
                error[key] = isErrorEmail;
                break;
            case "comment":
                const comment = data[key].trim();
                const isErrorComment = !(comment.length > 0)
                error[key] = isErrorComment;
                break;
            case "rating":
                const rating = data[key];
                const isErrorRating = !rating.length || !Number(rating) || Number(rating) <= -1 || Number(rating) > 5;
                error[key] = isErrorRating;
                break;
        }
    }
    return error;
}