import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { TiEdit } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])
  

  const savetoLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const togglefinished=(e) => {
    setshowFinished(!showfinished)
  }
  
  
  
  const handleEdit =(e, id)=>{
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()
  }
  
  const handleDelete =(e, id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()
    
  }
  
  const handleAdd =()=>{
    settodos([...todos,{id: uuidv4(), todo,isCompleted:false}])
    settodo("")
    savetoLS()

  }
  
  const handlechange =(e)=>{
    settodo(e.target.value)

  }
  
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index= todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
    savetoLS()
  } 
  return (
    <>
      <Navbar/>
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-indigo-200 min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-3xl'>MyTask - Manage Your Tasks Here</h1>
        <div className="addtodo my-5 flex flex-col gap-5">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=2} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-3 py-1 font-bold text-white rounded-md mx-6'>Save</button>
        </div>
        <div>
        <input type="text"  className='rounded-lg'  placeholder='Search...' id='search'/>
        </div>
        <input className="my-4" onChange={togglefinished} type="checkbox" checked={showfinished} /> Show Finished
        <hr/>
       
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos" id='todos'>
          {todos.length==0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item=>{

         
          return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between" id='todo'>
            <div className='flex gap-5'>
            <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-1'><TiEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
            </div>
          </div>
          })}
          </div>
        </div>
        
    </>
  )
}

export default App
