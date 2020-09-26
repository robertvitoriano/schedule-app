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
    let title = prompt('Digite o título da nova tarefa')
    let calendarApi = selectInfo.view.calendar



    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
      await api.post('/tasks',{
        title:title,
        start:selectInfo.startStr,
        end:selectInfo.endStr,
        allDay:selectInfo.allDay
      })
      document.location.reload();
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
const handleEventClick = (clickInfo) => {
  const chosenTask = currentTasks.filter((task) => {
    return clickInfo.event.title == task.title;
  })[0];
  console.log(chosenTask);
  const id = chosenTask._id;

  if (window.confirm(`Você realmente quer remover a tarefa '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
    fetch("http://localhost:4000/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({id}),
    }).then((response)=>{
      if (response.status === 200) {
      const remainingTasks = currentTasks.filter((task) => {
        return task._id !== id;
      });
      setCurrentTasks(remainingTasks);
    }
    })

  }
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
            events={currentTasks} // alternatively, use the `events` setting to fetch from a feed
            locale={ptBrLocale}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />

      </div>
    </div>
  );
};
export default Home;
