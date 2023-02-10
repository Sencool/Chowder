import React, { useState } from 'react'
import VirtualList from 'COMMON/components/VirtualList'
import styles from './Home.scss'

const data = [
    { a: 1, b: 1, c: 3 },
    { a: 2, b: 2, c: 2 },
    { a: 3, b: 3, c: 1 },
]

export default function Home() {
    const [aaa, setAaa] = useState(true)

    const loadMore = () =>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                console.log('----------------')
                resolve([1, 2])
            },1000)
        })
    }
    return (
        // <div className={styles.box1}>
        //     <div className={styles.box2}>12</div>
        // </div>
        <VirtualList
            renderItem={(data) => <div className={styles.listItem}>{data}</div>}
            loadMore={loadMore}
        />
        // <div>
        //     <div onClick={() => setAaa(!aaa)}>aadasfasd</div>
        //     {data.map((item) => {
        //         console.log('render')
        //         return <div key={aaa ? item.b : item.c}>{item.a}</div>
        //     })}
        // </div>
    )
}
