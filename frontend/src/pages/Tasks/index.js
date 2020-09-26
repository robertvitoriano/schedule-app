import React,{useState,useEffect} from 'react';
import api from './../../services/api'
import Header from '../../components/Header';
import './index.css'

const  Tasks  =({history})=>{
const [tasks,setTasks] = useState([]);
useEffect(()=>{
    const lodTasks = async()=>{
        const response = await api.get('/tasks');
        setTasks(response.data);
    }
    lodTasks()

},[tasks])

const handleTaskDelete  = (e,id)=>{
    e.preventDefault();


   const  remainingTasks = tasks.filter((task)=>{
       return task._i !== id
   })
   setTasks(remainingTasks);
    
   fetch('http://localhost:4000/tasks', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
})



}


    return(<div className="container tasks-container">
             <Header history = {history}/>
             <h1 className="tasks-title">Tarefas Agendadas</h1>
             <div className="tasks-content">
                 <div className="tasks-header"></div>
             <div className="tasks-scroll-list">
             <ul className="tasks-list">
            <div className="tasks-list-container">
               {tasks.map((task) => (
                <li key={task._id}>{task.title}<a className="delete-button"  onClick= {e=>handleTaskDelete(e,task._id)}>X</a></li>
              ))} 
            </div>
          </ul>
          </div>
          </div>
    </div>)
}



export default Tasks;