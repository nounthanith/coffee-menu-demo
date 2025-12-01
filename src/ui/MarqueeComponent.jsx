import React from 'react'
import Marquee from "react-fast-marquee";

function MarqueeComponent({
  text,
  children,
  speed = 25,
  gradient = false,
  direction = 'left',
  pauseOnHover = true,
  autoFill = true,
  className = ''
}) {
  return (
    <div className={`overflow-hidden text-sm font-medium border-b-2 ${className}`}>
      <Marquee
        autoFill={autoFill}
        speed={speed}
        gradient={gradient}
        direction={direction}
        pauseOnHover={pauseOnHover}
        className="cursor-grab"
      >
        <div className="flex items-center space-x-10 mx-4 p-1">
          {children ? children : <p>{text}</p>}
        </div>
      </Marquee>
    </div>
  )
}

export default MarqueeComponent