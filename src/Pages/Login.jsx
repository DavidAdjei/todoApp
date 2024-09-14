import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Container, TextField, Button, Box } from '@mui/material'
import logoDark from '../assets/images/bg-mobile-dark.jpg'
import logoLight from '../assets/images/bg-mobile-light.jpg'
import { Link, useNavigate } from 'react-router-dom'
import '../components/components.css'
import {  login, setErrors } from '../redux/actions'

export const Login = ({ theme, login, setErrors, testingError }) => {
    const [credentials, setCredentials] = useState({
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
                await login(credentials)
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
                Sign In
            </h1>
            <Box className={`inputFields`}>
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
                        autoFocus='true'
                        autoComplete='false'
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
                        autoComplete='false'
                  />
                  {testingError && (<p style={{color: "red", textAlign: "center"}}>{ testingError}</p>)}
                <Button  onClick={handleSubmit} variant="contained" color="primary" style={{alignSelf: "center", width: '50%'}}>
                      Sign In
                </Button>
                <Link to="/register">Not A Member? Sign Up</Link>
            </Box>
          </Box>
      </Container>
      
  )
}

const mapStateToProps = (state) => ({
    theme: state.theme,
    testingError: state.testingError
})



export default connect(mapStateToProps, {login, setErrors})(Login)