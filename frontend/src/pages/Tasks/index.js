import React, { useState, useEffect } from "react";
import { mask, unMask } from "remask";

import api from "./../../services/api";
import Header from "../../components/Header";
import "./index.css";

const Tasks = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStartDay, setTaskStartDay] = useState("");
  const [taskEndDay, setTaskEndDay] = useState("");
  const [taskToUpdateId,setTaskToUpdateId] = useState("");

  useEffect(() => {
    const lodTasks = async () => {
      const response = await api.get("/tasks");
      setTasks(response.data);
    };

    lodTasks();
  }, [tasks]);

  const handleTaskDelete = (e, id) => {
    e.preventDefault();
  

    fetch("http://localhost:4000/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((response) => {
      if (response.status === 200) {
        const remainingTasks = tasks.filter((task) => {
          return task._id !== id;
        });
        setTasks(remainingTasks);
      }
    });
  };

  const handleUpdateModal = async (e, id) => {
    console.log(id);
    e.preventDefault();
    setShowUpdateModal(true);
    setTaskToUpdateId(id);
    const task = tasks.filter((task)=>task._id === id)[0];

    setTaskTitle(task.title);
    setTaskEndDay(task.end);
    setTaskStartDay(task.start);
  };
  const handleTaskUpdate = async (e,id)=>{
    e.preventDefault();
    console.log(id);
  const requestBody =  {
      id:id,
      title:taskTitle,
      start:taskStartDay,
      end:taskEndDay

   }
    fetch("http://localhost:4000/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(requestBody),
    })
    setShowUpdateModal(false);

  }

  return (
    <div className="container tasks-container">
      <Header history={history} />
      <h1 className="tasks-title">Tarefas Agendadas</h1>
      <div className="tasks-content">
        <div className="tasks-header"></div>
        <div className="tasks-scroll-list">
          <ul className="tasks-list">
            <div className="tasks-list-container">
              {tasks.map((task) => (
                <li key={task._id}>
                  <div className="task-field task-field-title">
                    {task.title}
                  </div>
                  <div className="task-field task-field-start">
                    {task.start}
                  </div>
                  <div className="task-field task-field-end">{task.end}</div>
                  <div className="task-field task-field-name">
                    {task.allDay}
                  </div>
                  <div className="task-field-buttons task-field ">
                    <a
                      className="update-button task-button"
                      onClick={(e) => handleUpdateModal(e, task._id)}
                    >
                      Alterar
                    </a>
                    <a
                      className="delete-button task-button"
                      onClick={(e) => handleTaskDelete(e, task._id)}
                    >
                      Excluir
                    </a>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
      {showUpdateModal ? (
        <div className="update-task-modal">
          <div className="update-task-modal-content">
            <a
              className="close-button"
              onClick={(e) => setShowUpdateModal(false)}
            >
              X
            </a>
            <span className="modal-title">Alterar Tarefa</span>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Tarefa"

            />
            <input
              value={taskStartDay}
              onChange={(e) => setTaskStartDay(mask(unMask(e.target.value), ["9999-99-99"]))}
              placeholder="Inicio"
              

            />
            <input
              value={taskEndDay}
              onChange={(e) => setTaskEndDay(mask(unMask(e.target.value), ["9999-99-99"]))}
              placeholder="Fim"
            />
            <a className=" update-modal-button" onClick={e=>{handleTaskUpdate(e,taskToUpdateId)}}>Alterar</a>
          </div>
        </div>
      ) : (
        ""
      )}
      {showUpdateModal ? <div className="translucent"></div> : ""}
    </div>
  );
};

export default Tasks;
