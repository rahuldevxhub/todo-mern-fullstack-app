import React, { useEffect, useState } from "react";
import Nav from "../components/Layout/Nav";
import TodoServices from "../Services/TodoService";

const TodoList = () => {
  const [todoStatus , setTodoStatus] = useState('');
const [filterdTask, setFilterdTask] = useState([]);
  const [allTask, setAllTask] = useState([]);

 const userData = JSON.parse(localStorage.getItem("auth") || "{}");
    const id = userData?.user?._id;
    console.log(id);
    const getUserTask = async () => {
      try {
        const { data } = await TodoServices.getAllTodo(id);
        // console.log(data);
        setAllTask(data?.todos);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    const incomplete = allTask?.filter(item => item?.isCompleted === false);
    const completed = allTask?.filter(item => item?.isCompleted === true);
    if(todoStatus === "incomplete"){
      setFilterdTask(incomplete);
      

    }else if(todoStatus === "completed"){
      setFilterdTask(completed)
    }
    getUserTask();
  }, [todoStatus]);

  return (
    <>
      <Nav />
      <div className="filter-container">
        <h4>Filter Task's by</h4>
        <div className="filter-group">
          <select className="form-select" onChange={(e)=> setTodoStatus(e.target.value)}>
            <option selected>Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
       <div className="card-container">
      {filterdTask?.length === 0 ? (
        <h1>you have no task</h1>
       ) : (
        filterdTask?.map((task, i) => (
        <>
        <div
          className="card border-primary mb-3 mt-3"
          style={{ maxWidth: "18rem" }}
          key={i}
        >
          <div className="card-header">
            <div className="chead">
              <h6>{task?.title.substring(0, 10)}</h6>
              <h6 className={task?.isCompleted === true ? "com" : "inc"}>
                {task?.isCompleted === true ? "Completed" : "Incomplete"}
              </h6>
            </div>
          </div>
          <div className="card-body">
            <h6>{task?.title}</h6>
            <p className="card-text">{task?.description}</p>
            <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
          </div>
          
        </div>
        
        
        </>
        )
      ))}
      </div>
    </>
  );
};

export default TodoList;
