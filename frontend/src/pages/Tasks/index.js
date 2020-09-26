import React,{useState,useEffect} from 'react';
import api from './../../services/api'
import Header from '../../components/Header';
import './index.css'

const  Tasks  =()=>{
const [tasks,setTasks] = useState([]);
useEffect(()=>{
    const lodTasks = async()=>{
        const response = await api.get('/tasks');
        setTasks(response.data);
        console.log(response.data);
    }
    lodTasks()

},[])


    return(<div className="container tasks-container">
             <Header/>
             <div className="tasks-scroll-list">
             <ul className="tasks-list">
            <div className="tasks-list-container">
               {tasks.map((task) => (
                <li>{task.title}</li>
              ))} 
            </div>
          </ul>
          </div>
    </div>)
}



export default Tasks;