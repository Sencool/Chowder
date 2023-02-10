import React, { useState, useEffect, useRef } from 'react'
import throttle from 'COMMON/utils/throttle'
import styles from './VirtualList.scss'

function VirtualList({
    loadMore,
    // pageSize,
    itemHeight,
    renderItem,
}) {
    if (typeof renderItem !== 'function') {
        throw new Error('renderItem is not a function')
    }
    const [displayData, setDisplayData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [cacheData, setCacheData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [flag, setFlag] = useState(true)
    const container = useRef(null)
    const handleScroll = throttle(() => {
        const { innerHeight, pageYOffset } = window
        const { scrollHeight } = document.body
        if (scrollHeight - (innerHeight + pageYOffset) < 50) {
            if (flag) {
                setFlag(false)
                loadMore()
                    .then((data) => {
                        setFlag(true)
                        if (Array.isArray(data)) {
                            setCacheData([...cacheData, ...data])
                        } else {
                            throw new Error('data is not a array')
                        }
                    })
            }
        }
    },1000)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [cacheData])
    return (
        <div ref={container}>
            <div>{cacheData.map((item) => renderItem(item))}</div>
        </div>
    )
}

export default VirtualList
