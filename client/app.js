import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'
import { Provider, useSelector } from 'react-redux';
import {store} from './index.js'
import '../index.css';
import Counter from './Counter.js';
import Form from './UserForm.js';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';


const App = () => {
    const authenticated = useSelector(state => state.authReducer.authenticated);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            store.dispatch({ type: 'auth/setToken', payload: token });
        }
    },[])

    const logout = () => {
        store.dispatch({ type: 'auth/logout' });
        window.localStorage.removeItem('token');
    }

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {!authenticated && <Link to="/signup">Sign Up</Link>}
                {!authenticated && <Link to="/login">Login</Link>}

            </nav>
            {authenticated && 
            <>
                <Counter />
                <button onClick={logout}>Logout</button>
            </>
            }

            {!authenticated && 
                <Routes>
                    <Route path="/signup" element={<Form type="signup"/>} />
                    <Route path="/login" element={<Form type="login"/>} />
                    <Route path="/*" element={<Form type="login" />} />
                </Routes>
            }
        </>
    )
}


const container = document.getElementById('app');
const root = createRoot(container)

root.render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>,
)

