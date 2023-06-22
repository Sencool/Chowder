// import React from 'react'
import React, { useState, useEffect } from 'react'
import Link from 'COMMON/components/MyLink'
import nav from './navMeta.js'
import Routers from './routers.jsx'
import styles from './app.scss'
import './basic.css'

export const UserContext = React.createContext('')

function App() {
    return (
        <div>
        <UserContext.Provider value={'chuanshi'}>
            {/* <GetCodeButton /> */}
            <div className={styles.nav}>
                {nav.map((item) => {
                    const { to, name } = item
                    return (
                        <Link key={to} to={to} className={styles.navTab}>
                            {name}
                        </Link>
                    )
                })}
            </div>
            <Routers />
        </UserContext.Provider>
        </div>
    )
}

export default App

function GetCodeButton() {
    const [countDown, setCountDown] = useState(0)
    const handleClick = () => {
        setCountDown(60)
    }

    useEffect(() => {
        if (countDown > 0) {
            setTimeout(() => {
                setCountDown(countDown - 1)
            }, 1000)
        }
    }, [countDown])

    return (
        <>
            {countDown === 0 ? (
                <div onClick={handleClick}>获取验证码</div>
            ) : (
                <div>{countDown}秒后可以再次发送</div>
            )}
        </>
    )
}
