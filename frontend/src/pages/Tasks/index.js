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
  const [taskStartHour, setTaskStartHour] = useState("");
  const [taskEndHour, setTaskEndHour] = useState("");
  const [hasTime, setHasTime] = useState(false);

  const [taskToUpdateId, setTaskToUpdateId] = useState("");

  useEffect(() => {
    const lodTasks = async () => {
      const response = await api.get("/tasks");
      setTasks(response.data);
    };
    lodTasks();
  }, []);

  console.log(tasks);

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
    e.preventDefault();
    setShowUpdateModal(true);
    setTaskToUpdateId(id);
    const task = tasks.filter((task) => task._id === id)[0];
    if(task.allDay){
      setTaskTitle(task.title);
      setTaskEndDay(task.dayEnd);
      setTaskStartDay(task.dayStart);
      setHasTime(false);


    }else{
      setHasTime(true);
      setTaskTitle(task.title);
      setTaskEndDay(task.dayEnd);
      setTaskStartDay(task.dayStart);
      setTaskStartHour(task.hourStart);
      setTaskEndHour(task.hourEnd);
    }


  };
  const handleTaskUpdate = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const requestBody = {
      id: id,
      title: taskTitle,
      dayEnd: taskStartDay,
      dayStart: taskEndDay,
    };
    fetch("http://localhost:4000/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    setShowUpdateModal(false);
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
                  <div className="task-fields">
                    <div className="task-field task-field-title">
                      {task.title}
                    </div>
                    <div className="task-field task-field-start">
                      {task.dayStart}
                    </div>
                    <div className="task-field task-field-end">
                      {task.dayEnd}
                    </div>
                  </div>

                  <div className="task-field-buttons">
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
            <textarea
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Tarefa"
            />
            {!hasTime ? (
              <div className="fields-without-time">
                <input
                  value={taskStartDay}
                  onChange={(e) =>
                    setTaskStartDay(
                      mask(unMask(e.target.value), ["9999-99-99"])
                    )
                  }
                  placeholder="Inicio"
                />
                <input
                  value={taskEndDay}
                  onChange={(e) =>
                    setTaskEndDay(mask(unMask(e.target.value), ["9999-99-99"]))
                  }
                  placeholder="Fim"
                />
              </div>
            ) : (
              ""
            )}
            {hasTime ? (
              <div className="fields-without-time">
                <input
                  value={taskStartDay}
                  onChange={(e) =>
                    setTaskStartDay(
                      mask(unMask(e.target.value), ["9999-99-99"])
                    )
                  }
                  placeholder="Inicio"
                />
                <input
                  value={taskStartHour}
                  onChange={(e) =>
                    setTaskStartDay(
                      mask(unMask(e.target.value), ["9999-99-99"])
                    )
                  }
                  placeholder="Inicio"
                />
                <input
                  value={taskEndDay}
                  onChange={(e) =>
                    setTaskStartDay(
                      mask(unMask(e.target.value), ["9999-99-99"])
                    )
                  }
                  placeholder="Inicio"
                />
                <input
                  value={taskEndHour}
                  onChange={(e) =>
                    setTaskEndDay(mask(unMask(e.target.value), ["9999-99-99"]))
                  }
                  placeholder="Fim"
                />
              </div>
            ) : (
              ""
            )}
            <a
              className=" update-modal-button"
              onClick={(e) => {
                handleTaskUpdate(e, taskToUpdateId);
              }}
            >
              Alterar
            </a>
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
