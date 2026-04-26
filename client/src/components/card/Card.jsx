import React, { useState } from "react";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoService";

const Card = ({ allTask,getUserTask }) => {
  const [showModal, setShowModal] = useState(null);


  const handleEdit = () => {
    setShowModal(true)
  }
  const deleteTodo = async(id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success('Task deleted Successfully')
      getUserTask();
      
    } catch (error) {
      console.log(error);
      toast.error(error);

      
    }

  }
  return (
    <>
    <div className="card-container">
      {allTask?.map((task, i) => (
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
            <h4>{task?.title}</h4>
            <p className="card-text">{task?.description}</p>
            <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
          </div>
          <div className="card-footer bg-transparent border-primary">
            <button className="btn btn-warning" title="edittask" onClick={handleEdit}>
              <EditDocumentIcon />
            </button>
            <button className="btn btn-danger" title="edittask" onClick={() => deleteTodo(task?._id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        {
          showModal && <EditTodo task={task} setShowModal={setShowModal} getUserTask ={getUserTask}/>

        }
        
        </>
      ))}
      </div>
    </>
  );
};

export default Card;
