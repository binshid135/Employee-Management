import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import AdminPanel from './AdminPanel'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ViewEmployees = () => {

  const nav=useNavigate()
  const [employee, eres] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/getemployee`).then(response => {
      console.log(response.data.data);
      eres(response.data.data)
    })
  }, [])
  const img = 'http://localhost:8080/'

  const del = async (id) => {
    console.log("deeellll" + id);
    const response = await axios.post(`http://localhost:8080/delete`, { id })
    console.log(response.data.data);
    eres(employee.filter(item => item._id !== id))

  }

  const edit=async(id)=>{
      console.log("eeeeee"+id);
      sessionStorage.setItem('ed',id)
  }

  return (
    <>
      <AdminPanel />
      <Container className='mt-5'>
        <center><h1>Employee List </h1></center>
        <Row className='justify-content-center'>
          <Col lg={9} className='mt-5 pt-3'>
            <Table striped="columns">
              <thead>
                <tr>

                  <th>Name</th>
                  <th>mail</th>
                  <th>mobile</th>
                  <th>designation</th>
                  <th>gender</th>
                  <th>course</th>
                  <th>image</th>
                  <th>Edit/delete</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((i) => (
                  <tr>
                    <td>{i.name}</td>
                    <td>{i.mail}</td>
                    <td>{i.mobile}</td>
                    <td>{i.designation}</td>
                    <td>{i.gender}</td>
                    <td>{i.course}</td>
                    <td><img src={`${img}${i.image}`} width="120px" height="120px"></img></td>
                    <td><Link to='/editdetails' onClick={()=>edit(i._id)}>Edit</Link>/<Link onClick={() => del(i._id)}>delete</Link></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ViewEmployees