import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementInDB, decrementInDB, syncState } from './store/mainReducer';
import {useEffect} from 'react';

//grab token from local storage
const token = window.localStorage.getItem("token");



const Counter = () => {
    const count = useSelector(state => state.counterReducer.value);

    const dispatch = useDispatch()

    const increment = () => {
        // dispatch({ type: 'counter/increment' });
        dispatch(incrementInDB());
    }

    const decrement = () => {
        // dispatch({ type: 'counter/decrement' });
        dispatch(decrementInDB());
    }

    useEffect(() => {
        dispatch(syncState());
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