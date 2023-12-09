import React from 'react';
import { FaCartPlus } from "react-icons/fa";

const Card = ({ title, category, year, price }) => {
  return (
    <div>
      <ul  className="heading card">
        <li><h3>{title}</h3></li>
        <li>{category}</li>
        <li>{year}</li>
        <li>Rs{price}</li>
        <li><a href=""><FaCartPlus /></a></li>
      </ul>
    </div>
  );
};

export default Card;
