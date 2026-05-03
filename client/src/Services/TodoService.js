import axios from "axios"; 

const baseUrl = import.meta.env.VITE_APP_BASEURL;


const user = JSON.parse(localStorage.getItem('auth') || '{}');

axios.defaults.headers.common['Authorization'] = `Bearer ${user?.user?.token || ""} `;

const createTodo = (data)=> {
    return axios.post(`${baseUrl}/todo/create`,data)

}

const getAllTodo = (id)=> {
    return axios.post(`${baseUrl}/todo/getall/${id}`)

}
const updateTodo = (id,data) => {
    return axios.patch(`${baseUrl}/todo/update/`+id,data)
}
const deleteTodo = (id) => {
    return axios.delete(`${baseUrl}/todo/delete/`+id)

}

const TodoServices = {createTodo,getAllTodo,updateTodo, deleteTodo}
export default TodoServices;