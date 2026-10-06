import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } from "../services/todoService";
import { alert, centerAlert, delAlert } from "../components/swalAlert";
import { MdOutlineDone, MdModeEditOutline, MdDelete } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

export default function Todo({ user }) {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data.todos);
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

                setTodos((todos) => [...todos,res.todo]);
                alert("success", res.message);
                setTitle('');

            } catch (err) {
                const responseData = err.response?.data;

                if (responseData?.errors) {
                    const errorMessages = responseData.errors
                        .map((issue) => issue.message)
                        .join("\n");

                    centerAlert("error", "Invalid Input", errorMessages);
                } else {
                    alert(
                        "error",
                        responseData?.message || "Something went wrong"
                    );
                }
            }
        }
    }

    const toggleComplete = async (todo) => {
        try {
            const res = await updateTodo(todo.id, {
                completed: !todo.completed
            });

            setTodos((prevTodos) => prevTodos.map((item) =>item.id === todo.id ? res.todo: item));
        } catch (err) {
            console.error(err.message);

            alert("error",err.response?.data?.message || "Failed to update todo : complete");
        }
    }

    const saveEdit = async (todoId) => {
        if (!editedTitle) {
            alert("error", "Todo title cannot be empty");
            return;
        }

        try {
            const res = await updateTodo(todoId, {title: editedTitle});

            setTodos((prevTodos) => prevTodos.map((item) => item.id === todoId ? res.todo: item ) );

            setEditingTodo(null);
            setEditedTitle("");

            alert("success", res.message);

        } catch (err) {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                const errorMessages = responseData.errors
                    .map((issue) => issue.message)
                    .join("\n");

                centerAlert("error","Invalid Input", errorMessages);
            } else {
                alert("error",responseData?.message || "Failed to update todo");
            }
        }
    }

    const handleDel = async (todo) => {
        try {
            const confirmed = await delAlert();
            
            if (!confirmed) {
                return;
            }
            const res = await deleteTodo(todo.id);

            setTodos((prevTodos) =>
                prevTodos.filter((item) => item.id !== todo.id)
            );

            alert("success", res.message);

        } catch (err) {
            console.error(err.message);
            alert("error",err.response?.data?.message || "Failed to delete todo");
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

                    <div>
                        {todos.length === 0 ? (
                            <div className="text-gray-500 p-2 m-2">No todos available.</div>
                        ) : (
                            <div className="p-2 mx-2">
                                {todos.map((todo) => (
                                    <div key={todo.id} className="flex items-center gap-2 p-2 border-b">

                                        {editingTodo === todo.id ? (
                                            <div className='flex items-center gap-x-3'>

                                                <input type='text' value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="flex-1 bg-white text-black rounded-lg p-1 border-2 border-gray-300" />

                                                <div>
                                                    <button type="button" onClick={() => saveEdit(todo.id)} className='bg-green-400 rounded-2xl p-2 m-1 hover:bg-green-500 hover:cursor-pointer'>
                                                        <MdOutlineDone />
                                                    </button>

                                                    <button type="button" className='bg-gray-400 rounded-2xl p-2 m-1 hover:bg-gray-500 hover:cursor-pointer' onClick={() => {
                                                        setEditingTodo(null);
                                                        setEditedTitle("");
                                                    }}>
                                                        <IoMdClose />
                                                    </button>
                                                </div>

                                            </div>
                                        ) : (
                                            <div className="flex w-full">

                                                <button type="button" className={`rounded-full outline outline-2xl h-4 w-4 mt-1 mr-2  hover:cursor-pointer ${todo.completed
                                                    ? "bg-green-400 outline-green-500 text-white"
                                                    : "hover:outline-blue-500"}`} onClick={() => toggleComplete(todo)}>
                                                    {todo.completed && <MdOutlineDone />}
                                                </button>

                                                <span className={`flex-1 font-medium ${todo.completed ? "line-through" : ""}`}>
                                                    {todo.title}
                                                </span>

                                                <div>
                                                    <button type="button" onClick={() => {
                                                        setEditingTodo(todo.id);
                                                        setEditedTitle(todo.title);
                                                    }} className="p-1 text-blue-500 hover:text-blue-700 cursor-pointer">
                                                        <MdModeEditOutline />
                                                    </button>

                                                    <button type="button" onClick={() => handleDel(todo)} className="p-1 text-red-500 hover:text-red-700 cursor-pointer">
                                                        <MdDelete />
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}