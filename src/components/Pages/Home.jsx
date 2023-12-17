import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate();
  return (
    <>
       <div className='addTask'>
        <button className='btn btn-success mt-3' onClick={() => {
                        navigate('/addTask')
                      }}>
                        Add Task
        </button>
        </div>

        <div className='container w-55 p-5' style={{'background':'white'}}>
          <div className="table-responsive">
          <table className="table table-bordered">
            <thead align='middle'>
              <tr className="table-info" >
                <th scope="col" >To-do</th>
                <th scope='col'>In Progress</th>
                <th scope="col">In Review</th>
                <th scope="col">Completed</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
            </table>
            </div>

        </div>
    </>
  )
}

export default Home