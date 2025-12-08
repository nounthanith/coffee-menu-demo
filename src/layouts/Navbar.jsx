import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useSearchParams } from 'react-router-dom'
import Header from './Header'
import { FaBars } from 'react-icons/fa'
import { HiOutlineX } from "react-icons/hi";
import { FaCode } from 'react-icons/fa'; // Changed logo icon

function Navbar() {
    const [showHeader, setShowHeader] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(false)
    const lastY = useRef(0)
    const ticking = useRef(false)
    const headerHeight = 40

    // --- SCROLL HIDING LOGIC (KEPT AS IS) ---
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
    // ----------------------------------------

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/menu", label: "Menu" },
        { to: "/orders", label: "Orders" },
        { to: "/contact", label: "Contact" },
    ]

    // --- SEARCH LOGIC (KEPT AS IS) ---
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
    // ----------------------------------------

    return (
        <div className="min-h-screen bg-gray-100 text-black"> {/* Changed background */}
            <div
                className={`fixed inset-x-0 z-50 transition-transform duration-300 ease-out ${showHeader ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <Header />
            </div>

            <div style={{ height: showHeader ? headerHeight : 0 }} />

            {/* Main Navigation Bar - **Squared/Bordered Customization** */}
            {/* Added border-b-2 and changed backdrop/bg for consistency */}
            <nav className="sticky top-0 z-60 bg-white border-b-2 border-gray-700">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="h-14 flex items-center justify-between gap-3">
                        
                        {/* Logo/Title Section */}
                        <div className="flex items-center space-x-2 font-mono font-bold"> {/* Used font-mono */}
                            {/* Logo Icon with border-2 */}
                            <span className="p-1 bg-emerald-600 text-white border-2 border-gray-700">
                                <FaCode size={18} />
                            </span>
                            {/* Title with font-mono */}
                            <span className="text-gray-900">CODED CAFE</span>
                        </div>

                        {/* Desktop search - **Squared/Bordered Input** */}
                        <div className="flex flex-1 max-w-sm">
                            <input
                                type="search"
                                value={searchInput}
                                onChange={onChangeSearch}
                                placeholder="Search products…"
                                // Squared input with prominent border and emerald focus ring
                                className="w-full border-2 border-gray-700 bg-white px-4 py-1 text-gray-900 focus:ring-0 focus:border-emerald-600 transition"
                            />
                        </div>

                        {/* Desktop Menu Links */}
                        <div className="hidden md:flex items-center space-x-6 font-mono font-medium">
                            {menuItems.map((item, index) => (
                                <NavLink 
                                    key={index} 
                                    to={item.to} 
                                    // Accent color changed to emerald
                                    className={({ isActive }) => `hover:text-emerald-600 transition ${isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-gray-700'}`} 
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Mobile Toggle & Sign In Button */}
                        <div className="flex items-center space-x-3">
                            {/* Sign In Button - Squared/Bordered */}
                            <Link 
                                to="/admin/signin"
                                className="hidden md:inline-flex items-center h-9 px-3 border-2 border-gray-700 bg-emerald-600 text-white font-mono font-bold hover:bg-emerald-700 transition"
                            >
                                Sign in
                            </Link>
                            {/* Mobile Toggle Button - Squared/No rounding */}
                            <button
                                aria-label="Toggle menu"
                                className="md:hidden inline-flex h-10 w-10 items-center justify-center border-2 border-gray-700" // Added border
                                onClick={() => setMobileOpen(v => !v)}
                            >
                                {mobileOpen ? <HiOutlineX size={20} /> : <FaBars size={16} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - **Squared/Bordered Customization** */}
                {mobileOpen && (
                    <div className="md:hidden border-t-2 border-gray-700 bg-white"> {/* Strong border separator */}
                        <div className="px-4 py-3 space-y-2 font-mono">
                            {menuItems.map((item, index) => (
                                <NavLink 
                                    key={index} 
                                    to={item.to} 
                                    // Mobile link styling
                                    className={({ isActive }) => `block py-2 text-base border-b border-gray-200 ${isActive ? 'text-emerald-600 font-bold' : 'text-gray-700'}`} 
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            {/* Mobile Sign In Button */}
                            <Link 
                                to="/admin/signin"
                                className="mt-2 inline-flex items-center h-9 px-3 border-2 border-gray-700 bg-emerald-600 text-white font-mono font-bold hover:bg-emerald-700 transition" 
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign in
                            </Link>
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