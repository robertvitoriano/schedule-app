import React,{useState,useEffect} from 'react';
import api from './../../services/api'
import Header from '../../components/Header';
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
        {tasks.map(task=>(
        <h1>{task.title}</h1>
        ))}
    </div>)
}



export default Tasks;