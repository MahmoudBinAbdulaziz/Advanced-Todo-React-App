import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TodoList from './components/TodoList';
import "./App.css";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { TodoContext } from './context/todoContext';
import { useEffect, useState } from 'react';
import { getTasksFromLocalStorage } from './utils/localStorage';
import Statistics from './components/Statistics';

function App() {
  let initialTasks = [];
  let tasks = [];
  const [todos, setTodos] = useState(initialTasks);
  useEffect(() => {
tasks = getTasksFromLocalStorage();
initialTasks = tasks.length > 0 ? tasks : [];
setTodos(initialTasks);
  
  }, []);
  

  return (
    <Router>
      <Routes>
      <Route path='/' element={<div style={{width: '100%', minHeight: '100vh' ,display:"flex", justifyContent:"center",direction:"rtl", alignItems: 'center' ,backgroundColor:"#80D8C3"}}>
     <TodoContext.Provider value={{todos, setTodos}}>
      <TodoList />
      </TodoContext.Provider>
      </div>}>
      {/* <Route path='/todo' element={<div>Todo Page</div>}/> */}
      {/* <Route path="/completed" element={}/> */}
      <Route path="/all" element={<Tasks/>}/>
      <Route path='add-task' element={<AddTask/>}></Route>
      <Route path="/statistics" element={<Statistics/>}/>
      <Route path='*' element={<div>404 Not Found</div>}/>
      </Route>
      
      </Routes>
      
    
      </Router>
  )
}

export default App
