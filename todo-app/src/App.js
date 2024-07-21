import React, { useEffect, useState } from "react";
import "./App.css";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [alltodos, setalltodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedtodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newItem = {
      title: newTitle,
      description: newDescription,
    };

    let updateArray = [...alltodos];
    updateArray.push(newItem);
    setalltodos(updateArray);
    localStorage.setItem("todolist", JSON.stringify(updateArray));
  };

  useEffect(() => {
    let savedtodo = JSON.parse(localStorage.getItem("todolist"));
    let savedcompletedtodo = JSON.parse(localStorage.getItem("completedtodos"));

    if (savedtodo) {
      setalltodos(savedtodo);
    }

    if (savedcompletedtodo) {
      setCompletedTodos(savedcompletedtodo);
    }
  }, []);

  const handleDelete = (index) => {
    let reduceTodo = [...alltodos];
    reduceTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setalltodos(reduceTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "/" + mm + "/" + yyyy + "at" + h + ":" + m + ":" + s;

    let filtered = {
      ...alltodos[index],
      completedOn: completedOn,
    };

    let updateCompletedArray = [...completedtodos];
    updateCompletedArray.push(filtered);
    setCompletedTodos(updateCompletedArray);
    localStorage.setItem(
      "completedtodos",
      JSON.stringify(updateCompletedArray)
    );
    handleDelete(index);
  };

  const handleDeleteCompleted = (index) => {
    let reduceTodo = [...completedtodos];
    reduceTodo.splice(index);
    localStorage.setItem("completedtodos", JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  };

  const handleEdit = (index,item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev)=>{
      return {
        ...prev,title:value
      }
    })
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev)=>{
      return {
        ...prev,description:value
      }
    })
  }

  const handleUpdateTodo = () => {
    let prevtodo = [...alltodos]
     prevtodo[currentEdit] = currentEditedItem;
     setalltodos(prevtodo);
     setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1>To-Do it !!!</h1>

      <div className="todo-wrapper">
        <div className="todo-ip">
          <div className="todo-ip-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter the title"
            />
          </div>
          <div className="todo-ip-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter the Description"
            />
          </div>
          <div className="todo-ip-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="Primary-Btn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="Btn-Area">
          <button
            className={`Secondary-Btn ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            To-Do
          </button>
          <button
            className={`Secondary-Btn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            alltodos.map((item, index) => {
              if(currentEdit===index) {
                return (
                  <div className="edit_wrapper" key={index}>
                  <input placeholder="enter the title" onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}></input>
                  <textarea placeholder="enter the description" rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.Description}></textarea>
                  <button
              type="button"
              onClick={handleUpdateTodo}
              className="Primary-Btn"
            >
              Update
            </button>
                </div>
                )
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <span>{item.description}</span>
                    </div>
                    <div>
                      <MdDeleteOutline
                        onClick={() => handleDelete(index)}
                        className="icon"
                      />
                      <FaCheck
                        onClick={() => handleComplete(index)}
                        className="check-icon"
                      />
                      <MdModeEditOutline 
                      onClick={() => handleEdit(index,item)}
                      className="check-icon"/>
                    </div>
                  </div>
                );
              }
              
            })}

          {isCompleteScreen === true &&
            completedtodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <MdDeleteOutline
                      onClick={() => handleDeleteCompleted(index)}
                      className="icon"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
