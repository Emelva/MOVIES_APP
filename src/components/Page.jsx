export default function Page(){
    return (
        <form>
            <div className="m-4 w-[300px] text-white p-4 border-2 border-amber-500 rounded">
                <label htmlFor="review"></label>
                <input type="text" placeholder="Leave a Review..."/>

                <button className="bg-amber-500 p-2 text-white ">Submit</button>
            </div>

            
        </form>
    )
}