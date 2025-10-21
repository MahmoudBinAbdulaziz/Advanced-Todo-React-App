import React from 'react'
import Container from '@mui/material/Container';
import { Card, CardContent, Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

// import "../app.css"
function TodoList() {
    

  return (
    <Container sx={"100%"} maxWidth="m" style={{ scale:".8", textAlign:"center",width:"100%"}}>
       <Card  style={{width:"100%"}}>
        <Typography variant='h1' style={{color:"rgba(0, 0, 0, 0.54)"}}>مهامي</Typography>
        <Divider/>
        
        <CardContent>
          {<Outlet/>}
        </CardContent>
        <Divider/>
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} paddingY={"1rem"}>
            <Link to="/add-task" style={{textDecoration:"none"}}>
            <ToggleButton style={{width:"8rem", height:"3rem", borderRadius:"2rem", backgroundColor:"#FFD66B", fontWeight:"bold"}}>
                إضافة مهمة
            </ToggleButton>
            </Link>
            <Link to="/statistics" style={{textDecoration:"none", marginRight:"1rem"}}>
            <ToggleButton style={{width:"8rem", height:"3rem", borderRadius:"2rem", backgroundColor:"#4DA8DA", fontWeight:"bold", color:"white"}}>
                الإحصائيات
            </ToggleButton>

            </Link>
            <Link to="/all" style={{textDecoration:"none", marginRight:"1rem"}}>
            <ToggleButton style={{width:"8rem", height:"3rem", borderRadius:"2rem", backgroundColor:"#FF6F91", fontWeight:"bold", color:"white"}}>
                المهام         </ToggleButton>
            </Link>
        </Stack>
        </Card>


    </Container>
  )
}

export default TodoList
