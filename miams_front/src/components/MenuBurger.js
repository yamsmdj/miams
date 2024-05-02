import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import RecetteCategorie from "./RecetteCategorie";

const MenuBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`flex flex-col justify-around h-16 w-16`}
        onClick={toggleMenu}
      >
        <span
          className={`bg-white h-1 w-full  duration-300  ${
            isOpen ? "rotate-45 translate-y-3" : ""
          }`}
        ></span>
        <span
          className={`bg-white h-1 w-full  duration-300  ${
            isOpen ? "-rotate-45 -translate-y-5" : ""
          }`}
        ></span>
        <span
          className={`bg-white h-1 w-full  duration-300  ${
            isOpen && "hidden"
          }`}
        ></span>
      </button>
      {isOpen && (
        <div>
          <div className=" absolute flex flex-col lg:flex-row justify-around top-24 lg:top-36 p-12 bg-gray-300  md:w-1/2 ">
            <RecetteCategorie 
            title = "CATEGORIE DE RECETTES"
            items={[
              {label: "ENTRÉE", link: `/entree`},
              {label: "PLATS", link: "/plats"},
              {label: "DESSERT", link: "/dessert"},
              {label: "BOISSONS", link: "/boissons"}
            ]} 
            isFirstCategory = {true}
            />
            <RecetteCategorie
            title = "INGREDIENTS"
            items={[
              {label: "VIANDES", link: "/viandes"},
              {label: "POISSONS", link: "/poissons"},
              {label: "FRUITS", link: "/fruits"},
              {label: "LEGUMES", link: "/legumes"}
            ]} />
            <RecetteCategorie
            title = "SHOP"
            items={[
              {label: "USTENSILES DE CUISINE", link: "/ustensiles"},
              {label: "TENUES DE CUISINE", link: "/tenues"},
            ]} />
        </div>
        </div>
      )}
    </>
  );
};

export default MenuBurger;
