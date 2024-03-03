import React from 'react';
import {NavLink} from 'react-router-dom'
function Card({ id, name, price, image,description }) {
 
  return (
    <>
      <div className="content" key={id}>
        <img className="con-img" src={`${image}`} alt={name} />
        <p>{name}</p>
        <h5>{price}</h5>
        <NavLink to={`/${name}/${id}`} className="buy-1"   >View More</NavLink>
      </div>
    </>
  );
}

export default Card;
