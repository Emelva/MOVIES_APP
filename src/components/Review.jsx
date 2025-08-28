import { useState } from "react";
import { createReviews } from "../appWrite";
export default function Review({movieId}) {
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [rate, setRate] = useState(0);
    function handleReviewSubmit(e){
        e.preventDefault();
        try{
            createReviews(movieId, name, 0, review);
        }catch{
            console.error("Error submitting review:", error);
        }
        setReview('');
        setName('');
    }
    return (
        <div>
            
            <form className="grid lg:m-4 lg:w-[400px] w-[300px]" onSubmit={handleReviewSubmit}>
                <input className="outline-0 text-white px-4 p-1 rounded-t border-x-1 border-t-1 border-amber-500" type="text" placeholder="Enter your Name..." value={name} onChange={(e) => setName(e.target.value)}/>
                <textarea className="outline-0 overflow-y-hidden text-white p-4 py-5 resize-none border-1 border-amber-500" 
                name="text" placeholder="Leave a Review..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                <button className="bg-amber-500 p-2 text-white rounded-b cursor-pointer hover:bg-amber-400" type="submit">Submit</button>
            </form>
            {/* <p className="text-white m-4 ml-7">Rate us</p>
            <img className="fill-current" src="/Rating.svg" alt="" />  */}
        </div>
    )
}