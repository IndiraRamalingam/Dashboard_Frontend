import React, { useEffect, useState } from 'react'
import instance from '../../services/instance';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const[name,setName]=useState('');
  const[summary,setSummary]=useState('');
  const[description,setDescription]=useState('');
  const[taskId,setTaskId]=useState('')
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errormsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllTasks();
  }, [tasks])

  //To get the list of all Tasks
  const getAllTasks = async () => {
    try {
      const response = await instance.protectedInstance.get(`tasks/getAll/${params.id}`)
      setTasks(response.data);      
    }
    catch (error) {
      console.log(error)
    }
  }

  //To get the particular task using ID
    const getTask = async(id) =>{
    handleShow()
    try{
      const response = await instance.protectedInstance.get(`tasks/getTask/${id}`)
      setName(response.data.TodoItems.name)
      setSummary(response.data.TodoItems.summary)
      setDescription(response.data.TodoItems.description)
      setTaskId(response.data.TodoItems._id)
    }
    catch(error)
    {
      console.log("Error in getting task using ID ",error)
    }
  }

  //To Edit Task
  const handleUpdate = (event) => {
    event.preventDefault();
    if(name !='' && summary !='' && description!='')
    {
      editTask({name,summary,description})
    }
    else{
      setErrorMsg('Please fill the above field')
    }
  }

  const editTask = async(details)=>{
    try{
      const response = await instance.protectedInstance.put(`/tasks/editTask/${taskId}`,details);
      if (response.status === 200) {
        setMsg("Task Updated")   
        setErrorMsg('')
        window.location.reload(false); 
      }
    }
    catch(error)
    {
      console.log("Error in updating"+error)
    }
  }

  //To delete a task using ID
  const deleteTask = async (id) => {
    try {
      var result = confirm("Are you sure to delete?");
      if(result)
      {
        let response = await instance.protectedInstance.delete(`/tasks/deleteTask/${id}`)
        if (response.status == 200) {
          getAllTasks();
          window.location.reload(false);
        }
      }
      
    }
    catch (error) {
      console.log("Error in deleting Tasks ", error)
    }
  }

  return (
    <>
      <div className=''>
        {tasks.map((p,i)=>{
          return(
            <div className='m-3' draggable="true" ondragstart="drag(event)" id="dat1">
              <div className="card">
              <h5 className="card-header">
              {p.name}
              </h5>
              <div className="card-body">
                <h5 className="card-title">{p.summary}</h5>
                <p className="card-text">{p.description}</p>
                <div className='row'>
                         <div className='col-sm-6'> 
                         </div>
                         <div className='col-sm-6' style={{display:'flex','justifyContent':'flex-end'}}>
                         <button className='btn btn-warning me-1' style={{'fontSize':'10px'}} onClick={() => {
                                              getTask(p._id)
                                            }}>
                              <i class="fa fa-pencil" aria-hidden="true"></i>  
                           </button>
                             <button className='btn btn-danger'  style={{'fontSize':'10px'}} onClick={() => {
                                                deleteTask(p._id);
                                            }}>
                              <i class="fa fa-trash" aria-hidden="true"></i> 
                           </button>
                         </div>
                       </div> 
               </div>
               </div>  
            
            </div>
          )
        })}
      </div>

      {/* Modal - To Edit the Task */}

      <div className='modal-dialog modal-dialog-centered'>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <div className="form-outline mb-4">
                <input type="textarea" className="form-control form-control-lg"
                  placeholder='Task Name'
                  value={name}
                  onChange={(event) => setName(event.target.value) }
                />
              </div>
              <div className="form-outline mb-4">
                <input type="textarea" className="form-control form-control-lg"
                  placeholder='Summary'
                  value={summary}
                  onChange={(event) => setSummary(event.target.value) }
                />
              </div>
              <div className="form-outline mb-4">
                <textarea type="textarea" className="form-control form-control-lg"
                  placeholder='Description'
                  value={description}
                  onChange={(event) => setDescription(event.target.value) }
                />
              </div>
            </Form>
          </Modal.Body>
          <p style={{ color: "green",'textAlign':'center' }}>{msg}</p>
        <p style={{ color: "red" ,'textAlign':'center'}}>{errormsg}</p>
          <Modal.Footer>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


    </>
  )
}

export default ViewTask