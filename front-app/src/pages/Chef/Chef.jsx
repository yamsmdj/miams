import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Chef = () => {
  const [chef, setChef] = useState(null);
  const { chefId } = useParams();


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chef/${chefId}`)
      .then((res) => {
        setChef(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });
  }, [chefId]);

  if (!chef) {
    return <p>Chargement...hmm</p>;
  }

  return (
    <main>
      <div className="flex flex-col justify-around w-1/2 m-auto">
        <div>
          <h1 className="text-center font-extrabold text-3xl">{chef.name}</h1>
          <img
            src={`/assets/chefs/${chef.name.replace(/\s+/g, "_")}.webp`}
            alt={chef.name}
            className="w-1/3"
          />
        </div>
        <div>
          <h2 className="text-center font-extrabold text-3xl">Recettes :</h2>
          <div>
            <ul>
              {chef.recettes.map((recette, index) => (
                <NavLink to={`/recette/${recette.id}`} key={index}>
                  <li  className="flex">
                    {recette.title}
                    <img
                      src={`/assets/recettes/${recette.title.replace(
                        /\s+/g,
                        "_"
                      )}.jpg`}
                      alt={recette.title}
                      className="w-1/12"
                    />
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chef;
