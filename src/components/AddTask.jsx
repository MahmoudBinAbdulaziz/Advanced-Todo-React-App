import {useNavigate} from 'react-router-dom';
import { FormControl, Stack, Select, TextField, Typography,InputLabel, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { TodoContext } from '../context/todoContext';
import { addTasksToLocalStorage } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
function AddTask({task=null,setTask=null}) {
    const navigate = useNavigate();
    const {todos,setTodos} = useContext(TodoContext);
    const [name, setName] = useState(task ? task.name : '');
    const [priority, setPriority] = useState(task ? task.priority : 'medium');
    const [difficulty, setDifficulty] = useState(task ? task.difficulty : 'medium');
    const [status, setStatus] = useState(task ? task.status : 'todo');
    if(task){
        // console.log(task);
        return (<Stack direction={"column"} gap={"2rem"}>
        <FormControl fullWidth>
            {/* Form fields will go here */}
            <TextField  onChange={e=>{
                setTask(prev=>({...prev,name:e.target.value}))
                setName(e.target.value)
                
            }
                } label="اسم المهمة" variant="outlined" margin="normal" fullWidth  value={name}/>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel shrink htmlFor="difficulty-select">
                    مستوى الصعوبة
                </InputLabel>
            <Select onChange={(e)=>{
                    setTask(prev=>({...prev,difficulty:e.target.value}))
                setDifficulty(e.target.value)}} native  margin="normal" fullWidth value={difficulty}>
                <option value={"easy"}>سهلة</option>
                <option value={"medium"}>متوسطة</option>
                <option value={"hard"}>صعبة</option>
            </Select>
            </FormControl>
            <FormControl fullWidth> 
            <InputLabel shrink htmlFor="priority-select">
                الأولوية
        </InputLabel>
            <Select onChange={(e)=>{
                    setTask(prev=>({...prev,priority:e.target.value}))
                setPriority(e.target.value)}}  value={priority} native margin="normal" fullWidth>
                <option value={"high"}>عالية</option>
                <option value={"medium"}>متوسطة</option>
                <option value={"low"}>منخفضة</option>
            </Select>
        </FormControl>
        </Stack>)
    }
    else return (
    <Stack direction={"column"} gap={"2rem"}>
        <Typography variant='h4' marginTop={"2rem"}>إضافة مهمة جديدة</Typography>
        <FormControl fullWidth>
            {/* Form fields will go here */}
            <TextField onChange={e=>setName(e.target.value)}  label="اسم المهمة" variant="outlined" margin="normal" fullWidth />
            </FormControl>

            <FormControl fullWidth>
                <InputLabel shrink htmlFor="difficulty-select">
                    مستوى الصعوبة
                </InputLabel>
            <Select native  margin="normal" fullWidth value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
                <option value={"easy"}>سهلة</option>
                <option value={"medium"}>متوسطة</option>
                <option value={"hard"}>صعبة</option>
            </Select>
            </FormControl>
            <FormControl fullWidth> 
            <InputLabel shrink htmlFor="priority-select">
                الأولوية
        </InputLabel>
            <Select value = {priority} onChange={(e)=>setPriority(e.target.value)} native margin="normal" fullWidth>
                <option value={"high"}>عالية</option>
                <option value={"medium"}>متوسطة</option>
                <option value={"low"}>منخفضة</option>
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel shrink htmlFor="status-select">
                الحالة
        </InputLabel>
            <Select id="status-select" native margin="normal" fullWidth value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value={"completed"}>منجزة</option>
                <option value={"todo"}>غير منجزة</option>
            </Select>
            
        </FormControl>
        <FormControl fullWidth>
            <Button variant="contained" color="primary" onClick={()=>{
                if(!name)return;
                const newTask = {
                    id: uuidv4(),
                    name,
                    priority,
                    difficulty, 
                    status,
                };
                    // console.log(newTask);
                addTasksToLocalStorage([...todos, newTask]);
                setTodos([...todos, newTask]);
                navigate("/all");

                 
            }}>
                حفظ المهمة
            </Button>
        </FormControl>

        
    </Stack>
  )
}

export default AddTask