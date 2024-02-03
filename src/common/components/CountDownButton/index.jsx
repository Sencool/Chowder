import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

function CountDownButton(props) {
    const { delay = 60, className, disabledClass } = props || {}
    const [countDown, setCountDown] = useState(0)
    const handleClick = () => {
        setCountDown(delay)
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
                <div className={classNames(className)} onClick={handleClick}>获取验证码</div>
            ) : (
                <div className={classNames(disabledClass)}>{countDown}秒后可以再次发送</div>
            )}
        </>
    )
}

export default CountDownButton
