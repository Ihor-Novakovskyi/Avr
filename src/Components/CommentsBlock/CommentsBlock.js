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
        const { target: {value, name} } = e;
        setReviewerInfo(currentInfo => ({ ...currentInfo, [name]: value}))
    }
    function addComment(e) { 
        e.preventDefault();
        if (reviewerName && reviewerEmail && comment && rating) {
            if (!Number(rating)) { 
                setError(error => ({...error, rating: true }))
                return;
            }
            const commentSaveToStorage = {
                ...reviewerInfo,
                date: new Date().toISOString(),
            };
            const commentsTOSaveToCarInState = setDataToLocalStorage('comment', id, commentSaveToStorage)
            dispatch(addCommentsInCarProps(commentsTOSaveToCarInState))
        } else { 
            setError({
                reviewerName: !reviewerName.length,
                reviewerEmail: !reviewerEmail.length,
                comment: !comment.length,
                rating: !rating.length || Number(rating),
            })
        }
    }
    console.log(reviewerInfo)
    console.log('isError', isError)
    return (
        <form
            onSubmit={addComment}
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
                    <label className="car__enter-reviewer-label">
                        <span className="car__enter-reviewer-type-info">
                            Name
                        </span>
                        <input
                            onChange={ setComment }
                            value={reviewerName}
                            name="reviewerName"
                            type="text"
                            className="car__enter-reviewer-info"
                        />
                    </label>

                    <label className="car__enter-reviewer-label">
                        <span className="car__enter-reviewer-type-info">
                            Email
                        </span>
                        <input
                            onChange={ setComment }
                            value={reviewerEmail}
                            name="reviewerEmail"
                            type="text"
                            className="car__enter-reviewer-info"
                        />
                    </label>
                    <label className="car__enter-reviewer-label car__enter-reviewer-label--small">
                        <span className="car__enter-reviewer-type-info">
                            Rating
                        </span>
                        <input
                            onChange={ setComment }
                            value={rating}
                            name="rating"
                            type="text"
                            className="car__enter-reviewer-info"
                        />
                    </label>
                </div>

                <textarea
                    onChange={ setComment }
                    value={reviewerInfo.comment}
                    className="car__enter-reviewers-comment"
                    name="comment"
                    id=""
                >
                </textarea>
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
    const comments = !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {[id]: []};
    `${id}` in comments ? comments[id].push(data) : (comments[id] = [], comments[id].push(data));
    localStorage.setItem(key, JSON.stringify(comments))
    console.log('comment', comments)
    return {
        id,
        comments: comments[id]
    }
}
