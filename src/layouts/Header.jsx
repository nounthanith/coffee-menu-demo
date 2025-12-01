import React from 'react'
import MarqueeComponent from '../ui/MarqueeComponent'
function Header() {
    return (
        <div>
            <MarqueeComponent className="bg-red-900 text-white">
                <div className="flex items-center space-x-10">
                    <span>New: Caramel Macchiato</span>
                    <span>•</span>
                    <span>Try our Cold Brew</span>
                    <span>•</span>
                    <span>Member discount 10%</span>
                </div>
            </MarqueeComponent>
        </div>
    )
}

export default Header