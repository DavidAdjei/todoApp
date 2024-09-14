import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Container, TextField, Button, Box } from '@mui/material'
import logoDark from '../assets/images/bg-mobile-dark.jpg'
import logoLight from '../assets/images/bg-mobile-light.jpg'
import { Link, useNavigate } from 'react-router-dom'
import '../components/components.css'
import { createUser, setErrors } from '../redux/actions'

export const Register = ({ user, theme, createUser, error, setErrors, testingError }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setErrors(null)
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Clicked", credentials)
            if (credentials.username === '' || credentials.email === '' || credentials.password === '') {
                setErrors("All fields are required");
                return;
            } else {
                await createUser(credentials)
                .then(() => {
                    setCredentials({
                        username: "",
                        email: "",
                        password: ""
                    });
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                });
            }
        } catch (err) {
            console.log(err)
        }  
    }
  return (
      <Container fullWidth className={`register ${theme}Shadow`} style={{display: 'flex', padding: 0}}>
          <Box component="form" className={`${theme}Form`}>
            <div className='circleLogo'>
                <img src={theme === 'light' ? logoDark : logoLight } alt="" />
            </div>
            <h1 className={`${theme}Text`}>
                Sign Up
            </h1>
            <Box className={`inputFields`}>
                  <TextField
                        className={testingError ? `error inputField ${theme}Field` :  `inputField ${theme}Field`}
                        label="Username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        required
                  />
                  <TextField
                        className={testingError ? `error inputField ${theme}Field` :  `inputField ${theme}Field`}
                        name="email"
                        label="Email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        required
                  />
                  <TextField
                        className={testingError ? `error inputField ${theme}Field` :  `inputField ${theme}Field`}
                        type='password'
                        label="Password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        required
                  />
                  {testingError && (<p style={{color: "red", textAlign: "center"}}>{ testingError}</p>)}
                <Button  onClick={handleSubmit} variant="contained" color="primary" style={{alignSelf: "center", width: '50%'}}>
                      Sign Up
                </Button>
                <Link to="/login">Already A Member? Log In</Link>
            </Box>
          </Box>
      </Container>
      
  )
}

const mapStateToProps = (state) => ({
    user: state.user, 
    theme: state.theme,
    error: state.error,
    testingError: state.testingError
})



export default connect(mapStateToProps, {createUser, setErrors})(Register)