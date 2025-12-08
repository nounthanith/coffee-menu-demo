import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './feature/home/Home'
import Navbar from './layouts/Navbar'
import NotFoundPage from './ui/NotFoundPage'
import Detail from './feature/home/Detail'
import Signin from './feature/admin/Signin'
import Admin from './feature/admin/components/Admin'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />} >
                        <Route index element={<Home />} />
                        <Route path='*' element={<NotFoundPage />} />
                        <Route path="products/:id" element={<Detail />} />
                        <Route path="admin/signin" element={<Signin />} />
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App