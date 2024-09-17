import './CommentsBlock.css';
import React, { useState } from 'react';
import useComments from './useComments.js';
export default function CommentsBlock({ car }) {
    const {
        isError,
        reviewerInfo,
        setComment,
        resetError,
        addComment
    } = useComments(car);
    const { reviewerName, reviewerEmail, comment, rating } = reviewerInfo;
    const { reviews} = car;
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

