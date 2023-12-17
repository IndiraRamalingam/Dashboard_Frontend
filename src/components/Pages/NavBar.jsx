import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css'
import instance from '../../services/instance'
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {

  const [name, setName] = useState('');
  const [id, setId] = useState('')
  const navigate = useNavigate();
  

  useEffect(() => {
    getName()
  })

  const getName = async () => {
    const response = await instance.protectedInstance.get('/users/getId');
    const res = response.data;
    setName(response.data.user_name);
    const params_id = res.user_ID;
    setId(params_id)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='navigation'>
        <Container>
          <Link to='/'>
            <Navbar.Brand>
              <img src="https://logowik.com/content/uploads/images/jira2966.logowik.com.webp" width={200} height={95} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto ">
            <h1 className="" style={{color:"#ce5cbf",fontStyle:'italic','fontWeight':'bolder','textAlign':'center'}}>JIRA DASHBOARD</h1>
            </Nav>

            <div>
              {name.length != 0 ? (
                <div>
                <span style={{fontSize:'20px',color:'rgb(14 11 204 / 64%)','marginRight': '10px',fontWeight:'bold' }}>Welcome, {name}</span>
                  <button className='btn btn-danger' onClick={() => {
                        setName('')
                        sessionStorage.clear();
                        navigate('/signup')
                        window.location.reload();
                      }}>
                        Logout
                  </button>
                </div>
              ) : (
                <Link to='/signin'>
                  <a className="btn btncolorlogin m-3" onClick={() => {
                  //  alert("Please Login to Continue....                                                                 User Credentails....                                                                  Email : testuser@gmail.com                       Password : test@123   Admin Credentails....                                                                  Email : admin@gmail.com                       Password : admin@123")
                  }}
                  ><span style={{ fontWeight: 'bold' }}>Login</span>  <i className="fa-solid fa-right-to-bracket"></i></a>
                </Link>
              )}

            </div>



          </Navbar.Collapse>

        </Container>

      </Navbar>

      <hr />
    </>
  )
}

export default NavBar
