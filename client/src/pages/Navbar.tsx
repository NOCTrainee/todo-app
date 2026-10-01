import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/userService';
import { alert } from "../components/swalAlert";

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser('logout');
            alert('success', "Logout successful");
            onLogout();
            navigate("/");
        } catch (err) {
            console.error(err);
            alert('error', "Logout failed");
        }
    }

    return (
        <div className="p-2 bg-blue-700 flex justify-between">
            <h1 className="font-bold text-center text-3xl text-white pl-2 grow-1">
                Task Tracker
            </h1>

            {user && (
                <button
                    className="text-white font-bold text-center bg-red-400 rounded-lg p-2 cursor-pointer hover:bg-red-500 outline outline-1"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
}