import React, { useState, useEffect, useRef } from 'react'
function Counter () {
    const [counter, setCounter] = useState(0)
    const counterRef = useRef(counter)
    const onAlertButtonClick = () => {
        setTimeout(() => {
            alert(counterRef.current)
        }, 3000)
    }
    useEffect(() => {
        counterRef.current = counter
    })
    return (
        <div>
            <p>You clicked {counter} times.</p>
            <button onClick={() => setCounter(counter + 1)}>
                change count
            </button>
            <button onClick={onAlertButtonClick}>show count</button>
        </div>
    )
}
export default Counter
