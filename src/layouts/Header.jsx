import React from 'react'
import MarqueeComponent from '../ui/MarqueeComponent'

function Header() {
    return (
        <div>
            {/* Background and text updated to match the Emerald/Squared theme */}
            <MarqueeComponent className="bg-emerald-600 text-white border-b-2 border-gray-700"> 
                <div className="flex items-center space-x-10 h-10"> {/* Added height for consistency */}
                    <span>NEW: Freshly Baked Cookies!</span>
                    {/* Separator changed to a vertical bar */}
                    <span className="font-bold text-lg">|</span> 
                    <span>Try our Cold Brew Selections</span>
                    <span className="font-bold text-lg">|</span>
                    <span>Exclusive Member Discount: 10% Off All Drinks</span>
                </div>
            </MarqueeComponent>
        </div>
    )
}

export default Header