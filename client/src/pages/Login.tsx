import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { registerUser } from '../services/userService';
import { alert, centerAlert } from "../components/swalAlert";

import Swal from 'sweetalert2';

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        // console.log(user);
        
        const { email, password } = user;
        if (email && password) {
            try {
                const data = await registerUser('login', user);
                alert('success', data.message);
                navigate("/todo");
            } catch (err) {
                console.error(err.message);
                console.log(err.response?.data);

                const responseData = err.response?.data;

                if (responseData?.errors) {
                    console.log(responseData.errors);

                    const errorMessages = responseData.errors
                        .map((issue) => issue.message)
                        .join("\n");
                        centerAlert("error","Invalid Input",errorMessages)
                } else {
                    alert(
                        "error",
                        responseData?.message || "Something went wrong"
                    );
                }
            }
        }
    }
    return (
        <>
            <div className="m-2 p-2 ">
                <div className="m-2 outline outline-2 outline-blue-500 w-fit rounded-lg mx-auto">
                    <h2 className="text-xl font-semibold p-2 underline text-center">Login</h2>
                    <form onSubmit={onSubmitForm} className="p-2 flex flex-col">
                        <input type="email" placeholder="Enter Mail ID" className="mt-2 outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2" name="email" value={user.email} onChange={handleChange} required />
                        <input type="password" placeholder="Enter Password" className="mt-2 outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2" name="password" value={user.password} onChange={handleChange} required />

                        <button type="submit" className="mt-3 p-1 rounded-lg cursor-pointer bg-blue-500 text-white">SignIn</button>
                        <p className="mt-3">Don't have an Account?
                            <Link to='/register' className="p-2 text-blue-500 underline cursor-pointer">SignUp now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}