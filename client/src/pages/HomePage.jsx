import React, { useEffect, useState } from "react";
import Nav from "../components/Layout/Nav";
import PopModal from "../components/PopModal";
import TodoServices from "../Services/TodoService";
import Card from "../components/card/Card";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  const openModalHandler = () => {
    setShowModal(true);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter(item => item.title.toLowerCase().match(query.toLowerCase()))
   
    setSearchQuery(query)

    if(query && filterList.length >0){
      setAllTask(filterList && filterList);

    }else{
      getUserTask()
    }



  }

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
    getUserTask();
    
  }, []);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="add-task">
          <h1>Your task's</h1>
          <input type="search" 
          placeholder="search your task" 
          value={searchQuery} 
          onChange={handleSearch}/>
          <button className="btn btn-primary createTaskBtn" onClick={openModalHandler}>
            create
          </button>
        </div>
        {
          allTask && <Card allTask={allTask} getUserTask = {getUserTask}/>
        }
        <PopModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask= {getUserTask}
        />
      </div>
    </>
  );
};

export default HomePage;
