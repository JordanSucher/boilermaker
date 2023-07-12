import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const UserForm = ({type}) => {

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            let token = await axios.post('/api/login', {
            name: event.target.username.value,
            password: event.target.password.value
            }) 

            if (token.data !== null) {
                dispatch({ type: 'auth/setToken', payload: token.data })
                window.localStorage.setItem('token', token.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            let token = await axios.post('/api/signup', {
            name: event.target.username.value,
            password: event.target.password.value
            }) 
            token = token.data
            if (token!==null) {
                dispatch({ type: 'auth/setToken', payload: token })
                window.localStorage.setItem('token', token)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {type == 'login' ? <h1>Login</h1> : <h1>Signup</h1>}
            <form onSubmit={type == 'login' ? handleLogin : handleSignup}>
                <input name="username" type="text" placeholder='Username'></input>
                <input name="password" type="password" placeholder='Password'></input>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default UserForm