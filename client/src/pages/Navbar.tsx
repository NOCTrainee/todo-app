
export default function Navbar() {
    return (
        <>
            <div className=" p-2 bg-blue-700 flex justify-between">
                <h1 className="font-bold text-center text-3xl text-white pl-2 grow-1">Task Tracker</h1>
                <button className="text-white font-bold text-center bg-red-400 rounded-lg p-2 cursor-pointer hover:bg-red-500 outline outline-1">Logout</button>
            </div>
        </>
    );
}