import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import Header from './Header'
import { FaBars } from 'react-icons/fa'
import { HiOutlineX } from "react-icons/hi";

function Navbar() {
    const [showHeader, setShowHeader] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(false)
    const lastY = useRef(0)
    const ticking = useRef(false)
    const headerHeight = 40

    useEffect(() => {
        const onScroll = () => {
            if (ticking.current) return
            ticking.current = true
            requestAnimationFrame(() => {
                const y = window.scrollY || 0
                if (y > lastY.current && y - lastY.current > 4) {
                    setShowHeader(false)
                } else if (y < lastY.current && lastY.current - y > 4) {
                    setShowHeader(true)
                }
                lastY.current = y
                ticking.current = false
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/menu", label: "Menu" },
        { to: "/orders", label: "Orders" },
        { to: "/contact", label: "Contact" },
    ]

    // URL-driven search
    const [searchParams, setSearchParams] = useSearchParams()
    const qParam = searchParams.get('q') || ''
    const [searchInput, setSearchInput] = useState(qParam)
    const debounceRef = useRef(null)

    useEffect(() => {
        setSearchInput(qParam)
    }, [qParam])

    const updateSearchParam = (value) => {
        const next = new URLSearchParams(searchParams)
        if (value) {
            next.set('q', value)
            next.set('page', '1')
        } else {
            next.delete('q')
            next.set('page', '1')
        }
        setSearchParams(next)
    }

    const onChangeSearch = (e) => {
        const v = e.target.value
        setSearchInput(v)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => updateSearchParam(v), 350)
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <div
                className={`fixed inset-x-0 z-50 transition-transform duration-300 ease-out ${showHeader ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <Header />
            </div>

            <div style={{ height: showHeader ? headerHeight : 0 }} />

            <nav className="sticky top-0 z-60 backdrop-blur supports-backdrop-filter:bg-white/60 bg-white/80 border-b">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="h-14 flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-1 ">
                            <span>
                                {/* for logo */}
                            </span>
                            <span className="font-semibold">ភិមានកាហ្វេ</span>
                        </div>

                        {/* Desktop search */}
                        <div className="flex flex-1 max-w-sm">
                            <input
                                type="search"
                                value={searchInput}
                                onChange={onChangeSearch}
                                placeholder="Search products…"
                                className="w-full border rounded-full px-4 py-1 shadow-sm focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <NavLink key={index} to={item.to} className={({ isActive }) => `hover:text-amber-600 ${isActive ? 'text-amber-600' : ''}`} onClick={() => setMobileOpen(false)}>{item.label}</NavLink>
                            ))}
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="hidden md:inline-flex items-center h-9 px-3 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition">Sign in</button>
                            <button
                                aria-label="Toggle menu"
                                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md"
                                onClick={() => setMobileOpen(v => !v)}
                            >
                                {mobileOpen ? <HiOutlineX /> : <FaBars />}
                            </button>
                        </div>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t bg-white/90 backdrop-blur">
                        <div className="px-4 py-3 space-y-2">                            
                            {menuItems.map((item, index) => (
                                <NavLink key={index} to={item.to} className={({ isActive }) => `block py-2 ${isActive ? 'text-amber-600' : ''}`} onClick={() => setMobileOpen(false)}>{item.label}</NavLink>
                            ))}
                            <button className="mt-2 inline-flex items-center h-9 px-3 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition" onClick={() => setMobileOpen(false)}>Sign in</button>
                        </div>
                    </div>
                )}
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Navbar