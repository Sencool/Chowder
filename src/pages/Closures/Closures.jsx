import React, { useState } from 'react'
import styles from './Closures.scss'

export default function Closures() {
    const [number, setNumber] = useState(0)
    const add = (count) => {
        // 使用闭包
        return function () {
            console.log(number)
            setNumber(number + count)
        }
    }
    const addDataSet = (e) => {
        // 不使用闭包，可以让性能更好
        setNumber(number + parseInt(e.target.dataset.count))
    }
    return (
        <div className={styles.flex}>
            {number}
            <div className={styles.card} data-count={1} onClick={addDataSet}>
                1
            </div>
            <div className={styles.card} onClick={add(2)}>
                2
            </div>
            <div className={styles.card} onClick={add(3)}>
                3
            </div>
            <div className={styles.card} onClick={add(4)}>
                4
            </div>
        </div>
    )
}
