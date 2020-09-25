import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Header from './../../components/Header'
import logo from './../../assets/logo-agx-software.png';

import './index.css'
 const Home = ({history})=>{
    console.log('Home');

    return(<div className="home-container container">
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

          />
 </div>
    </div>)
}
export default Home;