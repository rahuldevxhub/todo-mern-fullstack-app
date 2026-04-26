import React, { useState } from 'react'
import toast from 'react-hot-toast';
import TodoServices from '../Services/TodoService';

const EditTodo = ({setShowModal, task, getUserTask}) => {

    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [isCompleted, setIsCompleted] = useState(task?.isCompleted)

    const handleClose = () => {
        setShowModal(false)
    }

    const handleSelect = (e) => {
        setIsCompleted(e.target.value);
        
    }
    console.log(isCompleted)
    

    const id = task?._id;

    const handleSubmit = async () => {
        try {
             
      const userData = JSON.parse(localStorage.getItem("auth") || "{}");
      const createdBy = userData && userData.user._id;
      const data = { title, description, createdBy, isCompleted };

      if (!title || !description) {
        return toast.error("Please provide Title and Description");
      }
      await TodoServices.updateTodo(id,data);
      setShowModal(false);
      toast.success("Task Updated Successfully");
      setTitle("");
      setDescription("");
      getUserTask();
     
        } catch (error) {
            console.log(error);
            toast.error(error)
            
        }
        
    }

  return (
     <>
      {task && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter your title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
                <div className="my-3">
                    <select className='form-select ' onChange={handleSelect}>
                        <option selected>Select Status</option>
                        <option value={true}>Completed</option>
                        <option value={false}>Incompleted</option>

                    </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditTodo