import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../lib/api'

function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }
        try {
            setLoading(true)
            const res = await api.post('/auth/login', {
                email,
                password,
            })
            localStorage.setItem('token', res.data.token)
            navigate('/admin')
        } catch (err) {
            setError('Login for admin only!')
            // delay 3s
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-sm flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white border-2 border-gray-700 p-8">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="h-6 w-6 bg-emerald-600 border-2 border-gray-700" />
                    <h1 className="text-2xl font-mono font-bold text-gray-900 tracking-wider">Admin Sign In</h1>
                </div>

                {error && (
                    <div className="mb-4 text-sm font-mono font-semibold text-red-600 border-2 border-gray-700 bg-red-50 px-3 py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-mono font-semibold text-gray-800 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 px-3 bg-white border-2 border-gray-700 text-gray-900 focus:outline-none focus:border-emerald-600"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-mono font-semibold text-gray-800 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 px-3 bg-white border-2 border-gray-700 text-gray-900 focus:outline-none focus:border-emerald-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 inline-flex items-center justify-center border-2 border-gray-700 bg-emerald-600 text-white font-mono font-bold tracking-wider transition hover:bg-emerald-700 disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/" className="text-sm font-mono font-semibold text-gray-800 underline">Back to Home</Link>
                    <span className="text-xs font-mono text-gray-500">Protected area</span>
                </div>
            </div>
        </div>
    )
}

export default Signin