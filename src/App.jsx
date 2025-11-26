import React from 'react'
import CoffeeMenu from './feature/CofeMenu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CofeMenuDetail from './feature/CofeMenuDetail'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CoffeeMenu />} />
                    <Route path="/coffee/:id" element={<CofeMenuDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App