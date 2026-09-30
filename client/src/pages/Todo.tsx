
export default function Todo(){
    return(
        <>
            <div className="m-2 p-2">
                <div className="m-2 p-2 outline outline-2 outline-blue-500 w-fit rounded-lg  mx-auto">

                    <form className="p-2 flex m-2">
                        <input type="text" placeholder="Enter ToDo" className="outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2 hover:bg-slate-100" name="name" required />
                        
                        <button type="submit" className="ml-3 p-2 outline outline-1 outline-green-200 rounded-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white">Add Todo</button>
                    </form>
                </div>
            </div>
        </>
    );
}