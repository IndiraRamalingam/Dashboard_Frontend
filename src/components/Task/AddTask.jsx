import React from 'react'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import instance from '../../services/instance';
import { useNavigate, useParams } from 'react-router-dom';

function AddTask() {

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [msgg, setMsgg] = useState('');
  const navigate=useNavigate();
  const params = useParams();
  console.log("PARAMS  " + params.id)

  const handleCreate = (event) => {
    event.preventDefault();
    createTask({ name,summary,description })
  }

  // API REQUEST
  const createTask = async ( details ) => {
    console.log(details)
    if (name !="" && summary!='' && description !='') {
      try {
        
        const response = await instance.protectedInstance.post(`/tasks/addTask/${params.id}`,  details );
        alert('New Task has been added succesfully !!!')
        navigate(`/home/${params.id}`)
      }
      catch (error) {
        setMsgg("Please fill the fields to add new task");
      }
    }
    else {
      setMsgg('Please fill the fields')
    }
  }

  return (
    <>
    <div className='p-1' style={{'background':'white'}}>
      <div className='container w-50'>
        <Form onSubmit={handleCreate}>
          <div className='mt-3 mb-3 ms-auto'>

            <div className="form-outline col-sm-10 m-5">
              <input type="text" className="form-control form-control-lg"
                value={name}
                placeholder='Task Name'
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-outline col-sm-10 m-5">
              <textarea type="text" className="form-control form-control-lg"
                value={summary}
                placeholder='Summary'
                onChange={(event) => setSummary(event.target.value)}
              />
            </div>

            <div className="form-outline col-sm-10 m-5">
              <textarea type="text" className="form-control form-control-lg"
                value={description}
                placeholder='Description'
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className='col-sm-8 ' >
              <p style={{ color: "#2fe62f", "fontSize": '20px' }}>{msg}</p>
              <p style={{ color: "red" }}>{msgg}</p>
            </div>  

            <div className='col-sm-8 ' style={{'textAlign':'center'}}>
              <button type='submit' className='btn btn-success btn-lg' >Add Task</button>
            </div>
          </div>
        </Form>

      

      </div>
      </div>
    </>
  )
}

export default AddTask;