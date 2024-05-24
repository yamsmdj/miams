import React from 'react';
import { NavLink } from 'react-router-dom';

const RecetteCategorie = ({title, items, isFirstCategory}) => {
    return (
        <div className= {`${isFirstCategory ? '' : "border-l-2"} border-black pl-12 mx-aut`} >
        <h2 className=" font-bold pb-5">{title}</h2>
        <ul>
            {items.map((item , index) =>(
          <NavLink key={index} to={item.link}>
            <div className="flex items-center justify-center">
            <img src={item.picture} alt="categories" className='h-12 mx-auto ' />
            <li className=" hover:bg-gray-300 hover:py-3 hover:px-4 py-3 my-2 hover:rounded-full">{item.label}</li>
            </div>
          </NavLink>
            ))}
        </ul>
      </div>
    );
};

export default RecetteCategorie;