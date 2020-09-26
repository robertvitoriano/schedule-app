import React, { useState, useEffect } from "react";
import api from "./../../services/api";
import Header from "../../components/Header";
import "./index.css";

const Tasks = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");

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

  const handleTaskUpdate = async (e, id) => {
    console.log(id);
    e.preventDefault();
    setShowUpdateModal(true);

    const task = tasks.filter((task)=>task._id === id)[0];

    setTaskTitle(task.title);
    setTaskEnd(task.end);
    setTaskStart(task.start);
  };

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
                      onClick={(e) => handleTaskUpdate(e, task._id)}
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
        <div className="task-modal">
          <div className="task-modal-content">
            <a
              className="close-button"
              onClick={(e) => setShowUpdateModal(false)}
            >
              X
            </a>
            <span>Alterar Tarefa</span>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input
              value={taskStart}
              onChange={(e) => setTaskStart(e.target.value)}
            />
            <input
              value={taskEnd}
              onChange={(e) => setTaskEnd(e.target.value)}
            />
            <a className="update-button">Alterar</a>
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
