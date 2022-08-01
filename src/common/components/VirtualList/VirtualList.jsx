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
    const container = useRef(null)
    const handleScroll = () => {
        const { innerHeight, pageYOffset } = window
        const { scrollHeight } = document.body
        if (scrollHeight - (innerHeight + pageYOffset) < 50) {
            loadMore().then((data) => {
                if (Array.isArray(data)) {
                    setCacheData([...cacheData, ...data])
                } else {
                    throw new Error('data is not a array')
                }
            })
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', throttle(handleScroll, 1000))
        return () => {
            window.removeEventListener('scroll', throttle(handleScroll, 1000))
        }
    }, [cacheData])
    return (
        <div ref={container}>
            <div>{cacheData.map((item) => renderItem(item))}</div>
        </div>
    )
}

export default VirtualList
