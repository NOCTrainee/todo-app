import axios from 'axios';

const API_URL = 'http://localhost:5000/todo';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${API_URL}/`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error: ", err);
    throw err;
  }
};

export const createTodo = async (title) => {
    try{
        const res = await axios.post(`${API_URL}/`, { title }, { withCredentials: true });
        return res.data;
    }catch(err){
        console.error("Service error while adding todo : ", err);
        throw err;
    }
}