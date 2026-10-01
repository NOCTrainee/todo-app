import { useState, useEffect } from "react";
import { getTodos, createTodo } from "../services/todoService";
import { alert, centerAlert } from "../components/swalAlert";

export default function Todo({ user }) {

    // const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                console.log("Fetched todos: ", data);
            } catch (err) {
                console.error("Failed to fetch todos :", err);
            }
        }
        fetchTodos();
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (title) {
            try {
                const res = await createTodo(title);
                console.log("Todo added: ", res);
                alert("success", res.message);
                setTitle('');
            } catch (err) {
                console.error("Failed to add todo : ", err);
                alert("error", err.response?.data?.message || "Something went wrong");
            }
        }
    }
    return (
        <>
            <div className="m-2 p-2">
                <div className="m-2 p-2 outline outline-2 outline-blue-500 w-fit rounded-lg  mx-auto">
                    <p className="text-lg font-semibold">Welcome, {user?.name}</p>

                    <form className="p-2 flex m-2" onSubmit={onSubmitForm}>
                        <input type="text" placeholder="Enter ToDo" className="outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2 hover:bg-slate-100" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />

                        <button type="submit" className="ml-3 p-2 outline outline-1 outline-green-200 rounded-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white">Add Todo</button>
                    </form>
                </div>
            </div>
        </>
    );
}