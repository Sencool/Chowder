function throttle(func, delay) {
    let flag = true
    return function (...arg) {
        if (flag) {
            flag = false
            setTimeout(() => {
                func.apply(this, [...arg])
                flag = true
            }, delay)
        }
    }
}

export default throttle
