import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "./../../components/Header";
import logo from "./../../assets/logo-agx-software.png";

import "./index.css";
const Home = ({ history }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleDateSelect = (selectInfo) => {
    setShowTaskModal(true);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEvents = (events) => {
    events.map((event) => {
      console.log(
        formatDate(event.start, {
          month: "long",
          year: "numeric",
          day: "numeric",
          hour: "numeric",
        })
      );
    });
  };

  return (
    <div className="home-container container">
      <Header history={history}></Header>
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
          select={handleDateSelect} // agendar tarefa
          eventsSet={handleEvents} //receber informação dos eventos
        />
      </div>
      {showTaskModal ? (
        <div className="task-modal">
          <div className="task-modal-content">
            <span>Adicione uma nova tarefa abaixo</span>
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <a className="add-task-button">Adicionar Tarefa</a>
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
