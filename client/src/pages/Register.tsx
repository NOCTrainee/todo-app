import React, { useState, useEffect } from "react";
import axios from "axios";
import { registerUser } from "../services/userService";
import { alert } from "../components/swalAlert";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const { name, email, password } = user;
        if (name && email && password) {
            try {
                const data = await registerUser('register', user);
                alert('success', data.message);
            } catch (err) {
                console.error(err.message);
                if (axios.isAxiosError(err)) {
                    alert('error', err.response?.data?.message || "Something went wrong");
                };
            }
        }
    }

    return (
        <>
            <div className="m-2 p-2">
                <h1 className="font-bold text-center text-3xl text-blue-700">Task Tracker</h1>
                <div className="m-2 outline outline-2 outline-blue-500 w-fit rounded-lg">
                    <h2 className="text-xl font-semibold p-2 underline text-center">Register Now</h2>
                    <div className="p-2 flex flex-col">
                        <input type="text" placeholder="Enter Name" className="outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2" name="name" value={user.name} onChange={handleChange} />
                        <input type="email" placeholder="Enter Mail ID" className="mt-2 outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2" name="email" value={user.email} onChange={handleChange} />
                        <input type="password" placeholder="Enter Password" className="mt-2 outline outline-1 p-1 outline-gray-500 rounded-sm focus:outline-gray-800 focus:outline-2" name="password" value={user.password} onChange={handleChange} />

                        <button type="submit" onClick={onSubmitForm} className="mt-2 p-1 rounded-lg cursor-pointer bg-blue-500 text-white">Sign Up</button>
                        <button className="p-2 text-blue-500 underline cursor-pointer">Already have an Account? SigIn now</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;