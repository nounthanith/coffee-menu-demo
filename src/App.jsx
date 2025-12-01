import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './feature/home/Home'
import Navbar from './layouts/Navbar'
import NotFoundPage from './ui/NotFoundPage'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />} >
                        <Route index element={<Home />} />
                        <Route path='*' element={<NotFoundPage /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App