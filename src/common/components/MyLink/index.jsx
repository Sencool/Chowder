import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './MyLink.scss'

function App(props) {
    const { to, children, className } = props || {}
    return (
        <Link className={styles.myLink} to={to}>
            <div className={classNames(styles.link, className)}>{children}</div>
        </Link>
    )
}

export default App
