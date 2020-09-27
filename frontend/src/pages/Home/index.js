import React, { useEffect, useRef, useState } from "react";
import { mask, unMask } from "remask";

import api from "./../../services/api";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "./../../components/Header";
import logo from "./../../assets/logo-agx-software.png";

import "./index.css";
const Home = ({ history }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [currentTasks, setCurrentTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStartDay, setTaskStartDay] = useState("");
  const [taskEndDay, setTaskEndDay] = useState("");
  const [taskStartHour, setTaskStartHour] = useState("");
  const [taskEndHour, setTaskEndHour] = useState("");
  const [taskAllDayFlag, setTaskAllDayFlag] = useState("");
  const [hasTime, setHasTime] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const currentTasksRef = useRef([]);

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  useEffect(() => {
    const loadTasks = async () => {
      const response = await api.get("/tasks/list",{
        headers:{
          authorization:'Bearer '+token 
        }
      });
      response.data.map((task) => {
        if (task.allDay) {
          currentTasksRef.current.push({
            title: task.title,
            start: task.dayStart,
            end: task.dayEnd,
            allDay: task.allDay,
            _id: task._id,
          });
        } else {
          currentTasksRef.current.push({
            title: task.title,
            start: task.dayStart + "T" + task.hourStart + "-03:00",
            end: task.dayEnd + "T" + task.hourEnd + "-03:00",
            allDay: task.allDay,
            _id: task._id,
          });
        }
      });
      setCurrentTasks(currentTasksRef.current);
    };
    loadTasks();
  }, []);
  const handleDateSelect = async (selectInfo) => {
    let title = prompt("Digite o título da nova tarefa");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      if (selectInfo.startStr.includes("T")) {
        const formatedHourStart = selectInfo.startStr
          .split("T")[1]
          .replace("-03:00", "");
        const formatedHourEnd = selectInfo.endStr
          .split("T")[1]
          .replace("-03:00", "");
        const formatedDayStart = selectInfo.startStr.split("T")[0];
        const formatedDayEnd = selectInfo.endStr.split("T")[0];

        await api.post("/tasks/create", {
          title: title,
          dayStart: formatedDayStart,
          dayEnd: formatedDayEnd,
          hourStart: formatedHourStart,
          hourEnd: formatedHourEnd,
          allDay: selectInfo.allDay,
        },{
          headers:{
            authorization:'Bearer '+token 
          }
        });
      } else {
        await api.post("/tasks/create",{
          title: title,
          dayStart: selectInfo.startStr,
          dayEnd: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },{
          headers:{
            authorization:'Bearer '+token 
          }
        });
      }
      document.location.reload();
    }
  };

  const handleEventClick = (clickInfo) => {
    const chosenTask = currentTasks.filter((task) => {
      return clickInfo.event.title == task.title;
    })[0];

    if (chosenTask.start.includes("T")) {
      setHasTime(true);
      const formatedHourStart = chosenTask.start
        .split("T")[1]
        .replace("-03:00", "");
      const formatedHourEnd = chosenTask.end
        .split("T")[1]
        .replace("-03:00", "");
      const formatedDayStart = chosenTask.start.split("T")[0];
      const formatedDayEnd = chosenTask.end.split("T")[0];
      setTaskTitle(chosenTask.title);
      setTaskEndDay(formatedDayEnd);
      setTaskStartDay(formatedDayStart);
      setTaskStartHour(formatedHourStart);
      setTaskEndHour(formatedHourEnd);
      setTaskAllDayFlag(chosenTask.allDay);

      setHasTime(true);
    } else {
      const formatedDayStart = chosenTask.start.split("T")[0];
      const formatedDayEnd = chosenTask.end.split("T")[0];
      setTaskTitle(chosenTask.title);
      setTaskEndDay(formatedDayEnd);
      setTaskStartDay(formatedDayStart);
      setHasTime(false);
      setTaskAllDayFlag(chosenTask.allDay);
      setTaskStartHour('00:00:00');
      setTaskEndHour('00:00:00');
    }
    setTaskId(chosenTask._id);
    setShowTaskModal(true);
  };
  const handleDelete = () => {
    fetch("http://localhost:4000/tasks/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json",'Authorization': 'Bearer '+token },
      body: JSON.stringify({ id: taskId }),
    }).then((response) => {
      if (response.status === 200) {
        const remainingTasks = currentTasks.filter((task) => {
          return task.title !== taskTitle;
        });
        setCurrentTasks(remainingTasks);
      }
    });
    setShowTaskModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const tasksWithoutChosenTask = currentTasks.filter((task) => {
      return task._id !== taskId;
    });
    const today = new Date();
    const year = today.getFullYear();

    if (
      !(Number(taskStartDay.split("-")[0]) >= year &&
      Number(taskStartDay.split("-")[2]) <= 31 &&
      Number(taskStartDay.split("-")[2]) >= 1 &&
      (Number(taskStartDay.split("-")[1]) >= 1) &
        (Number(taskStartDay.split("-")[1]) <= 12) &
        (Number(taskEndDay.split("-")[0]) >= year) &&
      Number(taskEndDay.split("-")[2]) <= 31 &&
      Number(taskEndDay.split("-")[2]) >= 1 &&
      Number(taskEndDay.split("-")[1]) >= 1 &&
      Number(taskEndDay.split("-")[1]) <= 12)
    ) {
      alert("Data Inválida, digite uma data válida.");


    }else if (
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

    }else  {
      let requestBody;

      if (!taskStartHour) {
        requestBody = {
          id: taskId,
          title: taskTitle,
          dayEnd: taskEndDay,
          dayStart: taskStartDay,
          hourEnd: taskEndHour,
          hourStart: taskStartHour,
          allDay: true,
        };
      } else {
        requestBody = {
          id: taskId,
          title: taskTitle,
          dayEnd: taskEndDay,
          dayStart: taskStartDay,
          hourEnd: taskEndHour,
          hourStart: taskStartHour,
          allDay: false,
        };
      }

      fetch("http://localhost:4000/tasks/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json",'Authorization': 'Bearer '+token },
        body: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status === 200) {
          if (!taskStartHour) {
            setCurrentTasks([
              ...tasksWithoutChosenTask,
              {
                title: taskTitle,
                start: taskStartDay,
                end: taskEndDay,
                _id: taskId,
                allDay: taskAllDayFlag,
              },
            ]);
          } else {
            setCurrentTasks([
              ...tasksWithoutChosenTask,
              {
                title: taskTitle,
                start: taskStartDay + "T" + taskStartHour + "-03:00",
                end: taskEndDay + "T" + taskEndHour + "-03:00",
                _id: taskId,
                allDay: taskAllDayFlag,
              },
            ]);
          }
        }
        setShowTaskModal(false);
      });
    } 
  };

  return (
    <div className="home-container container">
      <Header history={history}></Header>
      <div className="aside-warning aside-warning-left">
        <div className="aside-warning-content aside-warning-content-left">
          <h1 className="welcome-message">
            Seja Bem Vindo(a)
            <br />
            {name}
          </h1>
          <span className="add-task-warning warning-message">
            Clique em uma data no calendário para adicionar um evento
          </span>
        </div>
      </div>

      <div className="home-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={currentTasks} // alternatively, use the `events` setting to fetch from a feed
          locale={ptBrLocale}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
      <div className="aside-warning aside-warning-right">
        <div className="aside-warning-content aside-warning-content-right">
          <span className="add-task-warning warning-message">
            Clique em um evento para que possa deleta-lo, ou remove-lo
          </span>
        </div>
      </div>
      {showTaskModal ? (
        <div className="update-task-modal">
          <div className="update-task-modal-content">
            <a
              className="close-button"
              onClick={(e) => setShowTaskModal(false)}
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
              className=" delete-modal-button modal-button"
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Remover
            </a>
            <a
              className="update-modal-button modal-button"
              onClick={(e) => {
                handleUpdate(e);
              }}
            >
              Alterar
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
      {showTaskModal ? <div className="translucent"></div> : ""}
    </div>
  );
};
export default Home;
