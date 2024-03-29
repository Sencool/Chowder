import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import HooksShortcoming from './pages/hooksShortcoming'
import Counter from './pages/memoTest'
import Closures from './pages/Closures'
import ContextPritice from './pages/contextPritice'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/hooks" element={<HooksShortcoming />}></Route>
            <Route path="/memo-test" element={<Counter />}></Route>
            <Route path="/closures" element={<Closures />}></Route>
            <Route path="/ContextPritice" element={<ContextPritice />}></Route>
        </Routes>
    )
}

export default Routers
