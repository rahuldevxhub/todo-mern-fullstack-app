import axios from "axios";


const user = JSON.parse(localStorage.getItem('auth') || '{}');

axios.defaults.headers.common['Authorization'] = `Bearer ${user?.user?.token || ""} `;

const createTodo = (data)=> {
    return axios.post('http://localhost:8080/api/v1/todo/create',data)

}

const getAllTodo = (id)=> {
    return axios.post(`http://localhost:8080/api/v1/todo/getall/${id}`)

}
const updateTodo = (id,data) => {
    return axios.patch(`http://localhost:8080/api/v1/todo/update/`+id,data)
}
const deleteTodo = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/todo/delete/`+id)

}

const TodoServices = {createTodo,getAllTodo,updateTodo, deleteTodo}
export default TodoServices;