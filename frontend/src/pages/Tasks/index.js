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
  const [isTimeValid, setIsTimeValid] = useState(false);

  const [taskToUpdateId, setTaskToUpdateId] = useState("");

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
    e.preventDefault();
    setShowUpdateModal(true);
    setTaskToUpdateId(id);
    const task = tasks.filter((task) => task._id === id)[0];
    if (!task.hourStart) {
      setTaskTitle(task.title);
      setTaskEndDay(task.dayEnd);
      setTaskStartDay(task.dayStart);
      setHasTime(false);
    } else {
      setTaskTitle(task.title);
      setTaskEndDay(task.dayEnd);
      setTaskStartDay(task.dayStart);
      setTaskStartHour(task.hourStart);
      setTaskEndHour(task.hourEnd);
      setHasTime(true);
    }
  };
  const handleTaskUpdate = async (e, id) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    if (
      !(
        Number(taskStartDay.split("-")[0]) >= year &&
        Number(taskStartDay.split("-")[2]) <= 30 &&
        Number(taskStartDay.split("-")[2]) >= 1 &&
        (Number(taskStartDay.split("-")[1]) >= 1) &
          (Number(taskStartDay.split("-")[1]) <= 12) &
          (Number(taskEndDay.split("-")[0]) >= year) &&
        Number(taskEndDay.split("-")[2]) <= 30 &&
        Number(taskEndDay.split("-")[2]) >= 1 &&
        Number(taskEndDay.split("-")[1]) >= 1 &&
        Number(taskEndDay.split("-")[1]) <= 12
      )
    ) {
      alert("Data Inválida, digite uma data válida.");
    } else if (
      !(Number(taskStartHour.split(":")[0]) >= 0 &&
      Number(taskStartHour.split(":")[0]) <= 23 &&
      Number(taskStartHour.split(":")[1]) >= 0 &&
      Number(taskStartHour.split(":")[1]) <= 59 &&
      Number(taskStartHour.split(":")[2]) >= 0 &&
      Number(taskStartHour.split(":")[2]) <= 59 &&
      Number(taskEndHour.split(":")[1]) >= 0 &&
      Number(taskEndHour.split(":")[1]) <= 59 &&
      Number(taskEndHour.split(":")[2]) >= 0 &&
      Number(taskEndHour.split(":")[2]) <= 59)
    ) {
      alert("Horário inválido, digite um horário válido.");

    } else {
      let requestBody;

      if (!taskStartHour) {
        requestBody = {
          id: id,
          title: taskTitle,
          dayEnd: taskEndDay,
          dayStart: taskStartDay,
          hourEnd: taskEndHour,
          hourStart: taskStartHour,
          allDay: true,
        };
      } else {
        requestBody = {
          id: id,
          title: taskTitle,
          dayEnd: taskEndDay,
          dayStart: taskStartDay,
          hourEnd: taskEndHour,
          hourStart: taskStartHour,
          allDay: false,
        };
      }

      fetch("http://localhost:4000/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      setShowUpdateModal(false);
    }
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
            <label className="update-task-label">tarefa</label>

            <textarea
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Tarefa"
            />

            <div className="fields-without-time">
              <label className="update-task-label">Data de inicio</label>

              <input
                value={taskStartDay}
                onChange={(e) =>
                  setTaskStartDay(mask(unMask(e.target.value), ["9999-99-99"]))
                }
                placeholder="Inicio"
              />
              <label className="update-task-label">Horário de Início</label>
              <input
                value={taskStartHour}
                onChange={(e) =>
                  setTaskStartHour(mask(unMask(e.target.value), ["99:99:99"]))
                }
                placeholder="Inicio"
              />
              <label className="update-task-label">Data de termino</label>
              <input
                value={taskEndDay}
                onChange={(e) => {
                  setTaskEndDay(mask(unMask(e.target.value), ["9999-99-99"]));
                }}
                placeholder="Inicio"
              />
              <label className="update-task-label">Horário de Termino</label>
              <input
                value={taskEndHour}
                onChange={(e) => {
                  setTaskEndHour(mask(unMask(e.target.value), ["99:99:99"]));
                }}
                placeholder="Fim"
              />
            </div>
            <a
              className=" update-modal-button modal-button"
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
