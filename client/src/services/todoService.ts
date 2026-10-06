import axios from 'axios';

const API_URL = 'http://localhost:5000/todo';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${API_URL}/`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error while fetching todos: ", err);
    throw err;
  }
};

export const getTodoById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}` , { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error while fetching a single todo: ", err);
    throw err;
  }
};

export const createTodo = async (title) => {
  try {
    const res = await axios.post(`${API_URL}/`, { title }, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error while adding todo : ", err);
    throw err;
  }
}

export const updateTodo = async (id, data) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error while updating todo : ", err);
    throw err;
  }
}

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Service error while deleting todo : ", err);
    throw err;
  }
}