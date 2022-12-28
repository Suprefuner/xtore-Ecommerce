import React from "react"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

const Stars = ({ stars }) => {
  const starIcons = Array.from({ length: 5 }, (star, i) => {
    const remain = stars - i
    if (remain > 0) {
      if (remain === 0.5) return <FaStarHalfAlt key={i} />
      return <FaStar key={i} />
    }
    return <FaRegStar key={i} />
  })

  return <div className="stars">{starIcons}</div>
}

export default Stars
