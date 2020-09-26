import React, { useRef, useState } from "react";
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
  const [currentTasks, setCurrentTasks] = useState([]);
  let eventId = 0;
  // const tasks = formatDate(events.start, {
  //   month: "long",
  //   year: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  // });

  const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  const  INITIAL_EVENTS = [
    {
      id: eventId++,
      title: 'All-day event',
      start: todayStr
    },
    {
      id: eventId++,
      title: 'Timed event',
      start: todayStr + 'T12:00:00'
    }
  ]



  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: eventId++,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }



 const  handleEvents = (events) => {
    console.log(events);
    setCurrentTasks(events);
    }



  return (
    <div className="home-container container">
      <Header history={history}></Header>
      <div className="home-content">
      <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            // eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // eventAdd={function(){}}
            // eventChange={function(){}}
            // eventRemove={function(){}}
            
          />

      </div>
      {showTaskModal ? (
        <div className="task-modal">
          <div className="task-modal-content">
            <a
              className="close-button"
              onClick={(e) => setShowTaskModal(false)}
            >
              X
            </a>
            <span>Adicione uma nova tarefa abaixo</span>
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              
            />
            <a className="add-task-button" onClick={e=>setShowTaskModal(false)}>Adicionar Tarefa</a>
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
