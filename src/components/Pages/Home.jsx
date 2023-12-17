import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import ViewTask from '../Task/ViewTask';

function Home() {
  const params = useParams();
  console.log("PARAMS  " + params.id)
  const navigate=useNavigate();

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  
  return (
    <>
       <div className='addTask'>
        <button className='btn btn-success mt-3' onClick={() => {
                        navigate(`/addTask/${params.id}`)
                      }}>
                        Add Task
        </button>
        </div>

        <div className='container w-55 p-5' style={{'background':'white'}}>
          <div className="table-responsive">
          <table className="table table-bordered">
            <thead align='middle' >
              <tr className="table-info">
                <th scope="col"  style={{background:'skyblue'}}>To-do</th>
                <th scope='col'  style={{background:'skyblue'}}>In Progress</th>
                <th scope="col"  style={{background:'skyblue'}}>In Review</th>
                <th scope="col"  style={{background:'skyblue'}}>Completed</th>
              </tr>
            </thead>
            <tbody>
              <tr scope='row'>
              <td style={{background:'blanchedalmond'}}>
                <div id='drag1' ondrop="drop(event)" ondragover="allowDrop(event)">
                  <div >
                  <ViewTask / >
                  </div>
                
                </div>
              </td>
              <td style={{backgroundColor:'tomato'}}>
                  <div id="drag2" ondrop="drop(event)" ondragover="allowDrop(event)">

                  </div>
              </td>
              <td style={{backgroundColor:'yellowgreen'}}>

              </td>
              <td style={{backgroundColor:'lightgreen'}}>

              </td>
              </tr>
            </tbody>
            </table>
            </div>

        </div>
    </>
  )
}

export default Home