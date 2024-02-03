// import React from 'react'
import React from 'react'
import Link from 'COMMON/components/MyLink'
import CountDownButton from 'COMMON/components/CountDownButton'
import nav from './navMeta.js'
import Routers from './routers.jsx'
import styles from './app.scss'
import './basic.css'

export const UserContext = React.createContext('')

function App() {
    return (
        <div>
            <UserContext.Provider value={'chuanshi'}>
                <CountDownButton />
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

