import React, { useState, memo, useMemo, useCallback } from 'react'

function SubCounter({ onClick, data }) {
    console.log('SubCounter render')
    return <button onClick={onClick}>{data.number}</button>
}
const SubCounterMemo = memo(SubCounter)

let oldData, oldAddClick

export default function Counter2() {
    console.log('Counter render')
    const [name, setName] = useState('计数器')
    const [number, setNumber] = useState(0)
    // 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
    // 所以子组件也会随之更新，这时候可以用到 useMemo
    // 有没有后面的依赖项数组很重要，否则还是会重新渲染
    // 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
    // const data = useMemo(()=>({number}),[]);
    const data = useMemo(() => ({ number }), [number])
    console.log('data===oldData ', data === oldData)
    oldData = data

    // 有没有后面的依赖项数组很重要，否则还是会重新渲染
    const addClick = useCallback(() => {
        // 此处会缓存number，如果依赖项没有改变，则number不会跟着外面的state一起改变
        // 例子：此处依赖为空，则此处number会永远为0，外面会的number会从0变为1，然后一直为1
        setNumber(number + 1)
    }, [])
    console.log('addClick===oldAddClick ', addClick === oldAddClick)
    oldAddClick = addClick


    return (
        <>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <SubCounterMemo data={data} onClick={addClick} />
        </>
    )
}
