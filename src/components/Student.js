import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

// 此处的 Student 即主程序文件 App.js 中的 <Student />
export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }

  // POST
  const [name, setName] = React.useState('')
  const [address, setAddress] = React.useState('')

  const handleClick = (e) => {
    e.preventDefault()
    const student = { name, address }
    console.log(student)
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(() => {
      console.log("New Student added")
    })
  }

  // GET
  const [students, setStudents] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
      })
  })

  return (
    <Container>
      {/* 提交框 */}
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Student</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>

        </Box>
        {name}
        {address}
      </Paper>

      {/* 展示框 */}
      <Paper elevation={3} style={paperStyle}>
        <h1>Students</h1>
        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
            Id:{student.id}<br/>
            Name:{student.name}<br/>
            Address:{student.address}

          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
