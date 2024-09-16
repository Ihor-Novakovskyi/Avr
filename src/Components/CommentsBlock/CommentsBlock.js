import './CommentsBlock.css';
import React, { useState } from 'react';
export default function CommentsBlock({ car }) {
    const [reviewerInfo, setReviewerInfo] = useState({ name: '', email: '', comment: '' });
    const { name, email, comment } = reviewerInfo;
    const { reviews, id } = car;

    function setComment(e) {
        const { target: {value, name} } = e;
        setReviewerInfo(currentInfo => ({ ...currentInfo, [name]: value}))
    }
    function addComment(e) { 
        e.preventDefault();
        if (name && email && comment) { 
            console.log('extension work')
            setDataToLocalStorage('comment', id, reviewerInfo)
        }
    }
    console.log(reviewerInfo)
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
                            value={reviewerInfo.name}
                            name="name"
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
                            value={reviewerInfo.email}
                            name="email"
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

function Comments({ userComment: { reviewerName, reviewerEmail, date, comment } }) {
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
    const comment = !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {[id]: []};
    `${id}` in comment ? comment[id].push(data) : (comment[id] = [], comment[id].push(data));
    localStorage.setItem(key, JSON.stringify(comment))
    console.log('comment',comment)
}
// setDataToLocalStorage('comment')
console.log(new Date('2024-05-23T08:56:21.626Z'))