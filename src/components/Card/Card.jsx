import React from 'react'
import './card.scss'

export const Card = ({img,title,author}) => {
  return (
    <div className="card">
     <div className='card__header'>
      <img className='card__img' src={img.label} alt="" />
     </div>
     <div className='card__body'>
      <p>{title}</p>
     </div>
     <div className='card__footer'>
      <p><span>Author:</span>{author}</p>
     </div>
    </div>
  )
}
