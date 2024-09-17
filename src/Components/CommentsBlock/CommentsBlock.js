import './CommentsBlock.css';
import React, { useState } from 'react';
import { addCommentsInCarProps } from '../../utils/reducer';
import { useDispatch } from 'react-redux';
export default function CommentsBlock({ car }) {
    const [reviewerInfo, setReviewerInfo] = useState({ reviewerName: '', reviewerEmail: '', comment: '', rating: '' });
    const [isError, setError] = useState({ reviewerName: false, reviewerEmail: false, comment: false, rating: false })
    const { reviewerName, reviewerEmail, comment, rating } = reviewerInfo;
    const dispatch = useDispatch();
    const { reviews, id } = car;

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
            const commentSaveToStorage = {
                ...reviewerInfo,
                date: new Date().toISOString(),
            };
            const commentsTOSaveToCarInState = setDataToLocalStorage('comment', id, commentSaveToStorage)
            dispatch(addCommentsInCarProps(commentsTOSaveToCarInState))
        } else {
            setError(isErrors)
        }
    }
    console.log(reviewerInfo)
    console.log('isError', isError)
    console.log('isError comment', isError.comment)
    return (
        <form
            onSubmit={ addComment }
            className="car__comments-block">
            <div className="car__comments">
                <span className="car__reviews">
                    Reviews
                </span>
                { reviews.map((userComment, id) => {
                    return <Comments userComment={ userComment } key={ id } />
                }) }
            </div>
            <div className="car__enter-comments-block">
                <div className="comments-label-container">
                    <label
                        onClick={ resetError }
                        className="car__enter-reviewer-label"
                    >
                        <span className="car__enter-reviewer-type-info">
                            Name
                        </span>
                        <div className="car__enter-reviewer-info-wrapper">
                            <input
                                onChange={ setComment }
                                value={ reviewerName }
                                name="reviewerName"
                                type="text"
                                className="car__enter-reviewer-info"
                            />
                            {
                                isError.reviewerName
                                &&
                                <span className="car__error-info-field"
                                >
                                    Field is empty
                                </span>
                            }
                        </div>

                    </label>

                    <label
                        onClick={ resetError }
                        className="car__enter-reviewer-label"
                    >
                        <span className="car__enter-reviewer-type-info">
                            Email
                        </span>
                        <div className="car__enter-reviewer-info-wrapper">
                            <input
                                onChange={ setComment }
                                value={ reviewerEmail }
                                name="reviewerEmail"
                                type="text"
                                className="car__enter-reviewer-info"
                            />
                            { isError.reviewerEmail
                                &&
                                <span className="car__error-info-field"
                                >
                                    Field is empty or not valid
                                </span> }
                        </div>

                    </label>
                    <label
                        onClick={ resetError }
                        className="car__enter-reviewer-label"
                    >
                        <span className="car__enter-reviewer-type-info">
                            Rating
                        </span>
                        <div className="car__enter-reviewer-info-wrapper car__enter-reviewer-info-wrapper--small">
                            <input
                                onChange={ setComment }
                                value={ rating }
                                name="rating"
                                type="text"
                                className="car__enter-reviewer-info"
                            />
                            {
                                isError.rating
                                &&
                                <span className="car__error-info-field"
                                >
                                    Max rating is 5 or more 0
                                </span>
                            }
                        </div>

                    </label>
                </div>
                <div className="car__enter-reviewers-comment-wrapper">
                    <textarea
                        onClick={ resetError }
                        onChange={ setComment }
                        value={ reviewerInfo.comment }
                        className="car__enter-reviewers-comment"
                        name="comment"
                        id=""
                    >
                    </textarea>
                    {
                        isError.comment
                        &&
                        <span className="car__error-info-field"
                        >
                            Field is empty
                        </span>
                    }
                </div>

                <button className='car__add-reviewers-comment'>
                    Add your comment
                </button>
            </div>
        </form>
    )
}

function Comments({ userComment: { reviewerName, reviewerEmail, date, comment, rating } }) {
    return (
        <div className="car__reviews-item">
            <div className="car__reviewer-own-info">
                <span className="car__reviewer-data">
                    { reviewerName }
                </span>
                <span className="car__reviewer-data">
                    { date.split('.')[0].split('T').reverse().join(' ') }
                </span>
                <span className="car__reviewer-data">
                    { reviewerEmail }
                </span>
                <span className="car__reviewer-data">
                    Car rating: { rating }
                </span>
            </div>
            <span className="car__reviewer-comment">
                { comment }
            </span>
        </div>
    )
}

function setDataToLocalStorage(key, id, data) {
    console.log(!!localStorage.getItem(key))
    console.log(localStorage.getItem(key))
    const comments = !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : { [id]: [] };
    `${id}` in comments ? comments[id].push(data) : (comments[id] = [], comments[id].push(data));
    localStorage.setItem(key, JSON.stringify(comments))
    console.log('comment', comments)
    return {
        id,
        comments: comments[id]
    }
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