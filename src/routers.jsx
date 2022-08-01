import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import HooksShortcoming from './pages/hooksShortcoming'
import Counter from './pages/usePagniation'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/hooks" element={<HooksShortcoming />}></Route>
            <Route path="/1" element={<Counter />}></Route>
        </Routes>
    )
}

export default Routers
