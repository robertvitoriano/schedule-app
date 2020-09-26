import React, { useEffect, useRef, useState } from "react";
import api from './../../services/api'
import FullCalendar, { formatDate } from "@fullcalendar/react";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "./../../components/Header";
import logo from "./../../assets/logo-agx-software.png";



import "./index.css";
const Home = ({ history }) => {
    // const tasks = formatDate(events.start, {
  //   month: "long",
  //   year: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  // })
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [currentTasks, setCurrentTasks] = useState([]);
  const infoRef = useRef(null);


useEffect(()=>{
 const loadTasks = async()=>{
   const  response = await api.get('/tasks');
   setCurrentTasks(response.data);
  }
  loadTasks()

},[])



  const handleDateSelect = async (selectInfo) => {
    console.log("Essas são as informações Start "+selectInfo.startStr+" End: "+ selectInfo.endStr+" All Day "+selectInfo.allDay)
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    await api.post('/tasks',{
      title:title,
      start:selectInfo.startStr,
      end:selectInfo.endStr,
      allDay:selectInfo.allDay
    })

    calendarApi.unselect() // clear date selection
     function checkFlag() {
    if(title == false) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      /* do something*/
    }
}
    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

 


//  const  handleEvents = (events) => {
//     setCurrentTasks(events);
//     currentTasks.map((task)=>{
//     console.log(formatDate(task.start, {
//     month: "long",
//     year: "numeric",
//     day: "numeric",
//     hour: "numeric",
//    }))

//     })

//     }



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
            events={currentTasks} // alternatively, use the `events` setting to fetch from a feed
            locale={ptBrLocale}
            select={handleDateSelect}
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
            <span>Alterar Tarefa</span>
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              
            />
                        <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              
            />
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
