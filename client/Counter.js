import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementInDB, decrementInDB, syncState } from './store/mainReducer';
import {useEffect} from 'react';

//grab token from local storage
let token = window.localStorage.getItem("token");



const Counter = () => {
    const count = useSelector(state => state.counterReducer.value);

    const dispatch = useDispatch()

    const increment = () => {
        // dispatch({ type: 'counter/increment' });
        let token = window.localStorage.getItem("token")
        dispatch(incrementInDB(token));
    }

    const decrement = () => {
        // dispatch({ type: 'counter/decrement' });
        let token = window.localStorage.getItem("token")
        dispatch(decrementInDB());
    }

    useEffect(() => {
        let token = window.localStorage.getItem("token")
        dispatch(syncState(token));
    },[])

    return (
        <div>
            <h1>Boilermaker</h1>
            <p>{count}</p>
            <button onClick={decrement}>Decrement</button>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default Counter;