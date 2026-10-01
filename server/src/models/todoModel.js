import knex from 'knex';
import { db } from '../../db/db.js';

const addTodo = async (todoData) => {
    try {
        const todo = await db('todos').insert(todoData).returning('*');
        return todo;
    } catch (err) {
        console.error("Todo not added : ", err);
    }
}

const getTodoByUserId = async(userId) => {
    try{
        //all todos of a user
        return await db('todos').where('user_id', userId).select();
    }catch(err){
        console.error("Failed to fetch todos for user : ", err);
    }
}

const getTodoById = async(todoId,userId) => {
    try{
        return await db('todos').where({'id': todoId, 'user_id': userId}).first();
    }catch(err){
        console.error("Failed to fetch todo by id : ", err);
    }
}

const updateTodo = async(todoId,userId,updateData) => {
    try{
        return await db('todos').where({'id': todoId, 'user_id': userId}).update({...updateData,updated_at: db.fn.now()}).returning('*');
    }catch(err){
        console.error("Failed to update todo : ", err);
    }
}

const deleteTodo = async(todoId,userId) => {
    try{
        return await db('todos').where({'id': todoId, 'user_id': userId}).del();
    }catch(err){
        console.error("Failed to delete todo : ", err);
    }
}

export { addTodo, getTodoByUserId, getTodoById, updateTodo, deleteTodo };