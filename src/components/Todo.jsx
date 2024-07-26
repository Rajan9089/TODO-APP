import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
const Todo = () => {
  // const [todoList , setTodoList] = useState([]);
  const [todoList , setTodoList] = useState(localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos")) : []);

  const inputRef = useRef();

  const add = ()=>{
     const inputText = inputRef.current.value.trim();   //trim() method added to trim extra spaces at start and end 

    //  console.log(inputText);
    if(inputText === ""){  // if empty .. then below lines will be skipped
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete:false,
    }

    setTodoList((prev)=> [...prev , newTodo]);

    inputRef.current.value = "";
  }


  const deleteTodo = (id ) => {
    setTodoList((prevTodos)=>{
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }


  const toggle = (id) => {
    setTodoList((prevTodos) =>{
      return prevTodos.map((todo) => {
        if(todo.id === id){
          return {...todo , isComplete: !todo.isComplete}      // return an object
        }

        return todo;   // return other items without changing the status
      })
    })
  }

  // how we can check whether the isComplete data has been updated or not ?
  // so use an useEffect

  useEffect(()=>{
    // console.log(todoList);
    localStorage.setItem("todos" , JSON.stringify(todoList));     // setItem(key:string , value:string)
  } , [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md
      flex flex-col p-7 min-h-[550px] rounded-xl'>
      {/* <h1>TODO</h1> */}

      {/*----------- title---------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/*----------- Input Box---------- */}

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
          type="text" name='addtask' placeholder='Add Your task' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14
         text-white text-lg font-medium cursor-pointer'>ADD +</button>
      </div>

      {/*----------- Todo List ---------- */}
      <div>

        {/* adding todoList via map*/}
        {todoList.map(( item ,index ) => {    // { value -> key } pair
          return <TodoItems key={index} text={item.text} id={item.id} 
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}/>
        })}


        {/* static values */}
        {/* 
        <TodoItems text="Learn Coding " />
        <TodoItems text="Learn Coding from GreatStack" />
         */}


      </div>

    </div>
  )
}

export default Todo
