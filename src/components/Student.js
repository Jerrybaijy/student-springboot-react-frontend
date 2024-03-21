import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

// 此处的 Student 即主程序文件 App.js 中的 <Student />
export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }

  const [students, setStudents] = React.useState([])
  const [name, setName] = React.useState('')
  const [address, setAddress] = React.useState('')

  // 定义 getAll
  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
      })
  }

  // 在组件挂载时获取学生信息
  React.useEffect(fetchStudents, [])

  // 定义 add
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
      fetchStudents();
    })
  }

  // 定义 delete
  const handleDelete = (studentId) => {
    fetch(`http://localhost:8080/student/delete/${studentId}`, {
      method: "DELETE"
    }).then(() => {
      console.log(`Student with ID ${studentId} deleted`);
      // 删除学生后更新页面以显示删除后的学生信息
      setStudents(students.filter(student => student.id !== studentId));
    });
  }

  // 定义 update
  const handleUpdate = (studentId) => {
    const updatedName = name;
    const updatedAddress = address;
    const updatedStudent = { name: updatedName, address: updatedAddress }
    fetch(`http://localhost:8080/student/update/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent)
    }).then(() => {
      console.log(`Student with ID ${studentId} updated`);
      // 更新学生信息后更新页面以显示最新的学生信息
      fetchStudents();
    });
  }


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
        <h1>List Students</h1>
        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
            <div>
              Id: {student.id}<br />
              Name: {student.name}<br />
              Address: {student.address}
            </div>

            <Button variant="contained" color="primary" onClick={() => handleUpdate(student.id)}>
              Modify
            </Button>

            <Button variant="contained" color="secondary" onClick={() => handleDelete(student.id)}>
              Delete
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
